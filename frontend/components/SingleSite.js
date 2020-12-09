import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
import Map from './Map'
import ImageGallery from 'react-image-gallery'

// # SCSS
import '../../node_modules/react-image-gallery/styles/scss/image-gallery.scss'
// import '~react-image-gallery/styles/scss/image-gallery.scss'

// # CSS
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css'

// import '~react-image-gallery/styles/css/image-gallery.css'

const SingleSite = (props) => {
  const [site, updateSite] = useState({})
  const [content, updateContent] = useState('')
  // const [images, handleImages] = useState({})
  const siteId = props.match.params.siteId
  const token = localStorage.getItem('token')
  const commentId = props.match.params.commentId
  console.log(`commentID is : ${commentId}`)  

 
  console.log('site ID is: ' + siteId, token)

  useEffect(() => {
    axios.get(`/api/sites/${siteId}`)
      .then(res => {
        const data = res.data
        console.log(data)
        updateSite(data)
      })
  }, [])



  function handleComment() {
    axios.post(`/api/sites/${siteId}/comments`, { content }, {
      headers: { Authorization: `Bearer ${token}` }

    })
      .then(res => {
        updateContent('')
        updateSite(res.data)
      })

  }

  function handleDeleteComment(commentId) {
    axios.delete(`/api/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      
      .then(res => {
        updateSite(res.data)
        props.history.push(`/sites/${siteId}`)
      })
    
  }
  const images = [
    {
      original: 'https://picsum.photos/id/1018/1000/600/',
      thumbnail: 'https://picsum.photos/id/1018/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1015/1000/600/',
      thumbnail: 'https://picsum.photos/id/1015/250/150/'
    },
    {
      original: 'https://picsum.photos/id/1019/1000/600/',
      thumbnail: 'https://picsum.photos/id/1019/250/150/'
    }
  ]
  function handleImages(img) {
    img.map((photo, index) => {
      console.log(photo.photo_reference)
      const sitesImages = {
        original: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo.photo_reference}&sensor=false&maxwidth=700&key=${process.env.Google_API}`,
        thumbnail: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo.photo_reference}&sensor=false&maxwidth=400&key=${process.env.Google_API}`
      }

      console.log(sitesImages)
      images.push(sitesImages)
      console.log(images)
      return images

    })
    console.log(images)
    return images
  }

  if (!site.latitude) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
      </div>
    </div>
  }
  return <div>
    <div className="section">
      <div className="container">
        {site.image && <ImageGallery items={handleImages(site.image)
        } />}

        <img src={site.image} alt={site.name} />
        <h1 className="title">{site.name}</h1>
        <h2 className="subtitle">{site.province}</h2>
        <h2 className="subtitle">{site.country}</h2>
        <h2 className="subtitle">{site.description}</h2>
        <div>
          <br />

          <div className="columns is-centered m-1 is-mobile"><Map site={site} /></div>
          <br />
        </div>

        {/*show comments */}

        {/* this will prevent breaking when loading checks is any comments */}
        {site.comments && site.comments.map(comment => {
          // console.log(comment)
          return <article
            key={comment.id} className="media">
            <figure className="media-right">
              <p className="image is-64x64">
                <img src="https://bulma.io/images/placeholders/128x128.png" />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p className="subtitle">
                  <strong> {comment.user.username} </strong>
                  {/* <small  className="media-left"> { comment.createdAt} </small>  */}
                  <br />
                  {comment.content} </p>
              </div>

              {/* fontawsome icons ??? */}
              {/* <nav className="level is-mobile">
                <div className="level-left">
                  <a className="level-item">
                    <span className="icon is-small"><i className="fas fa-reply"></i></span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-small"><i className="fas fa-retweet"></i></span>
                  </a>
                  <a className="level-item">
                    <span className="icon is-small"><i className="fas fa-heart"></i></span>
                  </a>
                </div>
              </nav> */}


            </div>
            {isCreator(comment.user.id) && <div className="media-right">
              <button
                className="delete"
                onClick={() => handleDeleteComment(comment.id)}>
                  Delete
              </button>
            </div>}
            {console.log(`comment.id is : ${comment.id}`)}
            {isCreator(comment.user.id) && <Link className="button is-small" to={`/comment/${comment.id}`}>
              Edit 🖊️
            </Link>}

          </article>
        })}


        {/*post comments */}
        {localStorage.getItem('token') && <article className="media">
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea
                  className="textarea"
                  placeholder="Make a comment.."
                  onChange={event => updateContent(event.target.value)}
                  value={content}>
                  {content}
                </textarea>
              </p>
            </div>
            <div className="field">
              <p className="control">
                <button
                  onClick={handleComment}
                  className="button is-info">
                  Submit
                </button>
              </p>
            </div>
          </div>
        </article>}
      </div>

    </div>


  </div>
}

export default SingleSite




