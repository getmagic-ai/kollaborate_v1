// app/api/load-data/route.ts
import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import format from 'pg-format';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const SOURCE_TABLE_MAP: { [key: string]: string } = {
  'App store': 'app_store_dev',
  'Tiktok': 'tiktok_ads',
  'Playstore': 'play_store_dev',
  'Wellfound': 'wellfound_companies',
  'Facebook': 'facebook_brands',
  'Flippa': 'flippa_listings',
  'Amazon': 'amazon_products'
};

const BATCH_SIZE = 100; // Adjust this value as needed
interface ParsedData {
  [key: string]: string | number | boolean | null;
}

export async function POST(request: Request) {
  const { data, sourceName } = await request.json();
console.log(data)
  try {
    const client = await pool.connect();
    try {
      const tableName = SOURCE_TABLE_MAP[sourceName] || `brands_${sourceName.toLowerCase().replace(/\s+/g, '_')}`;

      // Get the current schema of the table
      const getSchemaQuery = `
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = $1;
      `;
      const schema = await client.query(getSchemaQuery, [tableName]);
      const existingColumns = schema.rows.map((row: any) => row.column_name);

      // Filter the data to only include existing columns
      const filteredData = data.map((row: any) => {
        const filteredRow: { [key: string]: any } = {};
        for (const col of existingColumns) {
          if (row.hasOwnProperty(col)) {
            filteredRow[col] = row[col];
          }
        }
        return filteredRow;
      });

      const columns = Object.keys(filteredData[0]);
      console.log(columns)
      
      // Prepare the base query
      const baseQuery = `
        INSERT INTO ${tableName} (${columns.join(', ')})
        VALUES %L
        ON CONFLICT (uuid) DO UPDATE SET
        ${columns.map((col) => `${col} = EXCLUDED.${col}`).join(', ')}
      `;

      let successCount = 0;
      let errorCount = 0;
      const errors: string[] = [];

      // Process data in batches
      for (let i = 0; i < filteredData.length; i += BATCH_SIZE) {
        const batch = filteredData.slice(i, i + BATCH_SIZE);
        const values = batch.map((row: ParsedData) => columns.map(col => row[col]));
        
        try {
          const query = format(baseQuery, values);
          await client.query(query);
          successCount += batch.length;
        } catch (error) {
          errorCount += batch.length;
          errors.push(`Error inserting batch starting at index ${i}: ${(error as Error).message}`);
        }
      }

      return NextResponse.json({ 
        message: 'Data loading completed',
        successCount,
        errorCount,
        errors: errors.length > 100 ? errors.slice(0, 100) : errors // Limit error messages to prevent response size issues
      });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error in data loading process:', error);
    return NextResponse.json({ error: 'Error in data loading process' }, { status: 500 });
  }
}