'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _imagesList = require('./images-list');

var _imagesList2 = _interopRequireDefault(_imagesList);

var _imagesListItem = require('./images-list-item');

var _imagesListItem2 = _interopRequireDefault(_imagesListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ImagesList component suite', function () {
  var fakeImagesListItems = [_react2.default.createElement(_imagesListItem2.default, { key: 0, src: 'IMG001.jpg' }), _react2.default.createElement(_imagesListItem2.default, { key: 1, src: 'IMG002.jpg' })];
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
    _imagesList2.default,
    null,
    fakeImagesListItems
  ));

  it('should be selectable by class "c-image-list"', function () {
    expect(wrapper.find('.c-image-list').length).toBe(1);
  });

  it('should mount in a full DOM', function () {
    expect((0, _enzyme.mount)(_react2.default.createElement(_imagesList2.default, null)).find(_imagesList2.default).length).toBe(1);
  });

  it('should render items when passed in', function () {
    expect(wrapper.find(_imagesListItem2.default)).toHaveLength(2);
  });

  it('should render items as infinite scroll', function () {
    var infiniteScrollWrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _imagesList2.default,
      { pagination: 'infinite' },
      _react2.default.createElement(_imagesListItem2.default, { key: 0, src: 'IMG001.jpg' }),
      _react2.default.createElement(_imagesListItem2.default, { key: 1, src: 'IMG002.jpg' })
    ));
    expect(infiniteScrollWrapper.find(_imagesList2.default)).toHaveLength(1);
    expect(infiniteScrollWrapper.find(_imagesListItem2.default)).toHaveLength(2);
  });

  it('should limit number of items rendered as infinite scroll', function () {
    var infiniteScrollWrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _imagesList2.default,
      { imagesItemPerPage: 2, infiniteLoading: _react2.default.createElement(
          'span',
          { key: 1 },
          'asds'
        ), pagination: 'infinite' },
      _react2.default.createElement(_imagesListItem2.default, { key: 0, src: 'IMG001.jpg' }),
      _react2.default.createElement(_imagesListItem2.default, { key: 1, src: 'IMG002.jpg' }),
      _react2.default.createElement(_imagesListItem2.default, { key: 2, src: 'IMG002.jpg' })
    ));
    expect(infiniteScrollWrapper.find(_imagesListItem2.default)).toHaveLength(2);
  });

  it('should render a custom loading when uses infinite scroll', function () {
    var infiniteScrollWrapper = (0, _enzyme.mount)(_react2.default.createElement(
      _imagesList2.default,
      { imagesItemPerPage: 2, infiniteLoading: _react2.default.createElement(
          'span',
          null,
          'Loading'
        ), pagination: 'infinite' },
      _react2.default.createElement(_imagesListItem2.default, { key: 0, src: 'IMG001.jpg' }),
      _react2.default.createElement(_imagesListItem2.default, { key: 1, src: 'IMG002.jpg' }),
      _react2.default.createElement(_imagesListItem2.default, { key: 2, src: 'IMG002.jpg' })
    ));
    expect(infiniteScrollWrapper.containsMatchingElement(_react2.default.createElement(
      'span',
      null,
      'Loading'
    ))).toBeTruthy();
  });

  it('should render an extra item passed by props at position specified', function () {
    var wrapperMounted = (0, _enzyme.mount)(_react2.default.createElement(
      _imagesList2.default,
      { extraItem: _react2.default.createElement(
          'p',
          null,
          'test'
        ), extraItemPosition: 1 },
      fakeImagesListItems
    ));
    expect(wrapperMounted.find(_imagesList2.default).find('.c-image-list').childAt(1).is('p')).toBeTruthy();
  });

  it('should render an extra item passed by props at last position if its position is bigger than the items length', function () {
    var wrapperMounted = (0, _enzyme.mount)(_react2.default.createElement(
      _imagesList2.default,
      { extraItem: _react2.default.createElement(
          'p',
          null,
          'test'
        ), extraItemPosition: 5 },
      fakeImagesListItems
    ));
    expect(wrapperMounted.find(_imagesList2.default).find('.c-image-list').childAt(2).is('p')).toBeTruthy();
  });
});