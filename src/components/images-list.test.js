import React from 'react'
import { shallow, mount } from 'enzyme'
import ImagesList from './images-list'
import ImagesListItem from './images-list-item'

describe('ImagesList component suite', () => {
  const fakeImagesListItems = [
    <ImagesListItem key={0} src='IMG001.jpg' />,
    <ImagesListItem key={1} src='IMG002.jpg' />
  ]
  const wrapper = shallow(<ImagesList>{fakeImagesListItems}</ImagesList>)

  it('should be selectable by class "c-image-list"', () => {
    expect(wrapper.find('.c-image-list').length).toBe(1)
  })

  it('should mount in a full DOM', () => {
    expect(mount(<ImagesList />).find(ImagesList).length).toBe(1)
  })

  it('should render items when passed in', () => {
    expect(wrapper.find(ImagesListItem)).toHaveLength(2)
  })

  it('should render items as infinite scroll', () => {
    const infiniteScrollWrapper = mount(
      <ImagesList pagination='infinite'>
        <ImagesListItem key={0} src='IMG001.jpg' />
        <ImagesListItem key={1} src='IMG002.jpg' />
      </ImagesList>
    )
    expect(infiniteScrollWrapper.find(ImagesList)).toHaveLength(1)
    expect(infiniteScrollWrapper.find(ImagesListItem)).toHaveLength(2)
  })

  it('should limit number of items rendered as infinite scroll', () => {
    const infiniteScrollWrapper = mount(
      <ImagesList imagesItemPerPage={2} infiniteLoading={<span key={1}>asds</span>} pagination='infinite'>
        <ImagesListItem key={0} src='IMG001.jpg' />
        <ImagesListItem key={1} src='IMG002.jpg' />
        <ImagesListItem key={2} src='IMG002.jpg' />
      </ImagesList>
    )
    expect(infiniteScrollWrapper.find(ImagesListItem)).toHaveLength(2)
  })

  it('should render a custom loading when uses infinite scroll', () => {
    const infiniteScrollWrapper = mount(
      <ImagesList imagesItemPerPage={2} infiniteLoading={<span>Loading</span>} pagination='infinite'>
        <ImagesListItem key={0} src='IMG001.jpg' />
        <ImagesListItem key={1} src='IMG002.jpg' />
        <ImagesListItem key={2} src='IMG002.jpg' />
      </ImagesList>
    )
    expect(infiniteScrollWrapper.containsMatchingElement(<span>Loading</span>)).toBeTruthy()
  })

  it('should render an extra item passed by props at position specified', () => {
    const wrapperMounted = mount(<ImagesList extraItem={<p>test</p>} extraItemPosition={1}>{fakeImagesListItems}</ImagesList>)
    expect(wrapperMounted.find(ImagesList).find('.c-image-list').childAt(1).is('p')).toBeTruthy()
  })

  it('should render an extra item passed by props at last position if its position is bigger than the items length', () => {
    const wrapperMounted = mount(<ImagesList extraItem={<p>test</p>} extraItemPosition={5}>{fakeImagesListItems}</ImagesList>)
    expect(wrapperMounted.find(ImagesList).find('.c-image-list').childAt(2).is('p')).toBeTruthy()
  })
})
