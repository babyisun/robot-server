'use strict';
import express from 'express';
import AV from 'leanengine';
import moment from 'moment';
import {
    ajax,
    json
} from '../utils/ajax';
import {
    STATUS,
    ERROR
} from '../utils/const';
import RobotModel from '../model/robot';

const router = express.Router();

// 发送消息
router.post('/', function (req, res, next) {
    var {
        url,
        key,
        user
    } = req.body;
    var post_data = {
        "msgtype": "markdown",
        "markdown": {
            "content": `Bug反馈<font color=\"warning\">132个</font>，请相关同事注意。\n
>自测:<font color=\"info\">1例</font> \n >QA反馈:<font color=\"comment\">15例</font> \n
[本消息来自小机机](http://127.0.0.1:3000)`,
            // "content": "发送测试：" + moment().format('YYYY-MM-DD HH:mm:ss'),
            // "mentioned_list": ["wangqing", "@all"],
        }
    };
    // res.json(json({
    //     key,
    //     user,
    //     a: 123
    // }));
    ajax.post(url, post_data).then((data) => {
        res.json(json(data));
    }).catch(next);

});

// 列表
router.get('/list', (req, res, next) => {
    const {
        id
    } = req.currentUser;
    const {
        name,
        skip,
        limit
    } = req.query;
    // console.log('user', req.currentUser.id);
    // console.log('body', req.query);

    const query = new AV.Query(RobotModel)
        .equalTo('user', id)
        .contains('name', name || '')
        .descending('createdAt');
    AV.Promise.all([query.find(),
        query.skip(skip).limit(limit).count()
    ]).then((data) => {
        // console.log('query', data);
        res.json(json(data));
    }).catch(next);
});

// 列表
router.post('/create', async (req, res, next) => {
    const {
        id
    } = req.currentUser;
    const {
        name,
        groupName,
        url,
        key
    } = req.body;
    const query = new AV.Query(RobotModel)
        .equalTo('user', id)
        .equalTo('key', key);
    const exists = await query.count();
    console.log('exists', exists);
    if (exists === 0) {
        const robotModel = new RobotModel({
            name,
            groupName,
            url,
            key,
            status: STATUS.DEFINE.ON,
            user: id,
        });
        const result = await robotModel.save();
        console.log('result', result);
        if (result) {
            const robot_msg = {
                "msgtype": "markdown",
                "markdown": {
                    "content": `大家好。我叫<font color=\"info\">${name}</font>，是一个初来乍到的机器人。\n 创建时间：${moment().format('YYYY-MM-DD HH:mm:ss')} \n ------------------------------------------- \n 本消息来自[小机机](http://127.0.0.1:3000)，智能机器人助手 \n <font color=\"comment\">这是一条连通性测试消息，正式消息不包含链接</font> \n`,
                }
            };
            const send_result = await ajax.post(url, robot_msg);
            console.log('send', send_result);
            // 微信并没有返回确切的值，调用即视为成功
            res.json(json(null));
        } else {
            res.json(json(null, '添加失败，请稍后再试', ERROR.NO.ERROR));
        }
    } else {
        res.json(json(null, '该机器人已在列表中', ERROR.NO.ERROR));
    }
});


module.exports = router;