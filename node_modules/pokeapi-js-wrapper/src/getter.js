'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadResource = undefined;

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _localforage = require('localforage');

var _localforage2 = _interopRequireDefault(_localforage);

var _default = require('./default.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CACHE_PREFIX = "pokeapi-js-wrapper-";

function loadResource(url) {
    return new Promise(function (resolve, reject) {
        _localforage2.default.ready().then(function () {
            _localforage2.default.getItem('' + CACHE_PREFIX + url).then(function (value) {
                if (value === null) {
                    loadUrl(url).then(function (res) {
                        resolve(res);
                    }).catch(function (err) {
                        reject(err);
                    });
                } else {
                    resolve(addCacheMark(value));
                }
            }).catch(function (error) {
                loadUrl(url).then(function (res) {
                    resolve(res);
                }).catch(function (err) {
                    reject(err);
                });
            });
        }).catch(function (err) {
            loadUrl(url).then(function (res) {
                resolve(res);
            }).catch(function (err) {
                reject(err);
            });
        });
    });
};

function loadUrl(url) {
    return new Promise(function (resolve, reject) {
        var options = {
            baseURL: _default.values.protocol + '://' + _default.values.hostName + '/',
            timeout: _default.values.timeout
        };
        _axios2.default.get(url, options).then(function (response) {
            // if there was an error
            if (response.status >= 400) {
                reject(response);
            } else {
                // if everything was good
                // cache the object in browser memory
                // only if cache is true
                if (_default.values.cache) {
                    _localforage2.default.setItem('' + CACHE_PREFIX + url, response.data);
                }
                resolve(addCacheMark(response.data, 0));
            }
        }).catch(function (err) {
            reject(err);
        });
    });
}

function addCacheMark(object) {
    var cached = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

    //object.fromCache = cached;
    return object;
}

exports.loadResource = loadResource;
