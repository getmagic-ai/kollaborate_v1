// app/api/load-data/route.ts
import { handleWebpackExternalForEdgeRuntime } from 'next/dist/build/webpack/plugins/middleware-plugin';
import { NextResponse } from 'next/server';

import pg from 'pg';
const { Pool } = pg;

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

export async function POST(request: Request) {
  const { data, sourceName } = await request.json();
  console.log(sourceName)
  try {
    const client = await pool.connect();
    console.log(client)
    try {
      const tableName = SOURCE_TABLE_MAP[sourceName] || `brands_${sourceName.toLowerCase().replace(/\s+/g, '_')}`;
      console.log(tableName)
      // Get the current schema of the table
      const getSchemaQuery = `
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = $1;
      `;
      const schema = await client.query(getSchemaQuery, [tableName]);
      console.log(schema)
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
      
      // Prepare the base query
      const baseQuery = `
        INSERT INTO ${tableName} (${columns.join(', ')})
        VALUES (${columns.map((_, i) => `$${i + 1}`).join(', ')})
        ON CONFLICT (uuid) DO UPDATE SET
        ${columns.map((col, i) => `${col} = EXCLUDED.${col}`).join(', ')}
      `;

      let successCount = 0;
      let errorCount = 0;
      const errors: string[] = [];

      // Process each row individually
      for (const row of filteredData) {
        const values = columns.map(col => row[col]);
        try {
          await client.query(baseQuery, values);
          successCount++;
        } catch (error) {
          errorCount++;
          errors.push(`Error inserting row with UUID ${row.uuid}: ${(error as Error).message}`);
        }
      }

      return NextResponse.json({ 
        message: 'Data loading completed',
        successCount,
        errorCount,
        errors: errors.length > 100 ? errors.slice(0, 100) : errors // Limit error messages to prevent response size issues
      });
    }
    catch(error){
      console.log(error)
    }
     finally {
      client.release();
    }
  } catch (error) {
    console.error('Error in data loading process:', error);
    return NextResponse.json({ error: 'Error in data loading process' }, { status: 500 });
  }
}