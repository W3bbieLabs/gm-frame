import { base } from 'viem/chains';


// use NODE_ENV to not have to change config based on where it's deployed https://zizzamia.xyz
export const NEXT_PUBLIC_URL = process.env.NODE_ENV == "development" ? 'https://5111-2600-1700-9cc0-3ab0-58f4-c735-8b5c-4d94.ngrok-free.app' : 'https://w3bbie-gm.netlify.app';
export const API_URL = process.env.NODE_ENV == "development" ? 'https://5111-2600-1700-9cc0-3ab0-58f4-c735-8b5c-4d94.ngrok-free.app' : 'https://w3bbie-gm.netlify.app';

export const CHAIN = base;
export const CONTRACT_ADDRESS = '0xfac759cefe113e510d495e8ebefa1fa7b1c7b338';
export const TOKEN_ID = 1n; // First collection is 1