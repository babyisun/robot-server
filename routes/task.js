'use strict';
import express from 'express';
import AV from 'leanengine';
import schedule from 'node-schedule';
import TaskModel from '../model/task';
import {
    ajax,
    json
} from '../utils/ajax';
import {
    STATUS,
    ERROR
} from '../utils/const';

const router = express.Router();

// 任务列表
router.post('/create', async (req, res, next) => {
    const {
        id
    } = req.currentUser;
    const {
        name,
        corn,
        content,
        msgtype,
    } = req.body;

    const taskModel = new TaskModel({
        name,
        corn,
        content,
        msgtype,
        status: STATUS.DEFINE.ON,
        user: id,
    });
    const params = {};

    ajax.post('/robot/text', params);
    const result = await taskModel.save();
    console.log('result', result);
    res.json(json(result));
});

// 任务列表
router.post('/detail', async (req, res, next) => {
    const {
        id
    } = req.currentUser;
    const {
        objectId,
    } = req.query;

    const query = new AV.Query(TaskModel)
        .contains('objectId', objectId).equalTo('user', id);

    const result = await query.first();
    console.log('result', result);
    res.json(json(result));
});

// 任务列表
router.get('/list', (req, res, next) => {
    const {
        id
    } = req.currentUser;
    const {
        name,
        skip,
        limit
    } = req.query;

    const query = new AV.Query(TaskModel)
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

module.exports = router;