import { NEXT_PUBLIC_URL, API_URL } from '../config';
import { NextRequest, NextResponse } from 'next/server';
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';

export const basicFrame = (state) => {
    return new NextResponse(
        getFrameHtmlResponse({
            buttons: [
                {
                    label: `👁️`,
                },
                {
                    action: 'link',
                    label: 'w3bbie.xyz',
                    target: 'https://w3bbie.xyz',
                }
            ],
            image: {
                src: `${NEXT_PUBLIC_URL}/w3bbie${(state?.page % 2) + 1}.jpg`,
            },
            postUrl: `${API_URL}/api/frame`,
            state: {
                page: state?.page + 1,
                time: new Date().toISOString(),
            }
        }),
    );
}

export const gmFrame = (username, address, time) => {
    const searchParams = new URLSearchParams({ username, address, time })
    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `${API_URL}/api/gmgm?${searchParams}`,
                aspectRatio: '1:1',
            },
            buttons: [
                {
                    label: 'Mint to GM',
                },
                {
                    label: `Refresh`,
                },
            ],
            postUrl: `${API_URL}/api/frame`,
            state: {
                time: Date.now(),
            }
        })
    )
}

export const errorFrame = (error_message) => {
    const searchParams = new URLSearchParams({ error_message })
    return new NextResponse(
        getFrameHtmlResponse({
            image: {
                src: `${API_URL}/api/error?${searchParams}`,
                aspectRatio: '1:1',
            },
            buttons: [
                {
                    label: `Retry`,
                },
            ],
            postUrl: `${API_URL}/api/frame`,
            state: {
                time: Date.now(),
            }
        })
    )
}