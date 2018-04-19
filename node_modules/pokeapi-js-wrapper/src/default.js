'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var values = {};

values.protocol = 'http';
values.hostName = 'pokeapi.co';
values.versionPath = '/api/v2/';
values.offset = 0;
values.limit = 100000;
values.timeout = 20 * 1000; // 20 seconds
values.cache = true;

values.setProtocol = function (newProtocol) {
    values.protocol = newProtocol;
};
values.setHostName = function (newHostName) {
    values.hostName = newHostName;
};
values.setVersionPath = function (newVersionPath) {
    values.versionPath = newVersionPath;
};
values.setOffset = function (newOffset) {
    values.offset = newOffset - 1;
};
values.setLimit = function (newLimit) {
    values.limit = newLimit + 1;
};
values.setTimeout = function (newTimeout) {
    values.timeout = newTimeout;
};
values.setCache = function (newCache) {
    values.cache = newCache;
};

exports.values = values;
