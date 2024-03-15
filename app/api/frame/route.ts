import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { gmFrame, errorFrame } from "../../utils/frames";
import { CONTRACT_ADDRESS, ContractResponse, TOKEN_ID } from "../../config"
import { Zora1155ABI } from "../../utils/Zora1155"
import { airDrop } from "../../utils/contract_manager"
import { getUserInfo } from "../../utils/neynar_manager"
import { getData, setData, getSortedData } from '../../utils/firebase'

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  //const requestHeaders = new Headers(req.headers)
  //requestHeaders.set('max-age', '0')



  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse("Message not valid", { status: 500 });
  }

  const text = message.input || '';
  let state = {
    page: 0,
    isRefresh: false
  };

  try {
    if (message) state = JSON.parse(decodeURIComponent(message.state?.serialized));

  } catch (e) {
    console.log("json parse error");
  }

  // Check if user has an address connected
  let address = message.interactor.verified_accounts[0] || ''
  let { fid } = message.interactor

  let user_info = await getUserInfo(fid)
  let { username } = user_info
  let time = Date.now()
  //console.log(message)

  // User tapped refresh button
  if (message?.button == 2) {
    return gmFrame(username, address, time)
  }

  // No verified address found
  if (address == '') return errorFrame("Please add a Verified Address")
  let contract_response = await airDrop(CONTRACT_ADDRESS, address, Zora1155ABI, TOKEN_ID)
  if (contract_response.status == ContractResponse.SUCCESS) {
    setData(`gms/${time}`, { username, time, address })
    return gmFrame(username, address, time)
  } else {
    return errorFrame("Opps! Something went wrong.")
  }
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
//export const revalidate = 0;