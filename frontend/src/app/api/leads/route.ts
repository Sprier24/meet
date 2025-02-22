import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Replace this URL with your actual backend API URL
    const response = await fetch('http://localhost:8000/api/leads', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';

export async function GETDeals() {
  try {
    // Replace this URL with your actual backend API URL
    const response = await fetch('http://localhost:8000/api/deals', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch leads');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
