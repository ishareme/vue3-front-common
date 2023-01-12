<template>
    <div>
        <SvgIcon
            class="w-4 cursor-pointer"
            name="wexin"
            @click="onWeixinClick"
        />
        <div id="loginContainer"></div>
    </div>
</template>

<script setup>
import {
    getWeixinLoginData,
    getWeixinLoginToken,
    getWeixinLoginUserInfo,
} from '@/api/sys.js';
import Brodacast from '@/utils/brodacast.js';
import { oauthLogin } from '@/utils/oauth.js';
import { LOGINTYPE_WX } from '@/constants';

// 登录成功之后数据解析
if (window.location.search) {
    const code = /code=((.*))&state/.exec(window.location.search)[1];
    if (code) {
        Brodacast.send(code);
        window.close();
    }
}

const onWeixinClick = async () => {
    try {
        // 1. 获取微信前置登录数据
        const { appId, appSecret, redirectUri, scope, state } =
            await getWeixinLoginData();
        // 2. open url
        window.open(
            `https://open.weixin.qq.com/connect/qrconnect?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`,
            '',
            'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
        );
        // 3. 等待扫码成功
        Brodacast.wait().then(async ({ code }) => {
            // 登录成功拿到code
            Brodacast.clear();
            // 获取token
            const { access_token, openid } = await getWeixinLoginToken(
                appId,
                appSecret,
                code
            );
            const { nickname, headimgurl } = await getWeixinLoginUserInfo(
                access_token,
                openid
            );

            oauthLogin(LOGINTYPE_WX, {
                openid,
                nickname,
                headimgurl,
            });
        });
    } catch (error) {
        // const data = {
        //     appId: 'wxdf77d7fdb9119b22',
        //     appSecret: '8781b4b919269ed0b04cb4d8cba41b74',
        //     scope: 'snsapi_login',
        //     redirectUri: 'https://imooc-front.lgdsunday.club/login',
        //     state: 'a788f2d8-f57e-4131-a3e5-ff49bf0fd6ba',
        // };
        console.log('[ error ]', error);
    }
};
onWeixinClick();
</script>

<style lang="scss" scoped></style>
