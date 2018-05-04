'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactInfiniteScroller = require('react-infinite-scroller');

var _reactInfiniteScroller2 = _interopRequireDefault(_reactInfiniteScroller);

var _imagesListItem = require('./images-list-item');

var _imagesListItem2 = _interopRequireDefault(_imagesListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImagesList = function (_Component) {
  _inherits(ImagesList, _Component);

  function ImagesList(props) {
    _classCallCheck(this, ImagesList);

    var _this = _possibleConstructorReturn(this, (ImagesList.__proto__ || Object.getPrototypeOf(ImagesList)).call(this, props));

    _this.state = {
      page: 1,
      imagesLoaded: 0
    };
    return _this;
  }

  _createClass(ImagesList, [{
    key: 'addExtraItem',
    value: function addExtraItem(imageItems) {
      var _props = this.props,
          children = _props.children,
          extraItem = _props.extraItem,
          extraItemPosition = _props.extraItemPosition;


      var position = extraItemPosition === undefined || extraItemPosition > children.length ? children.length : extraItemPosition;
      if (imageItems.length >= position) {
        imageItems.splice(position, 0, _react2.default.cloneElement(extraItem, { key: 'extraItemKey_' }));
      }

      return imageItems;
    }
  }, {
    key: 'onImageLoad',
    value: function onImageLoad() {
      this.setState({ imagesLoaded: this.state.onImageLoad + 1 });
    }
  }, {
    key: 'hasMore',
    value: function hasMore() {
      var hasMore = this.state.page * this.props.imagesItemPerPage < this.props.children.length;
      this.props.onFinishScroll();

      return hasMore;
    }
  }, {
    key: 'areImagesLoaded',
    value: function areImagesLoaded() {
      return this.state.imagesLoaded === this.state.page * this.props.imagesItemPerPage;
    }
  }, {
    key: 'renderInfiniteItems',
    value: function renderInfiniteItems() {
      var _this2 = this;

      var _props2 = this.props,
          children = _props2.children,
          imagesItemPerPage = _props2.imagesItemPerPage,
          extraItem = _props2.extraItem,
          extraItemPosition = _props2.extraItemPosition;


      var imageItems = _react.Children.toArray(children).slice(0, this.state.page * imagesItemPerPage).map(function (imageItem, key) {
        return _react2.default.cloneElement(imageItem, {
          onImageLoad: function onImageLoad() {
            imageItem.props.onImageLoad && imageItem.props.onImageLoad();
            _this2.onImageLoad();
          }
        });
      });

      if (extraItem) {
        return this.addExtraItem(imageItems);
      }

      return imageItems;
    }
  }, {
    key: 'renderInfiniteScroll',
    value: function renderInfiniteScroll() {
      var _this3 = this;

      var infiniteLoading = this.props.infiniteLoading;


      var loadingElement = null;
      if (infiniteLoading) {
        // infinite loading have a bug that show warning if you don't set key to loading element
        loadingElement = _react2.default.cloneElement(infiniteLoading, { key: 0 });
      } else {
        loadingElement = _react2.default.createElement(
          'div',
          { key: 0, className: 'loader' },
          'Loading ...'
        );
      }

      return _react2.default.createElement(
        _reactInfiniteScroller2.default,
        {
          initialLoad: this.areImagesLoaded(),
          pageStart: this.state.page,
          loadMore: function loadMore(page) {
            return _this3.setState({ page: page });
          },
          hasMore: this.hasMore(),
          loader: loadingElement
        },
        _react2.default.createElement(
          'div',
          { className: 'c-image-list no-select' },
          this.renderInfiniteItems()
        )
      );
    }
  }, {
    key: 'renderSimple',
    value: function renderSimple() {
      var _props3 = this.props,
          extraItem = _props3.extraItem,
          children = _props3.children;


      return _react2.default.createElement(
        'div',
        { className: 'c-image-list no-select' },
        extraItem && this.addExtraItem(_react.Children.toArray(children)) || children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var pagination = this.props.pagination;


      if (pagination === 'infinite') {
        return this.renderInfiniteScroll();
      } else {
        return this.renderSimple();
      }
    }
  }]);

  return ImagesList;
}(_react.Component);

ImagesList.propTypes = {
  imagesItemPerPage: _propTypes2.default.number,
  pagination: _propTypes2.default.oneOf(['simple', 'infinite']),
  children: _propTypes2.default.oneOfType([_propTypes2.default.arrayOf(_propTypes2.default.shape({ type: _propTypes2.default.oneOf([_imagesListItem2.default]) })), _propTypes2.default.shape({ type: _propTypes2.default.oneOf([_imagesListItem2.default]) })]),
  onFinishScroll: _propTypes2.default.func,
  extraItem: _propTypes2.default.element,
  extraItemPosition: _propTypes2.default.number,
  infiniteLoading: _propTypes2.default.element
};
ImagesList.defaultProps = {
  imagesItemPerPage: 4,
  pagination: 'simple',
  onFinishScroll: function onFinishScroll() {}
};
exports.default = ImagesList;
module.exports = exports['default'];