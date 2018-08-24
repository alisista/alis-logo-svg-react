'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ALIS_LOGO = function (_Component) {
  _inherits(ALIS_LOGO, _Component);

  function ALIS_LOGO(props) {
    _classCallCheck(this, ALIS_LOGO);

    var _this = _possibleConstructorReturn(this, (ALIS_LOGO.__proto__ || Object.getPrototypeOf(ALIS_LOGO)).call(this, props));

    _this.tiles = [[1, 2, 3], [3, 4, 1], [4, 3, 5], [6, 5, 4], [5, 6, 7], [7, 8, 5], [5, 9, 8], [5, 9, 10], [10, 9, 12], [11, 12, 10]];

    _this.state = {
      id: _this.props.id || 'alis_logo',
      shuffle: _this.props.shuffle,
      update: Date.now()
    };
    return _this;
  }

  _createClass(ALIS_LOGO, [{
    key: 'shuffle',
    value: function shuffle() {
      this.setState({ shuffle: true, update: Date.now() });
    }
  }, {
    key: 'download',
    value: function download(file_name) {
      var canvas = document.getElementById('c');
      var size = this.props.size || 300;

      canvas.width = size;
      canvas.height = size;
      if (this.props.type == 'logo+letters') {
        canvas.height = size / 3;
      } else if (this.props.type == 'logo+letters+slogan') {
        canvas.height = size / 2;
        if (size == 531) {
          canvas.height = 288;
        }
      }
      var svg = document.getElementById(this.props.id);
      var div = document.getElementById('d');
      div.innerHTML = svg.outerHTML;
      svg = div.querySelector('svg');

      var data = new XMLSerializer().serializeToString(svg);
      var win = window.URL || window.webkitURL || window;
      var img = new Image();
      var blob = new Blob([data], { type: 'image/svg+xml' });
      var url = win.createObjectURL(blob);

      img.onload = function () {
        canvas.getContext('2d').drawImage(img, 0, 0);
        win.revokeObjectURLog(url);
        var uri = canvas.toDataURL('image/png').replace('image/png', 'octet/stream');
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = uri;
        a.download = file_name || 'alis_logo_' + size + 'px.png';
        a.click();
        window.URL.revokeObjectURL(uri);
        document.body.removeChild(a);
      };
      img.src = url;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.state.shuffle !== props.shuffle) {
        this.setState({ shuffle: props.shuffle });
      }
    }
  }, {
    key: 'getCircleColor',
    value: function getCircleColor(colors) {
      var circle_color = this.props.circle_color;
      if (this.props.colors == undefined && this.circle_color == undefined) {
        circle_color = '#5E68AF';
      } else if (circle_color == undefined) {
        circle_color = colors[Math.floor(Math.random() * colors.length)];
      }

      return circle_color;
    }
  }, {
    key: 'getTiles_letters',
    value: function getTiles_letters(ratio, colors) {
      var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var top = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var left = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var ratio2 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

      var _getPoints_letters = this.getPoints_letters(ratio, scale, top, left),
          letter_points = _getPoints_letters.points_ali,
          s_points = _getPoints_letters.points_s;

      var letters = [[0, 1, 4, 5, 6, 3, 2], [7, 8, 9, 10, 11, 12], [13, 14, 15, 16], [17, 18, 19, 20]];

      var tile_colors = [0, 1, 2, 3, 4, 5].map(function (v) {
        return v % colors.length;
      });
      var points = [];
      var i = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = letters[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          var pts2 = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = v[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var pt = _step2.value;

              pts2.push(letter_points[pt].join(' '));
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          points.push(_react2.default.createElement('path', { d: 'M' + pts2.join(', ') + ' Z', stroke: colors[tile_colors[i]], fill: colors[tile_colors[i]] }));
          i += 1;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      points.push(this.makePath('MCCLCCZ', s_points, colors[tile_colors[i]]));
      i += 1;
      if (this.props.type === 'logo+letters+slogan') {
        points = points.concat(this.getSlogan(colors[tile_colors[i]], ratio2));
      }
      return points;
    }
  }, {
    key: 'makePath',
    value: function makePath(routes, points, color) {
      var path = [];
      var cursor = 0;
      var paths_route = routes.split('');
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = paths_route[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var r = _step3.value;

          var d = r;
          if (r !== 'Z') {
            if (r !== 'M') {
              d += ' ';
            }
            var number_of_points = 1;
            if (r === 'C') {
              number_of_points = 3;
            }
            for (var i2 = 0; i2 < number_of_points; i2++) {
              if (i2 !== 0) {
                d += ', ';
              }
              d += points[cursor][0] + ' ' + points[cursor][1];
              cursor += 1;
            }
          }
          path.push(d);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return _react2.default.createElement('path', { d: path.join(' '), stroke: color, fill: color });
    }
  }, {
    key: 'getSlogan',
    value: function getSlogan(color, ratio2) {
      var points = [];
      var fontSize = 16 * ratio2;
      var letterSpacing = 7 * ratio2;
      var texts = this.props.text.split('\n');
      var t1 = 185;
      var t2 = 220;
      if (this.props.size == 531) {
        t1 = 190;
        t2 = 230;
        if (texts.length < 2) {
          t1 = 205;
        }
      } else {
        if (texts.length < 2) {
          t1 = 200;
        }
      }
      points.push(_react2.default.createElement(
        'text',
        { fontSize: fontSize + "px", letterSpacing: letterSpacing + "px", x: (this.props.size || 300) / 2, y: t1 * ratio2, fill: color, textAnchor: 'middle', className: 'heavy' },
        texts[0]
      ));
      if (texts.length > 1) {
        points.push(_react2.default.createElement(
          'text',
          { fontSize: fontSize + "px", letterSpacing: letterSpacing + "px", x: (this.props.size || 300) / 2, y: t2 * ratio2, fill: color, textAnchor: 'middle', className: 'heavy' },
          texts[1]
        ));
      }
      return points;
    }
  }, {
    key: 'getTiles',
    value: function getTiles(ratio, colors) {
      var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var top = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var left = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var ratio2 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

      var points = this.getPoints(ratio, scale, top, left, ratio2);

      var tile_colors = [0, 1, 2, 3, 4, 5, 2, 3, 0, 1].map(function (v) {
        return v % colors.length;
      });

      var tiles = [];
      this.tiles.forEach(function (v, i) {
        var color = colors[tile_colors[i]];
        tiles.push(_react2.default.createElement('path', {
          key: 'tile-' + i,
          fill: color,
          stroke: color,
          d: 'M ' + points[v[0] - 1].join(' ') + ' L ' + points[v[1] - 1].join(' ') + ' L ' + points[v[2] - 1].join(' ') + ' L ' + points[v[0] - 1].join(' ')
        }));
      });

      return tiles;
    }
  }, {
    key: 'getColors',
    value: function getColors() {
      var colors = [];
      var nums = [];
      var prop_colors = this.props.colors || ['#454A75', '#51578A', '#5C629C', '#686FB0', '#7880CC', '#848DE0'];
      var len = prop_colors.length;
      for (var i = 0; i < len; i += 1) {
        nums.push(i);
      }
      for (var _i = 0; _i < len; _i += 1) {
        var n = 0;
        if (this.state.shuffle === true) {
          n = Math.floor(Math.random() * nums.length);
        }
        colors.push(prop_colors[nums[n]]);
        nums.splice(n, 1);
      }
      var number_of_colors = this.props.number_of_colors || this.colors;
      if (number_of_colors !== undefined && number_of_colors > 0) {
        colors = colors.slice(0, number_of_colors, 1);
      }

      return colors;
    }
  }, {
    key: 'getPoints_letters',
    value: function getPoints_letters(ratio, scale, top, left) {
      top = top * scale * ratio;
      left = left * scale * ratio;
      var letter_points = [[28, 146], [51, 146], [84, 19], [106, 19], [95, 46], [138, 147], [161, 147], [194, 19], [216, 19], [216, 125], [283, 125], [283, 147], [194, 147], [319, 19], [319, 50], [341, 39], [341, 19], [319, 61], [319, 147], [341, 147], [341, 50], [460, 50], [471, 34], [392, 114], [379, 129]];
      var s_points = [[391, 112], [436, 154], [491, 107], [424, 92], [340, 73], [396, -19], [472, 33], [460, 50], [415, 17], [370, 61], [440, 75], [513, 94], [465, 189], [377, 129]];
      letter_points.forEach(function (p, i) {
        var i2 = 0;
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = p[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var p2 = _step4.value;

            var move = void 0;
            if (i2 === 1) {
              move = top;
            } else {
              move = left;
            }
            letter_points[i][i2] = scale * ratio * p2 + move;
            i2 += 1;
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
              _iterator4.return();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }

        i += 1;
      });
      s_points.forEach(function (p, i) {
        var i2 = 0;
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = p[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var p2 = _step5.value;

            var move = void 0;
            if (i2 === 1) {
              move = top;
            } else {
              move = left;
            }
            s_points[i][i2] = scale * ratio * p2 + move;
            i2 += 1;
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        i += 1;
      });
      return { points_ali: letter_points, points_s: s_points };
    }
  }, {
    key: 'getPoints',
    value: function getPoints(ratio) {
      var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var top = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var left = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var ratio2 = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;

      var points = [[0, 300], [77, 300], [120, 182], [61, 135], [150, 100], [92, 50], [110, 0], [186, 0], [237, 135], [177, 182], [220, 300], [300, 300]];

      var size = (this.props.size || 300) * scale;
      top = top * scale * ratio2;
      left = left * scale * ratio2;
      var size_adjusted = size;
      var minus = 0;
      var nomargin = this.props.nomargin || false;
      if (nomargin === true && this.props.type == 'logo') {
        size_adjusted = size / 0.82 * 0.95;
        minus = size * (0.95 - 0.82);
      }

      points.forEach(function (p, i) {
        var i2 = 0;
        var _iteratorNormalCompletion6 = true;
        var _didIteratorError6 = false;
        var _iteratorError6 = undefined;

        try {
          for (var _iterator6 = p[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
            var p2 = _step6.value;

            p2 -= minus;
            var mult = 0.25;
            var move = void 0;
            if (i2 === 1) {
              mult = 0.221;
              move = top;
            } else {
              move = left;
            }
            points[i][i2] = size_adjusted / 300 * p2 * 0.5 + size_adjusted * mult + move;
            i2 += 1;
          }
        } catch (err) {
          _didIteratorError6 = true;
          _iteratorError6 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion6 && _iterator6.return) {
              _iterator6.return();
            }
          } finally {
            if (_didIteratorError6) {
              throw _iteratorError6;
            }
          }
        }

        i += 1;
      });

      return points;
    }
  }, {
    key: 'getCircle',
    value: function getCircle(ratio, colors) {
      var scale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var top = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var left = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var ratio2 = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 1;

      var size = (this.props.size || 300) * scale;
      top = top * ratio2 * scale;
      left = left * ratio2 * scale;

      var circle_color = this.getCircleColor(colors);

      return _react2.default.createElement('circle', { key: 'circle', cx: size / 2 + left, cy: size / 2 + top, r: size / 2 * ratio, fill: 'none', stroke: circle_color, strokeWidth: size / 25 });
    }
  }, {
    key: 'getBackground',
    value: function getBackground() {
      var size = this.props.size || 300;
      var background = null;

      if (this.props.backgroundColor !== undefined && this.props.backgroundColor !== false) {
        var height = size;
        if (this.props.type == 'logo+letters') {
          height = size / 3;
        } else if (this.props.type == 'logo+letters+slogan') {
          height = size / 2;
          if (size == 531) {
            height = 288;
          }
        }
        background = _react2.default.createElement('rect', { key: 'background', x: '0', y: '0', width: size, height: height, fill: this.props.backgroundColor });
      }

      return background;
    }
  }, {
    key: 'render',
    value: function render() {
      var shuffle = this.state.shuffle;
      var size = this.props.size || 300;

      var colors = this.getColors();

      var background = this.getBackground();
      var defs = void 0,
          tiles_logo = void 0,
          tiles_letters = void 0,
          circle = void 0,
          height = void 0,
          ratio_letters = void 0,
          scale_letters = void 0,
          top_letters = void 0,
          left_letters = void 0,
          ratio_logo2 = void 0,
          ratio_letters2 = void 0,
          ratio_logo = void 0,
          top_logo = void 0,
          left_logo = void 0,
          scale = void 0;
      var types = {
        logo: { logo: true },
        letters: { letters: true },
        "logo+letters": { logo: true, letters: true },
        "logo+letters+slogan": { logo: true, letters: true, slogan: true }
      };
      var type = types[this.props.type];
      if (this.props.type == 'logo+letters+slogan') {
        ratio_logo = 0.82;
        ratio_logo2 = size / 500;
        top_logo = 35;
        left_logo = 35;
        scale = 0.3;
        if (size == 531) {
          scale = 0.25;
          top_logo = 50;
          left_logo = 200;
        }

        ratio_letters = size * 0.7 / 500;
        top_letters = 45;
        left_letters = 225;
        scale_letters = 0.95;
        ratio_letters2 = ratio_logo2;
        if (size == 531) {
          scale_letters = 0.95 * (0.25 / 0.3);
          top_letters = 55;
          left_letters = 310;
          height = 288;
        }

        height = size / 2;
      } else if (this.props.type == 'logo+letters') {
        ratio_logo = 0.82;
        ratio_logo2 = size / 500;
        top_logo = 35;
        left_logo = 35;
        scale = 0.3;

        ratio_letters = size * 0.7 / 500;
        top_letters = 40;
        left_letters = 225;
        scale_letters = 0.95;

        height = size / 3;
      } else if (this.props.type == 'letters') {
        ratio_letters = size / 500;
        tiles_letters = this.getTiles_letters(ratio_letters, colors);
        return _react2.default.createElement(
          'svg',
          { id: this.props.id, style: { height: size / 3 + "px", width: size + "px" } },
          background,
          tiles_letters
        );
      } else {
        ratio_logo = 0.82;
        var nomargin = this.props.nomargin || false;
        if (nomargin === true) {
          ratio_logo = 0.95;
        }

        height = size;
      }

      if (type.logo === true) {
        tiles_logo = this.getTiles(ratio_logo, colors, scale, top_logo, left_logo, ratio_logo2);
        circle = this.getCircle(ratio_logo, colors, scale, top_logo, left_logo, ratio_logo2);
      }
      if (type.letters === true) {
        tiles_letters = this.getTiles_letters(ratio_letters, colors, scale_letters, top_letters, left_letters, ratio_logo2);
      }
      if (type.slogan === true) {
        defs = _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'style',
            { type: 'text/css' },
            '@import url(\'https://fonts.googleapis.com/earlyaccess/sawarabigothic.css\');',
            'text {font-family: "Sawarabi Gothic";}'
          )
        );
      }
      return _react2.default.createElement(
        'svg',
        { id: this.props.id, style: { height: height + "px", width: size + "px" } },
        defs,
        background,
        tiles_logo,
        circle,
        tiles_letters
      );
    }
  }]);

  return ALIS_LOGO;
}(_react.Component);

exports.default = ALIS_LOGO;