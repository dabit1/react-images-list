import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'
import ImagesListItem from './images-list-item'

export default class ImagesList extends Component {
  static propTypes = {
    imagesItemPerPage: PropTypes.number,
    pagination:  PropTypes.oneOf(['simple', 'infinite']),
    /*children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.oneOf([ImagesListItem]) })),
      PropTypes.shape({ type: PropTypes.oneOf([ImagesListItem]) })
    ]),*/
    onFinishScroll: PropTypes.func,
    extraItem: PropTypes.element,
    extraItemPosition: PropTypes.number,
    infiniteLoading: PropTypes.element
  }

  static defaultProps = {
    imagesItemPerPage: 4,
    pagination: 'simple',
    onFinishScroll: () => {},
  }

  constructor (props) {
    super(props)

    this.state = {
      page: 1,
      imagesLoaded: 0
    }
  }

  addExtraItem(imageItems) {
    const { children, extraItem, extraItemPosition } = this.props

    const position = extraItemPosition === undefined || extraItemPosition > children.length
                     ? children.length : extraItemPosition
    if (imageItems.length >= position) {
      imageItems.splice(position, 0, React.cloneElement(extraItem, { key: 'extraItemKey_' }))
    }

    return imageItems
  }

  onImageLoad () {
    this.setState({imagesLoaded: this.state.onImageLoad + 1})
  }

  hasMore () {
    const hasMore = this.state.page * this.props.imagesItemPerPage < this.props.children.length

    if (!hasMore) {
      this.props.onFinishScroll()
    }

    return hasMore
  }

  areImagesLoaded() {
    return this.state.imagesLoaded === this.state.page * this.props.imagesItemPerPage
  }

  renderInfiniteItems () {
    const { children, imagesItemPerPage, extraItem, extraItemPosition } = this.props

    let imageItems = Children.toArray(children).slice(0, this.state.page * imagesItemPerPage).map((imageItem, key) => {
      return React.cloneElement(imageItem, {
        onImageLoad: () => {
          imageItem.props.onImageLoad && imageItem.props.onImageLoad()
          this.onImageLoad()
        }
      })
    })

    if (extraItem) {
      return this.addExtraItem(imageItems)
    }

    return imageItems
  }

  renderInfiniteScroll () {
    const { infiniteLoading } = this.props

    let loadingElement = null
    if (infiniteLoading) { // infinite loading have a bug that show warning if you don't set key to loading element
      loadingElement = React.cloneElement(infiniteLoading, { key: 0 })
    } else {
      loadingElement = <div key={0} className="loader">Loading ...</div>
    }

    return (
      <InfiniteScroll
        initialLoad={this.areImagesLoaded()}
        pageStart={this.state.page}
        loadMore={page => this.setState({page})}
        hasMore={this.hasMore()}
        loader={ loadingElement }
      >
        <div className='c-image-list no-select'>
          {
            this.renderInfiniteItems()
          }
        </div>
      </InfiniteScroll>
    )
  }

  renderSimple() {
    const { extraItem, children } = this.props

    return (
      <div className='c-image-list no-select'>
        { extraItem && this.addExtraItem(Children.toArray(children)) || children }
      </div>
    )
  }

  render () {
    const { pagination } = this.props

    if (pagination === 'infinite') {
      return this.renderInfiniteScroll()
    } else {
      return this.renderSimple()
    }
  }
}
