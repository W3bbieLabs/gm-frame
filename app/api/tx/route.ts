import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage, FrameTransactionResponse } from '@coinbase/onchainkit/frame';
import { base } from 'viem/chains';
import { encodeFunctionData, parseEther } from 'viem';
//import BuyMeACoffeeABI from "../../utils/BuyMeACoffeeABI"
import { Zora1155ABI } from "../../utils/Zora1155"
import { GM_CONTRACT, Referral, MINTER } from '../../config'
import { getAbiItem, Hex, toBytes, hexToNumber } from 'viem'

let validateParam = (param: string, request: Request) => {
    const { searchParams } = new URL(request.url);
    const hasParam = searchParams.has(param);
    const _param: string = hasParam ? (searchParams.get(param)?.slice(0, 100) as string) : '';
    return _param;
};

async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
    const body: FrameRequest = await req.json();
    //const address: `0x${string}` = validateParam('address', req) as `0x${string}`
    const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });
    let address = message ? message.interactor.verified_accounts[0] as Hex : '' as Hex

    //console.log(message)
    if (!isValid) {
        return new NextResponse('Message not valid', { status: 500 });
    }

    let new_address = `0x000000000000000000000000${address.split('0x')[1]}` as Hex
    let _ref = '0x0000000000000000000000000000000000000000' as Hex
    //console.log("address", address)

    const data = encodeFunctionData({
        abi: Zora1155ABI,
        functionName: 'mintWithRewards',
        args: [MINTER, 1n, 1n, new_address, _ref],
    });

    const functionAbi = getAbiItem({
        abi: Zora1155ABI,
        name: "mintWithRewards",
    })

    //const errorsAbi = Zora1155ABI.filter((t) => t.type === "error");
    const txData = {
        chainId: `eip155:${base.id}`, // Remember Base Sepolia might not work on Warpcast yet
        method: 'eth_sendTransaction',
        params: {
            abi: [functionAbi],
            data,
            to: GM_CONTRACT,
            value: parseEther('0.000777').toString(), // 0.00004 ETH
        },
    };

    return NextResponse.json(txData);
}

export async function POST(req: NextRequest): Promise<Response> {
    return getResponse(req);
}

export const dynamic = 'force-dynamic';