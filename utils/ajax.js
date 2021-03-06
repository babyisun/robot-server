import axios from 'axios';
import { ERROR } from './const';

const createAjax = (base_url) => {
    const ajax = axios.create({
        baseURL: base_url,
        headers: {
            // Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        transformRequest: [data => JSON.stringify(data)],
    });

    ajax.interceptors.response.use(
        response => {
            const {
                errcode,
                errmsg,
            } = response.data;
            if (!errcode) {
                console.log("success");
            } else {
                console.error(errcode, errmsg);
            }
        },
        err => {
            console.error(err);
        },
    );
    return ajax;
}

const json = (data, msg = ERROR.MSG.SUCCESS, no = ERROR.NO.SUCCESS) => ({
    data: data,
    errno: no,
    errmsg: msg,
});

const ajax = createAjax('https://qyapi.weixin.qq.com/');



module.exports = {
    ajax,
    json
};