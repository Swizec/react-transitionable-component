'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var TransitionableComponent = function (_Component) {
    _inherits(TransitionableComponent, _Component);

    function TransitionableComponent(props) {
        _classCallCheck(this, TransitionableComponent);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TransitionableComponent).call(this, props));

        var easing = props.easing;
        var duration = props.duration;


        _this.state = props;
        _this._defineEasing(easing);
        _this._defineDuration(duration);
        return _this;
    }

    _createClass(TransitionableComponent, [{
        key: '_defineEasing',
        value: function _defineEasing(easing) {
            if (!this.easing || easing !== this.state.easing) {
                if (!easing) {
                    easing = 'linear';
                }
                this.easing = d3['ease' + capitalizeFirstLetter(easing)];
            }
        }
    }, {
        key: '_defineDuration',
        value: function _defineDuration(duration) {
            if (this.duration === undefined) {
                this.duration = duration;
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            var _this2 = this;

            this._defineEasing(newProps.easing);
            this._defineDuration(newProps.duration);

            var node = d3.select(this.refs.node);

            var transition = node.transition().ease(this.easing);

            if (this.duration !== undefined) {
                transition.duration(this.duration);
            }

            Object.keys(newProps).forEach(function (k) {
                if (_typeof(newProps[k]) != 'object') {
                    transition.attr(k, newProps[k]);
                }
            });

            transition.on('end', function () {
                _this2.setState(newProps);
            });
        }
    }]);

    return TransitionableComponent;
}(_react.Component);

exports.default = TransitionableComponent;