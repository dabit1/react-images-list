import React from 'react'
import { shallow, mount } from 'enzyme'
import ImagesListItem from './images-list-item'

describe('ImagesListItem component suite', () => {
  const fakeImagesListItemData = {
    src: 'IMG001.jpg'
  }

  const mockOnPress = jest.fn()
  const mockOnPressImage = jest.fn()
  const wrapper = shallow(<ImagesListItem {...fakeImagesListItemData} onPressImage={mockOnPressImage} onPress={mockOnPress} />)

  it('should be selectable by class "c-image-list-item"', () => {
    expect(wrapper.is('.c-image-list-item')).toBe(true)
  })

  it('should mount in a full DOM', () => {
    expect(mount(<ImagesListItem {...fakeImagesListItemData} />).find(ImagesListItem).length).toBe(1)
  })

  it('should have a prop with image src', () => {
    expect(wrapper.instance().props).toMatchObject(fakeImagesListItemData)
  })

  it('should render an image inside of item', () => {
    expect(wrapper.find(<img src={fakeImagesListItemData.src} className='c-image-list-item__image' />)).toBeTruthy()
  })

  it('should render a link inside of item', () => {
    expect(wrapper.find('a.c-image-list-item__link').length).toBe(1)
  })

  it('should render children if it are passed', () => {
    const imagesListItem = shallow((
      <ImagesListItem {...fakeImagesListItemData}>
        <div id='i-am-a-child' />
        <span id='i-am-a-another-child' />
      </ImagesListItem>
    ))
    expect(imagesListItem.find('#i-am-a-child')).toBeTruthy()
    expect(imagesListItem.find('#i-am-a-another-child')).toBeTruthy()
  })

  it('should call a method prop when click at item', () => {
    wrapper.find('.c-image-list-item').simulate('click')
    expect(mockOnPress).toHaveBeenCalledTimes(1)
  })

  it('should call a method prop when click at link', () => {
    wrapper.find('a.c-image-list-item__link').simulate('click')
    expect(mockOnPressImage).toHaveBeenCalledTimes(1)
  })
})
