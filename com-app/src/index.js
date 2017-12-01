import {Cookie} from "./cookie/cookie";

let cookie = new Cookie();
cookie.update({
    val: '0',
    title: '',
    isLogin: false
});

cookie.refreshState();