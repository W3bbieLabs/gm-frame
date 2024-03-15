import { ImageResponse } from 'next/og';
import { Inter } from 'next/font/google';
const inter_font = Inter({ weight: '400', subsets: ['latin'] });
import { API_URL, NEXT_PUBLIC_URL } from '../../config';
import { truncateAddress } from '../../utils/contract_manager';
import { getSortedData } from '../../utils/firebase';
import { TextIngredients } from '../../components/TextIngredients';
// App router includes @vercel/og.
// No need to install it.

//export const runtime = 'edge';
export const dynamic = 'force-dynamic';
//export const revalidate = 60;

const getFont = async (fontFile: string) => {
  let font_link = `${API_URL}/${fontFile}`;
  const response = await fetch(new URL(font_link));
  const faster = await response.arrayBuffer();
  return faster;
};

const getElapsesTime = (time: number) => {
  let t_now = Date.now();
  let elapsed = t_now - time;
  const elapsedMinutes = elapsed / 1000 / 60;
  return Math.floor(elapsedMinutes);
};

const formatTime = (time: number) => {
  const hour_min_date = new Date(time);
  let date = new Date().toLocaleDateString();
  let hour = hour_min_date.getHours();
  let _min = hour_min_date.getMinutes();
  const min = _min < 10 ? `0${_min}` : _min;
  return {
    date,
    hour,
    min,
  };
};

const recentGMDiv = (username: string, time: number, address: string) => {
  let { date, hour, min } = formatTime(time);
  var ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        justifyItems: 'center',
        flexDirection: 'column',
        backgroundColor: '#423761',
        width: '90%',
        borderRadius: '25px',
        padding: '20px',
        maxHeight: '120px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 0,
          margin: 0,
        }}
      >
        <p style={{ marginBottom: 5, padding: 0, marginTop: 0 }}>
          <span
            style={{ color: '#BA55F7', marginRight: 5, fontSize: 30, fontFamily: 'Inter-Bold' }}
          >
            @{username}
          </span>
          <span style={{ color: 'white', marginRight: 10, fontSize: 30, fontFamily: 'Inter-Bold' }}>
            says GM.
          </span>
          {/* add generated content from gm_engine*/}
        </p>
        <p style={{ margin: 0, padding: 0, fontSize: 25, fontFamily: 'Inter-Regular' }}>
          {date}, {getElapsesTime(time)} minutes ago
        </p>
      </div>
    </div>
  );
};

let title = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        fontFamily: 'Inter-ExtraBold',
        marginTop: 20,
      }}
    >
      <h1>GM Bot</h1>
    </div>
  );
};

let validateParam = (param: string, request: Request) => {
  const { searchParams } = new URL(request.url);
  const hasParam = searchParams.has(param);
  const _param: string = hasParam ? (searchParams.get(param)?.slice(0, 100) as string) : '';
  return _param;
};

let generatePastGMs = (username: string, time: number) => {
  let { date, hour, min } = formatTime(time);
  var ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12; // the hour '0' should be '12'
  let elapsed_time = getElapsesTime(time);
  let date_time = `${date}, ${elapsed_time} mins ago`;
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        color: 'white',
        padding: 0,
        margin: 0,
      }}
    >
      <p
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'Inter-Regular',
          fontSize: 26,
          marginBottom: 10,
        }}
      >
        @{username} {date_time}
      </p>
    </div>
  );
};

let pastGMs = (recent_gms: any) => {
  const listItems = recent_gms.map((obj: any, index: any) => {
    let { time, username } = obj;
    return (
      <div
        style={{
          display: 'flex',
        }}
        key={time}
      >
        {generatePastGMs(username, time)}
      </div>
    );
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        fontFamily: 'Inter-ExtraBold',
        marginTop: 20,
        width: '90%',
        color: '#BA55F7',
      }}
    >
      <h1 style={{ padding: 0, marginBottom: 5 }}>Past GMs</h1>
      {listItems}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: 70,
        }}
      >
        <TextIngredients />
      </div>
    </div>
  );
};

export async function GET(request: Request) {
  try {
    let recent_gms = await getSortedData('gms', 'time', 'desc'); // if over 1000 gms revisit
    recent_gms = recent_gms.slice(0, 6);
    const username = recent_gms[0].username;
    const address = recent_gms[0].address;
    const time = recent_gms[0].time;
    const past_gms = recent_gms.slice(1);

    /*
    const username = validateParam('username', request);
    const address = validateParam('address', request);
    const time = parseInt(validateParam('time', request));
    */

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            textAlign: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% 100%',
            backgroundColor: '#1E1826',
            color: 'white',
          }}
        >
          {title()}
          {recentGMDiv(username, time, address)}
          {pastGMs(past_gms)}
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
