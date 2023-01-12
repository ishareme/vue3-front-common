/**
 * 同源不同页通讯 window open
 * window.BroadcastChannel 不可用的时候降级处理 localStorage
 */

// 频道关键key值
const LOGIN_SUCCESS_CHANNEL = 'LOGIN_SUCCESS_CHANNEL';
let brodacastChannel = null;
if (window.BroadcastChannel) {
    brodacastChannel = new BroadcastChannel(LOGIN_SUCCESS_CHANNEL);
}

// 发送消息的方法
const send = (data) => {
    if (brodacastChannel) {
        brodacastChannel.postMessage(data);
    } else {
        localStorage.setItem(LOGIN_SUCCESS_CHANNEL, JSON.stringify(data));
    }
};

// 等待回调的方法
const wait = () => {
    return new Promise((resolve) => {
        if (brodacastChannel) {
            brodacastChannel.onmessage = (event) => {
                resolve(event.data);
            };
        } else {
            localStorage.onstorage = (event) => {
                if (event.key === LOGIN_SUCCESS_CHANNEL) {
                    resolve(JSON.parse(event.newValue));
                }
            };
        }
    });
};

// 销毁

const clear = () => {
    if (brodacastChannel) {
        brodacastChannel.close();
        brodacastChannel = null;
    } else {
        localStorage.removeItem(LOGIN_SUCCESS_CHANNEL);
    }
};

export default {
    send,
    wait,
    clear,
};
