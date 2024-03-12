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
