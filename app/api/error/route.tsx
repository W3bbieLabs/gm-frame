import { ImageResponse } from 'next/og';
import { Inter } from 'next/font/google';
const inter_font = Inter({ weight: '400', subsets: ['latin'] });
import { API_URL, NEXT_PUBLIC_URL } from '../../config';
import { truncateAddress } from '../../utils/contract_manager';
import { getSortedData } from '../../utils/firebase';

// App router includes @vercel/og.
// No need to install it.

//export const runtime = 'edge'

const getFont = async (fontFile: string) => {
  let font_link = `${API_URL}/${fontFile}`;
  const response = await fetch(new URL(font_link));
  const faster = await response.arrayBuffer();
  return faster;
};

let validateParam = (param: string, request: Request) => {
  const { searchParams } = new URL(request.url);
  const hasParam = searchParams.has(param);
  const _param: string = hasParam ? (searchParams.get(param)?.slice(0, 100) as string) : '';
  return _param;
};

export async function GET(request: Request) {
  try {
    const error_message = validateParam('error_message', request);

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            backgroundColor: '#1E1826',
            color: 'white',
            fontFamily: 'Inter-Bold',
          }}
        >
          <h1>{error_message}</h1>
        </div>
      ),
      {
        width: 600,
        height: 630,
        fonts: [
          {
            name: 'Inter-Regular',
            data: await getFont('Inter-Regular.ttf'),
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter-Bold',
            data: await getFont('Inter-Bold.ttf'),
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter-ExtraBold',
            data: await getFont('Inter-ExtraBold.ttf'),
            style: 'normal',
            weight: 400,
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}

export const dynamic = 'force-dynamic';
//export const revalidate = 0;
