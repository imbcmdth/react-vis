'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _deck = require('deck.gl');

var _d3Color = require('d3-color');

var _theme = require('../../theme');

var _abstractSeries = require('./abstract-series');

var _abstractSeries2 = _interopRequireDefault(_abstractSeries);

var _scalesUtils = require('../../utils/scales-utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Copyright (c) 2017 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

var LineSeriesGL = function (_AbstractSeries) {
  _inherits(LineSeriesGL, _AbstractSeries);

  function LineSeriesGL() {
    _classCallCheck(this, LineSeriesGL);

    return _possibleConstructorReturn(this, (LineSeriesGL.__proto__ || Object.getPrototypeOf(LineSeriesGL)).apply(this, arguments));
  }

  _createClass(LineSeriesGL, [{
    key: 'render',
    value: function render() {
      return null;
    }
  }], [{
    key: 'renderLayer',
    value: function renderLayer(props) {
      var data = props.data,
          opacity = props.opacity,
          seriesId = props.seriesId,
          strokeWidth = props.strokeWidth,
          onValueMouseOver = props.onValueMouseOver,
          onValueClick = props.onValueClick,
          fp64 = props.fp64;


      var x = (0, _scalesUtils.getAttributeFunctor)(props, 'x');
      var y = (0, _scalesUtils.getAttributeFunctor)(props, 'y');
      var fill = (0, _scalesUtils.getAttributeFunctor)(props, 'fill') || (0, _scalesUtils.getAttributeFunctor)(props, 'color');
      var opacityScale = (0, _scalesUtils.getAttributeFunctor)(props, 'opacity');

      return new _deck.PathLayer({
        id: seriesId,
        data: [data],
        getPath: function getPath(p) {
          return p.map(function (row) {
            return [x(row), y(row)];
          });
        },
        getColor: function getColor(p) {
          var color = (0, _d3Color.rgb)(fill(p));
          return [color.r, color.g, color.b, (opacityScale(p) || _theme.DEFAULT_OPACITY) * 255];
        },
        getWidth: function getWidth(p) {
          return Number(strokeWidth) || 1;
        },
        opacity: opacity || _theme.DEFAULT_OPACITY,
        projectionMode: _deck.COORDINATE_SYSTEM.IDENTITY,
        pickable: true,
        onHover: function onHover(row) {
          return onValueMouseOver(row.object);
        },
        onClick: function onClick(row) {
          return onValueClick(row.object);
        },
        fp64: fp64
      });
    }
  }, {
    key: 'requiresSVG',
    get: function get() {
      return false;
    }
  }, {
    key: 'isDeckGL',
    get: function get() {
      return true;
    }
  }]);

  return LineSeriesGL;
}(_abstractSeries2.default);

LineSeriesGL.displayName = 'LineSeriesGL';
LineSeriesGL.defaultProps = {
  onValueMouseOver: function onValueMouseOver() {},
  onValueClick: function onValueClick() {},
  fp64: false
};
LineSeriesGL.propTypes = _extends({}, _abstractSeries2.default.propTypes, {
  seriesId: _propTypes2.default.string.isRequired
});

exports.default = LineSeriesGL;