const sdk = require('api')('@neynar/v2.0#2rxv131ltj1id4t');

export const getUserInfo = async (fid: number) => {
    let user_info = await sdk.userBulk({ fids: fid, api_key: process.env.neynar_api })
        .then((res: any) => {
            let { username, display_name, pfp_url, fid } = res.data.users[0]
            return { username, display_name, pfp_url, fid }
        })
        .catch((err: any) => console.error(err));

    return user_info
}

