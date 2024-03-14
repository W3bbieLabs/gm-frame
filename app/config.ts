import { base } from 'viem/chains';
import {
    Hex,
} from 'viem';

// use NODE_ENV to not have to change config based on where it's deployed https://zizzamia.xyz
export const NEXT_PUBLIC_URL = process.env.NODE_ENV == "development" ? 'https://535b-2600-1700-9cc0-3ab0-69de-84a6-783e-ae96.ngrok-free.app' : 'https://w3bbie-gmbot.netlify.app';
export const API_URL = process.env.NODE_ENV == "development" ? 'https://535b-2600-1700-9cc0-3ab0-69de-84a6-783e-ae96.ngrok-free.app' : 'https://w3bbie-gmbot.netlify.app';

export const CHAIN = base;
export const CONTRACT_ADDRESS = '0x34572eb8bc116582170629c9a309f8ed75ac6984';
export const TOKEN_ID = 1n; // First collection is 1
export const test_address = "0x3592D1C427190ac1BBd0344C77681Fa5A2E36EB6"
export const MINTER_PRIVATE_KEY = `0x${process.env.MINTER_PRIVATE_KEY}` as Hex | undefined;
export const RPC_URL = "https://base-rpc.publicnode.com"

export enum ResponseType {
    SUCCESS,
    RECAST,
    NO_ADDRESS,
    OUT_OF_GAS,
    ERROR,
}


export enum ContractResponse {
    NO_PRIVATE_KEY,
    NO_TO_ADDRESS,
    CONTRACT_WRITE_ERROR,
    CONTRACT_SIMULATE_ERROR,
    SUCCESS
}
