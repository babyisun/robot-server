'use strict';
import express from 'express';
import AV from 'leanengine';
import {
    json
} from '../utils/ajax';
import CryptoJS from 'crypto-js';
import {
    AES,
    LEVEL
} from '../config';
import {
    USER_STATUS
} from '../utils/const';

const router = express.Router();

// 注册
router.post('/register', (req, res, next) => {
    const {
        username,
        password,
    } = req.body;
    const user = new AV.User();
    user.setUsername(username);
    user.setPassword(password);
    user.setEmail(username);
    // 记录姓名、默认启用状态
    const params = {
        name: values.registerName,
        status: USER_STATUS.DEFINE.ON,
        level: CryptoJS.AES.encrypt(LEVEL.NORMAL, `${AES.KEY}${username}`).toString()
    };
    user.signUp(params).then(
        loginedUser => {
            // 注册成功
            console.log(loginedUser);

        },
        error => {
            if (error && error.rawMessage) res.json(json(null, error.rawMessage));
        },
    ).catch(next);
});

// 登录
router.post('/login', (req, res, next) => {
    const {
        username,
        password
    } = req.body;
    AV.User.logIn(username, password)
        .then(
            user => {
                res.saveCurrentUser(user);
                res.json(json(user));
            },
            error => {
                if (error && error.rawMessage) {
                    res.json(json(null, error.rawMessage, error.code));
                }
            },
        ).catch(next);
});

// 用户信息
router.get('/profile', (req, res) => {
    res.json(json(req.currentUser));
});


// 发送消息
router.get('/logout', (req, res) => {
    AV.User.logOut();
    res.json(json());
});

export default router;