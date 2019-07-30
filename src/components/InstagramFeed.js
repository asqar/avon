import React, { Component } from 'react'
import Image from '../components/Image'

import './InstagramFeed.css'

export default class InstagramFeed extends Component {
  static defaultProps = {
    datasetId: 'N7uzMTiEA3P4899Ku',
    count: 7
  }

  state = {
    mounted: false,
    posts: [],
    datasetId: ''
  }

  clearStorage() {
    const lastclear = localStorage.getItem('lastclear'),
      time_now = new Date().getTime()

    // .getTime() returns milliseconds so 1000 * 60 * 60 * 24 = 1 days
    if (time_now - lastclear > 1000 * 60 * 60 * 1) {
      localStorage.clear()
      localStorage.setItem('lastclear', time_now)
    }
  }

  componentDidMount() {
    this.clearStorage()
    const datasetId = this.props.datasetId ? this.props.datasetId : ''

    if (!this.state.mounted && datasetId) {
      this.fetchInstagram(datasetId)
      this.setState({
        mounted: true,
        datasetId
      })
    }
  }

  fetchInstagram = (datasetId) => {
    let instaFeed = localStorage.getItem('instaFeed')
      ? localStorage.getItem('instaFeed')
      : []

    if (!Array.isArray(instaFeed) || !instaFeed.length) {
      typeof window !== 'undefined' &&
        fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?format=json&clean=1`)
          .then(res => res.json())
          .then(data => {
            instaFeed = data
            localStorage.setItem('instaFeed', JSON.stringify(instaFeed))
            this.setState({
              posts: instaFeed
            })
          })
          .catch(err => console.error(err))
    }
    this.setState({
      posts: JSON.parse(instaFeed)
    })
  }

  renderLoadingItems = () => (
    <div className="InstagramFeed">
      {[...Array(this.props.count)].map((x, index) => (
        <div
          className="InstagramFeed--EmptyPost"
          data-display="Loading"
          key={`EmptyPost-${index}`}
        />
      ))}
    </div>
  )

  render() {
    if (!this.state.posts.length) {
      return this.renderLoadingItems()
    }
    return (
      <div className="InstagramFeed">
        {this.state.posts.slice(0, this.props.count).map(post => (
          <Post
            key={post.url}
            url={post.url}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
    )
  }
}

const Post = ({ url, imageUrl }) => (
  <a
    className="InstagramFeed--EmptyPost InstagramFeed--EmptyPost-loaded"
    href={imageUrl}
    rel="noopener noreferrer"
    target="_blank"
    aria-label="Instagram Post Link"
  >
    <Image background src={imageUrl} lazy alt="instagram image" />
  </a>
)
