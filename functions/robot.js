import AV from 'leanengine';
import {
    json
} from '../utils/ajax';

AV.Cloud.define('test', function (request) {
    return json({
        a: 123
    });
})