import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ImagesListItem extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
    srcSmall: PropTypes.string,
    srcMedium: PropTypes.string,
    onPress: PropTypes.func,
    onPressImage: PropTypes.func,
    onImageLoad: PropTypes.func
  }

  render () {
    const { src, srcSmall, srcMedium, onPress, onPressImage, onImageLoad, children } = this.props

    return (
      <div onClick={onPress} className='c-image-list-item'>
        <a onClick={onPressImage} className='c-image-list-item__link'>
          <picture>
            { srcSmall && <source srcSet={srcSmall} media='(max-width: 420px)' /> }
            { srcMedium && <source srcSet={srcMedium} media='(max-width: 1024px)' /> }
            <img src={src} onLoad={onImageLoad} className='c-image-list-item__image' />
          </picture>
        </a>
        { children }
      </div>
    )
  }
}
