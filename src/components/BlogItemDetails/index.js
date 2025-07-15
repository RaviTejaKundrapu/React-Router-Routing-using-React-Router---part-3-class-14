import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogItemDetails extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getSpecificBlogData()
  }

  getSpecificBlogData = async () => {
    const {match} = this.props
    // we will get this from blogitem component props due to those are matched with path at Link and route in app.js
    // is attached this blogitemdetails component there so those are passed here o all props just some in that we will take id and get blodDataOfItem
    const {params} = match // match is a prop default at js
    const {id} = params
    const blogDataFetch = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const dataOfSpecificBlogItem = await blogDataFetch.json()
    const freshObjOfBlogItem = {
      author: dataOfSpecificBlogItem.author,
      avatarUrl: dataOfSpecificBlogItem.avatar_url,
      content: dataOfSpecificBlogItem.content,
      id: dataOfSpecificBlogItem.id,
      imageUrl: dataOfSpecificBlogItem.image_url,
      title: dataOfSpecificBlogItem.title,
      topic: dataOfSpecificBlogItem.topic,
    }
    this.setState({blogData: freshObjOfBlogItem, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state
    const {title, imageUrl, content, avatarUrl, author} = blogData
    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{content}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="blog-container">
        {isLoading ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}

export default BlogItemDetails
