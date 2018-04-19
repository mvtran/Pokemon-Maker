'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Pokedex = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _endpoints = require('./endpoints.json');

var _endpoints2 = _interopRequireDefault(_endpoints);

var _rootEndpoints = require('./rootEndpoints.json');

var _rootEndpoints2 = _interopRequireDefault(_rootEndpoints);

var _getter = require('./getter.js');

var _default = require('./default.js');

var _configurator = require('./configurator.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pokedex = exports.Pokedex = function () {
    function Pokedex(config) {
        var _this = this;

        _classCallCheck(this, Pokedex);

        _configurator.configurator.setPokedexConfiguration(config);
        _configurator.configurator.setRootEndpointConfiguration(config);

        // add to Pokedex.prototype all our endpoint functions
        _endpoints2.default.forEach(function (endpoint) {
            _this[endpoint[0]] = function (input) {
                if (input) {

                    // if the user has submitted a Name or an ID, return the JSON promise
                    if (typeof input === 'number' || typeof input === 'string') {
                        return (0, _getter.loadResource)('' + _default.values.versionPath + endpoint[1] + '/' + input + '/');
                    }

                    // if the user has submitted an Array
                    // return a new promise which will resolve when all loadResource calls are ended
                    else if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object') {
                            return Promise.all(mapResources(endpoint, input));
                        }
                }
            };
        });

        _rootEndpoints2.default.forEach(function (rootEndpoint) {
            _this[rootEndpoint[0]] = function (config) {
                var limit = _default.values.limit;
                var offset = _default.values.offset;
                if (config) {
                    if (config.hasOwnProperty('offset')) {
                        offset = config.offset;
                    }
                    if (config.hasOwnProperty('limit')) {
                        limit = config.limit;
                    }
                }
                return (0, _getter.loadResource)('' + _default.values.versionPath + rootEndpoint[1] + '?limit=' + limit + '&offset=' + offset);
            };
        });
    }

    _createClass(Pokedex, [{
        key: 'resource',
        value: function resource(path) {
            if (typeof path === 'string') {
                return (0, _getter.loadResource)(path);
            } else if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object') {
                return Promise.all(path.map(function (p) {
                    return (0, _getter.loadResource)(p);
                }));
            } else {
                return 'String or Array is required';
            }
        }
    }]);

    return Pokedex;
}();

;

function mapResources(endpoint, input) {
    return input.map(function (res) {
        return (0, _getter.loadResource)('' + _default.values.versionPath + endpoint[1] + '/' + res + '/');
    });
}
