<template>
    <div>
        <span id="qqLoginBtn" v-show="false"> </span>
        <SvgIcon class="w-4 cursor-pointer" name="qq" @click="onQQLogin" />
    </div>
</template>

<script>
// QQ 登录的 URL
const QQ_LOGIN_URL =
    'https://graph.qq.com/oauth2.0/authorize?client_id=101998494&response_type=token&scope=all&redirect_uri=https%3A%2F%2Fimooc-front.lgdsunday.club%2Flogin';
</script>
<script setup>
import { onMounted } from 'vue';
import Brodacast from '@/utils/brodacast.js';
import { oauthLogin } from '@/utils/oauth.js';
import { LOGINTYPE_QQ } from '@/constants';

const onQQLogin = () => {
    openQQWindow();
};

// 处理qq登录视窗  移动端显示为满屏的状态
const openQQWindow = () => {
    window.open(
        QQ_LOGIN_URL,
        'oauth2Login_10609',
        'height=525,width=585, toolbar=no, menubar=no, scrollbars=no, status=no, location=yes, resizable=yes'
    );
    // 打开视窗之后开始等待
    Brodacast.wait().then((oauthObj) => {
        Brodacast.clear();
        // 执行登录操作
        oauthLogin(LOGINTYPE_QQ, oauthObj);
    });
};

onMounted(() => {
    /* eslint-disable */
    QC.Login(
        {
            btnId: 'qqLoginBtn', //插入按钮的节点id
        },
        // 登录成功之后的回调 会在 登录回调页面中被执行 小窗口中
        // qq登录存在缓存  登录成功之后  下次进入页面  会自动重新登录  刷新页面也会自动执行
        (data, opts) => {
            console.log('qq登录成功', data, opts);
            // 注销登录 防止下次打开页面直接展示上一次用户信息
            QC.Login.signOut();
            // 拿到qq用户的唯一标识  通过这个标识来判断当前用户是否已经注册我们app中
            const accessToken = /access_token=((.*))&expires_in/.exec(
                window.location.hash
            )[1];
            // 拼接获取到的对象
            const { nickname, figureurl_qq_2 } = data;
            const oauthObj = {
                nickname,
                figureurl_qq_2,
                accessToken,
            };
            Brodacast.send(oauthObj);

            // 针对于 移动端而言：通过移动端触发 QQ 登录会展示三个页面，原页面、QQ 吊起页面、回调页面。并且移动端一个页面展示整屏内容，且无法直接通过 window.close() 关闭，所以在移动端中，我们需要在当前页面继续进行后续操作。
            oauthLogin(LOGINTYPE_QQ, oauthObj);

            // 移动端下不行 移动端下没有窗口的概念
            window.close();
        }
    );
});
</script>

<style lang="scss" scoped></style>
