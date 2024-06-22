'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { v5 as uuidv5 } from 'uuid';
import _ from 'lodash';

interface ParsedData {
  [key: string]: string;
}

const UUID_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

const STANDARD_SOURCES = [
  'Facebook',
  'Amazon',
  'Wellfound',
  'Playstore',
  'App store',
  'Flippa',
  'Tiktok'
];

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<'csv' | 'json'>('csv');
  const [headers, setHeaders] = useState<string[]>([]);
  const [data, setData] = useState<ParsedData[]>([]);
  const [selectedPrimaryKeys, setSelectedPrimaryKeys] = useState<string[]>([]);
  const [processedData, setProcessedData] = useState<ParsedData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [otherSourceName, setOtherSourceName] = useState<string>('');
  const [isDownloadReady, setIsDownloadReady] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setFile(file);
    parseFile(file);
  }, [fileType]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const parseFile = (file: File) => {
    if (fileType === 'csv') {
      Papa.parse(file, {
        complete: (results) => {
          const headers = results.data[0] as string[];
          const data = results.data.slice(1) as ParsedData[];
          setHeaders(headers);
          setData(data);
        },
        header: true,
      });
    } else {
      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonData = JSON.parse(event.target?.result as string);
        const headers = Object.keys(jsonData[0]);
        setHeaders(headers);
        setData(jsonData);
      };
      reader.readAsText(file);
    }
  };

  const processData = () => {
    if (selectedPrimaryKeys.length === 0) {
      setError('Please select at least one primary key');
      return;
    }

    const deduplicatedData = _.uniqBy(data, (row) =>
      selectedPrimaryKeys.map((key) => row[key]).join('|')
    );

    const processedData = deduplicatedData.map((row) => {
      const primaryKeyValues = selectedPrimaryKeys.map((key) => row[key]).join('|');
      const uuid = uuidv5(primaryKeyValues, UUID_NAMESPACE);

      return {
        ...row,
        uuid,
        category: generateCategory(row),
      };
    });

    setProcessedData(processedData);
    setIsDownloadReady(true);
    setError(null);
  };

  const downloadProcessedData = () => {
    const csv = Papa.unparse(processedData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'processed_data.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const generateCategory = (row: ParsedData): string => {
    // Implement your category generation logic here
    // This is a placeholder implementation
    return 'default_category';
  };

  const sendDataToServer = async () => {
    try {
      const sourceName = selectedSource === 'Other' ? otherSourceName : selectedSource;
      
      // Create or update table
      await fetch('/api/create-or-update-table', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          headers: [...headers, 'uuid', 'category'],
          sourceName
        }),
      });

      // Send data in batches
      const batchSize = 1000;
      for (let i = 0; i < processedData.length; i += batchSize) {
        const batch = processedData.slice(i, i + batchSize);
        await fetch('/api/load-data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            data: batch,
            sourceName
          }),
        });
      }

      setError(null);
      alert('Data successfully loaded into the database');
    } catch (error) {
      setError('Error sending data to server');
    }
  };

  return (
    <div className="container mx-auto p-4 text-green-600">
      <h1 className="text-2xl font-bold mb-4">Data ETL System</h1>
      
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            value="csv"
            checked={fileType === 'csv'}
            onChange={() => setFileType('csv')}
            className="mr-2"
          />
          CSV
        </label>
        <label>
          <input
            type="radio"
            value="json"
            checked={fileType === 'json'}
            onChange={() => setFileType('json')}
            className="mr-2"
          />
          JSON
        </label>
      </div>

      <div {...getRootProps()} className="border-2 border-dashed p-4 mb-4">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here ...</p>
        ) : (
          <p>Drag 'n' drop a {fileType.toUpperCase()} file here, or click to select a file</p>
        )}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Select Data Source</h2>
        <select 
          value={selectedSource} 
          onChange={(e) => setSelectedSource(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Select a source</option>
          {STANDARD_SOURCES.map((source) => (
            <option key={source} value={source}>{source}</option>
          ))}
          <option value="Other">Other</option>
        </select>
        {selectedSource === 'Other' && (
          <input
            type="text"
            value={otherSourceName}
            onChange={(e) => setOtherSourceName(e.target.value)}
            placeholder="Enter custom source name"
            className="ml-2 p-2 border rounded"
          />
        )}
      </div>

      {headers.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Select Primary Key(s)</h2>
          {headers.map((header) => (
            <label key={header} className="block">
              <input
                type="checkbox"
                checked={selectedPrimaryKeys.includes(header)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedPrimaryKeys([...selectedPrimaryKeys, header]);
                  } else {
                    setSelectedPrimaryKeys(selectedPrimaryKeys.filter((key) => key !== header));
                  }
                }}
                className="mr-2"
              />
              {header}
            </label>
          ))}
        </div>
      )}

      {data.length > 0 && selectedPrimaryKeys.length > 0 && (
        <button
          onClick={processData}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mr-2"
        >
          Process Data
        </button>
      )}

      {isDownloadReady && (
        <button
          onClick={downloadProcessedData}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4 mr-2"
        >
          Download Processed Data
        </button>
      )}

      {processedData.length > 0 && (
        <button
          onClick={sendDataToServer}
          className="bg-purple-500 text-white px-4 py-2 rounded mb-4 mr-2"
        >
          Send Data to Server
        </button>
      )}

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {headers.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Headers/Keys</h2>
          <ul className="list-disc list-inside">
            {headers.map((header) => (
              <li key={header}>{header}</li>
            ))}
          </ul>
        </div>
      )}

      {processedData.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Processed Data Preview</h2>
          <table className="w-full border-collapse border text-xs">
            <thead>
              <tr>
                {[...headers, 'uuid', 'category'].map((header) => (
                  <th key={header} className="border p-2">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processedData.slice(0, 5).map((row, index) => (
                <tr key={index}>
                  {[...headers, 'uuid', 'category'].map((header) => (
                    <td key={header} className="border p-2">
                      {row[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}