'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.configurator = undefined;

var _localforage = require('localforage');

var _localforage2 = _interopRequireDefault(_localforage);

var _default = require('./default.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configurator = {};

configurator.setPokedexConfiguration = function (config) {
    if (config) {
        if (config.hasOwnProperty('protocol')) {
            _default.values.setProtocol(config.protocol);
        }
        if (config.hasOwnProperty('hostName')) {
            _default.values.setHostName(config.hostName);
        }
        if (config.hasOwnProperty('versionPath')) {
            _default.values.setVersionPath(config.versionPath);
        }
        if (config.hasOwnProperty('timeout')) {
            _default.values.setTimeout(config.timeout);
        }
        if (config.hasOwnProperty('cache')) {
            _default.values.setCache(config.cache);
        }
    }
};

configurator.setRootEndpointConfiguration = function (config) {
    if (config) {
        if (config.hasOwnProperty('offset')) {
            _default.values.setOffset(config.offset);
        }
        if (config.hasOwnProperty('limit')) {
            _default.values.setLimit(config.limit);
        }
    }
};

_localforage2.default.config({
    name: 'pokeapi-js-wrapper'
});

exports.configurator = configurator;
