import { NextResponse } from 'next/server';
import prismadb from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, brandId, contactInfo } = body;

    if (!userId || !brandId || !contactInfo) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newRequest = await prismadb.representation_requests.create({
      data: {
        user_id: userId,
        brand_id: String(brandId),
        full_name: contactInfo.fullName,
        email: contactInfo.email,
        phone: contactInfo.phone || null,
      },
    });

    return NextResponse.json({ message: 'Request submitted successfully', id: newRequest.id }, { status: 200 });
  } catch (error) {
    console.error('Error submitting request:', error);
    return NextResponse.json({ error: 'Error submitting request' }, { status: 500 });
  } 
  // finally {
  //   await prismadb.$disconnect();
  // }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}