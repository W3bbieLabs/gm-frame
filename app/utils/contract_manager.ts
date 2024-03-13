import {
    Address,
    Hex,
    TransactionExecutionError,
    createPublicClient,
    createWalletClient,
    http,
} from 'viem';

import { privateKeyToAccount } from 'viem/accounts';
import { RPC_URL, CHAIN, MINTER_PRIVATE_KEY, ContractResponse } from "../config"

const transport = http(RPC_URL);

const publicClient = createPublicClient({
    chain: CHAIN,
    transport,
});

const walletClient = createWalletClient({
    chain: CHAIN,
    transport,
});

export const airDrop = async (contract: Hex, to_address: string, abi: any, token_id: bigint) => {
    // Try minting a new token
    if (!MINTER_PRIVATE_KEY) return { status: ContractResponse.NO_PRIVATE_KEY };
    if (!to_address) return { status: ContractResponse.NO_TO_ADDRESS }

    const { request } = await publicClient.simulateContract({
        address: contract,
        abi: abi,
        functionName: 'adminMint',
        args: [to_address, token_id, 1n, '0x'],
        account: privateKeyToAccount(MINTER_PRIVATE_KEY),
    });

    if (!request) {
        return { status: ContractResponse.CONTRACT_SIMULATE_ERROR }
    }

    try {
        const hash = await walletClient.writeContract(request);
        const hashlink = `https://basescan.org/tx/${hash}`
        console.log("tx: ", hashlink)
        return { status: ContractResponse.SUCCESS, hashlink }
    } catch (error) {
        console.log(error)
        return { status: ContractResponse.CONTRACT_WRITE_ERROR }
    }
}

export const truncateAddress = (address: string) => {
    return address.substring(0, 5) + "..." + address.substring(address.length - 5)
}