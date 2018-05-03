'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImagesListItem = function (_Component) {
  _inherits(ImagesListItem, _Component);

  function ImagesListItem() {
    _classCallCheck(this, ImagesListItem);

    return _possibleConstructorReturn(this, (ImagesListItem.__proto__ || Object.getPrototypeOf(ImagesListItem)).apply(this, arguments));
  }

  _createClass(ImagesListItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          src = _props.src,
          srcSmall = _props.srcSmall,
          srcMedium = _props.srcMedium,
          onPress = _props.onPress,
          onPressImage = _props.onPressImage,
          onImageLoad = _props.onImageLoad,
          children = _props.children;


      return _react2.default.createElement(
        'div',
        { onClick: onPress, className: 'c-image-list-item' },
        _react2.default.createElement(
          'a',
          { onClick: onPressImage, className: 'c-image-list-item__link' },
          _react2.default.createElement(
            'picture',
            null,
            srcSmall && _react2.default.createElement('source', { srcSet: srcSmall, media: '(max-width: 420px)' }),
            srcMedium && _react2.default.createElement('source', { srcSet: srcMedium, media: '(max-width: 1024px)' }),
            _react2.default.createElement('img', { src: src, onLoad: onImageLoad, className: 'c-image-list-item__image' })
          )
        ),
        children
      );
    }
  }]);

  return ImagesListItem;
}(_react.Component);

ImagesListItem.propTypes = {
  src: _propTypes2.default.string.isRequired,
  srcSmall: _propTypes2.default.string,
  srcMedium: _propTypes2.default.string,
  onPress: _propTypes2.default.func,
  onPressImage: _propTypes2.default.func,
  onImageLoad: _propTypes2.default.func
};
exports.default = ImagesListItem;
module.exports = exports['default'];