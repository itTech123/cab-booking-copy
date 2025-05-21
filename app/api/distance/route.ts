import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');

  if (!origin || !destination) {
    return NextResponse.json(
      { error: 'Origin and destination are required' },
      { status: 400 }
    );
  }

  try {
    const originCoords = await getCoordinates(origin);
    const destinationCoords = await getCoordinates(destination);

    if (!originCoords || !destinationCoords) {
      return NextResponse.json(
        { error: 'Unable to get coordinates for one or both locations' },
        { status: 400 }
      );
    }

    const distanceData = await getDistanceMatrix(originCoords, destinationCoords);

    return NextResponse.json(distanceData);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to calculate distance' },
      { status: 500 }
    );
  }
}

async function getCoordinates(location: string): Promise<[number, number] | null> {
  try {
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch coordinates for ${location}`);
    }

    const data = await res.json();
    const feature = data.features?.[0];

    if (!feature) return null;
    return [feature.geometry.coordinates[0], feature.geometry.coordinates[1]]; // [lon, lat]
  } catch (error) {
    console.error(`Error getting coordinates for ${location}:`, error);
    return null;
  }
}


async function getDistanceMatrix(origin: [number, number], destination: [number, number]) {
  const url = `https://api.geoapify.com/v1/routematrix?apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      mode: 'drive',
      sources: [{ location: origin }],
      targets: [{ location: destination }],
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch distance matrix data');
  }

  const data = await res.json();

  const element = data.sources_to_targets?.[0]?.[0];
  if (!element) throw new Error('Distance matrix data not available.');

  const distance = (element.distance / 1000).toFixed(1) + ' km';
  const duration = formatDuration(element.time);

  return { distance, duration };
}

function formatDuration(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} mins`;
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  return `${hours} hr${hours > 1 ? 's' : ''} ${remainingMins} min${remainingMins !== 1 ? 's' : ''}`;
}
