'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _imagesListItem = require('./images-list-item');

var _imagesListItem2 = _interopRequireDefault(_imagesListItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ImagesListItem component suite', function () {
  var fakeImagesListItemData = {
    src: 'IMG001.jpg'
  };

  var mockOnPress = jest.fn();
  var mockOnPressImage = jest.fn();
  var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_imagesListItem2.default, _extends({}, fakeImagesListItemData, { onPressImage: mockOnPressImage, onPress: mockOnPress })));

  it('should be selectable by class "c-image-list-item"', function () {
    expect(wrapper.is('.c-image-list-item')).toBe(true);
  });

  it('should mount in a full DOM', function () {
    expect((0, _enzyme.mount)(_react2.default.createElement(_imagesListItem2.default, fakeImagesListItemData)).find(_imagesListItem2.default).length).toBe(1);
  });

  it('should have a prop with image src', function () {
    expect(wrapper.instance().props).toMatchObject(fakeImagesListItemData);
  });

  it('should render an image inside of item', function () {
    expect(wrapper.find(_react2.default.createElement('img', { src: fakeImagesListItemData.src, className: 'c-image-list-item__image' }))).toBeTruthy();
  });

  it('should render a link inside of item', function () {
    expect(wrapper.find('a.c-image-list-item__link').length).toBe(1);
  });

  it('should render children if it are passed', function () {
    var imagesListItem = (0, _enzyme.shallow)(_react2.default.createElement(
      _imagesListItem2.default,
      fakeImagesListItemData,
      _react2.default.createElement('div', { id: 'i-am-a-child' }),
      _react2.default.createElement('span', { id: 'i-am-a-another-child' })
    ));
    expect(imagesListItem.find('#i-am-a-child')).toBeTruthy();
    expect(imagesListItem.find('#i-am-a-another-child')).toBeTruthy();
  });

  it('should call a method prop when click at item', function () {
    wrapper.find('.c-image-list-item').simulate('click');
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('should call a method prop when click at link', function () {
    wrapper.find('a.c-image-list-item__link').simulate('click');
    expect(mockOnPressImage).toHaveBeenCalledTimes(1);
  });
});