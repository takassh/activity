import { NextRequest, NextResponse } from 'next/server';
import { getPagesMetadata } from '../../data';

export async function GET(
  request: NextRequest,
  { params }: { params: { pageId: string } },
): Promise<NextResponse> {
  const metadata = await getPagesMetadata(params.pageId);
  return NextResponse.json(metadata, {
    status: 200,
  });
}
