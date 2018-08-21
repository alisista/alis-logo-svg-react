"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

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

    var circle_color = _this.props.circle_color;
    if (_this.props.colors == undefined && _this.circle_color == undefined) {
      circle_color = "#5E68AF";
    }
    var colors = _this.props.colors || ["#454A75", "#51578A", "#5C629C", "#686FB0", "#7880CC", "#848DE0"];

    _this.state = {
      id: _this.props.id || "alis_logo",
      colors: colors,
      circle_color: circle_color,
      size: _this.props.size || 300,
      number_of_colors: _this.props.number_of_colors || _this.colors,
      backgroundColor: _this.props.backgroundColor || false,
      shuffle: _this.props.shuffle || false,
      nomargin: _this.props.nomargin || false
    };
    return _this;
  }

  _createClass(ALIS_LOGO, [{
    key: "download",
    value: function download(file_name) {
      var _this2 = this;

      var canvas = document.getElementById("c");
      canvas.width = this.state.size;
      canvas.height = this.state.size;

      var svg = document.getElementById(this.props.id);
      var div = document.getElementById("d");
      div.innerHTML = svg.outerHTML;
      svg = div.querySelector("svg");

      var data = new XMLSerializer().serializeToString(svg);
      var win = window.URL || window.webkitURL || window;
      var img = new Image();
      var blob = new Blob([data], { type: "image/svg+xml" });
      var url = win.createObjectURL(blob);

      img.onload = function () {
        canvas.getContext("2d").drawImage(img, 0, 0);
        win.revokeObjectURL(url);
        var uri = canvas.toDataURL("image/png").replace("image/png", "octet/stream");
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        a.href = uri;
        a.download = file_name || "alis_logo_" + _this2.state.size + "px.png";
        a.click();
        window.URL.revokeObjectURL(uri);
        document.body.removeChild(a);
      };
      img.src = url;
    }
  }, {
    key: "getCircleColor",
    value: function getCircleColor(colors) {
      var circle_color = this.state.circle_color;
      if (circle_color == undefined) {
        circle_color = colors[Math.floor(Math.random() * colors.length)];
      }

      return circle_color;
    }
  }, {
    key: "getTiles",
    value: function getTiles(ratio, colors) {
      // calculate actual points
      var points = this.getPoints(ratio);

      // get tile colors
      var tile_colors = [0, 1, 2, 3, 4, 5, 2, 3, 0, 1].map(function (v) {
        return v % colors.length;
      });

      var tiles = [];
      this.tiles.forEach(function (v, i) {
        var color = colors[tile_colors[i]];
        tiles.push(_react2.default.createElement("path", {
          key: "tile-" + i,
          fill: color,
          stroke: color,
          d: "M " + points[v[0] - 1].join(" ") + " L " + points[v[1] - 1].join(" ") + " L " + points[v[2] - 1].join(" ") + " L " + points[v[0] - 1].join(" ")
        }));
      });

      return tiles;
    }
  }, {
    key: "getColors",
    value: function getColors() {
      var colors = [];
      var nums = [];
      var len = this.state.colors.length;
      for (var i = 0; i < len; i += 1) {
        nums.push(i);
      }
      for (var _i = 0; _i < len; _i += 1) {
        var n = 0;
        if (this.props.shuffle === true) {
          n = Math.floor(Math.random() * nums.length);
        }
        colors.push(this.state.colors[nums[n]]);
        nums.splice(n, 1);
      }
      if (this.state.number_of_colors !== undefined && this.state.number_of_colors > 0) {
        colors = colors.slice(0, this.state.number_of_colors, 1);
      }

      return colors;
    }
  }, {
    key: "getPoints",
    value: function getPoints(ratio) {
      var points = [[0, 300], [77, 300], [120, 182], [61, 135], [150, 100], [92, 50], [110, 0], [186, 0], [237, 135], [177, 182], [220, 300], [300, 300]];

      var size_adjusted = this.state.size;
      var minus = 0;
      if (this.props.nomargin === true) {
        size_adjusted = this.state.size / 0.82 * 0.95;
        minus = this.state.size * (0.95 - 0.82);
      }

      points.forEach(function (p, i) {
        var i2 = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = p[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var p2 = _step.value;

            p2 -= minus;
            var mult = 0.25;
            if (i2 === 1) {
              mult = 0.221;
            }
            points[i][i2] = size_adjusted / 300 * p2 * 0.5 + size_adjusted * mult;
            i2 += 1;
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

        i += 1;
      });

      return points;
    }
  }, {
    key: "getCircle",
    value: function getCircle(ratio, colors) {
      // get circle color
      var circle_color = this.getCircleColor(colors);

      return _react2.default.createElement("circle", { key: "circle", cx: this.state.size / 2, cy: this.state.size / 2, r: this.state.size / 2 * ratio, fill: "none", stroke: circle_color, strokeWidth: this.state.size / 25 });
    }
  }, {
    key: "getBackground",
    value: function getBackground() {
      var background = null;
      if (this.state.backgroundColor !== false) {
        background = _react2.default.createElement("rect", { key: "background", x: "0", y: "0", width: this.state.size, height: this.state.size, fill: this.state.backgroundColor });
      }

      return background;
    }
  }, {
    key: "render",
    value: function render() {
      var ratio = 0.82;
      if (this.props.nomargin === true) {
        ratio = 0.95;
      }
      // get colors
      var colors = this.getColors();

      // get background
      var background = this.getBackground();

      // generate tiles
      var tiles = this.getTiles(ratio, colors);

      var circle = this.getCircle(ratio, colors);

      return _react2.default.createElement(
        "svg",
        { id: this.props.id, style: { height: this.state.size + "px", width: this.state.size + "px" } },
        background,
        tiles,
        circle
      );
    }
  }]);

  return ALIS_LOGO;
}(_react.Component);

exports.default = ALIS_LOGO;