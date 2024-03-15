import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL, API_URL } from './config';

let t = Date.now().toString();
const searchParams = new URLSearchParams({ place_holder: 'place_holder', time: t }); // place holder

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'tx',
      label: 'Mint to GM',
      target: `${NEXT_PUBLIC_URL}/api/tx`,
    },
    {
      label: 'Refresh',
    },
  ],
  image: {
    src: `${API_URL}/api/gmgm?${searchParams}`,
    aspectRatio: '1:1',
  },
  postUrl: `${API_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'w3bbie.xyz',
  description: 'W3bbie Was Here',
  openGraph: {
    title: 'w3bbie.xyz',
    description: 'W3bbie Was Here',
    images: [`${NEXT_PUBLIC_URL}/w3bbie1.jpg`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100vh',

        padding: 0,
        margin: 0,
      }}
    >
      <h1>
        <a href="https://zora.co/collect/base:0x34572eb8bc116582170629c9a309f8ed75ac6984">gm</a>
      </h1>
    </div>
  );
}

//export const dynamic = 'force-dynamic';
//export const revalidate = 0;
