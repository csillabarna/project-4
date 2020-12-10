import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
import Map from './Map'
import ImageGallery from 'react-image-gallery'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas, faHeart, faEdit } from '@fortawesome/free-solid-svg-icons'

import { far } from '@fortawesome/free-regular-svg-icons'


// # SCSS
import '../../node_modules/react-image-gallery/styles/scss/image-gallery.scss'
// import '~react-image-gallery/styles/scss/image-gallery.scss'

// # CSS
import '../../node_modules/react-image-gallery/styles/css/image-gallery.css'

// import '~react-image-gallery/styles/css/image-gallery.css'

const SingleSite = (props) => {
  const [site, updateSite] = useState({})
  const [content, updateContent] = useState('')
  const [fav, setFav] = useState(false)


  const siteId = props.match.params.siteId
  const token = localStorage.getItem('token')


  useEffect(() => {
    axios.get(`/api/sites/${siteId}`)
      .then(res => {
        const data = res.data
        console.log(`data from useEffect site/site id${data}`)
        updateSite(data)
      })
      .then(
        axios.get(`/api/favourites/${siteId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => {
            const data = res.data
            console.log(`data from useEffect fav/site id get  is fav ${data}`)
            setFav(data.isFavourite)
          })
      )
  }, [])



  //------------- comments -----------
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
      })

  }

  //------------- wish list -----------

  function addWish() {
    axios.post('/api/favourites', { 'site_id': siteId }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(
        setFav(true)
      )

  }
  const images = []
  function handleImages(img) {
    img.map((photo, index) => {
      // console.log(photo.photo_reference)
      const sitesImages = {
        original: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo.photo_reference}&sensor=false&maxwidth=700&key=${process.env.Google_API}`,
        thumbnail: `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photo.photo_reference}&sensor=false&maxwidth=400&key=${process.env.Google_API}`
      }

      // console.log(sitesImages)
      images.push(sitesImages)
      // console.log(images)
      return images

    })
    // console.log(images)
    return images
  }
  function deleteFromWish() {
    axios.delete(`/api/favourites/${site.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(
        setFav(false)
      )
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
  return <div className='container'>
    <div className="section">
      <div className="container">
        <div className="columns">

          {/* image gallery */}
          <div className="column is-three-fifths">
            {site.image && <ImageGallery lazyLoad={true} fullscreen={false} items={handleImages(site.image)
            } />}
          </div>
          {/* side column with info and map */}
          <div className="column is-two-fifths">
            <nav className="columns ">
              <div className="column is-10">
                <h1 className="title is-link">{site.name}</h1>
                {/* <h2 className="subtitle">{site.region} region</h2> */}

                <h2 className="subtitle">{site.country}</h2>
                <h2 className="content"> Inscribed on UNESCO’s World Heritage List in {site.date_inscribed}</h2>
              </div>
              <div className="column is-1">
                {fav ? <button className="button level-item" onClick={deleteFromWish}>
                  <FontAwesomeIcon icon={faHeart} color='#ea97ad' />
                </button>
                  : <button className="button" onClick={addWish}><span>
                    <FontAwesomeIcon color="#4e8d7c" icon={faHeart} />
                  </span>
                  </button>
                }
              </div>
            </nav>

            <div className="columns is-centered m-1 is-mobile"><Map site={site} /></div>
            <br />
          </div>

        </div>
        {/* <div className="columns"></div> */}
      </div>

      <div className="columns">
        <div className="column is-12">
          <h2 className="subtitle">{site.description}</h2>

        </div>
      </div>
     
      <div>
        <br />

      
        {/*show comments */}

        {/* this will prevent breaking when loading checks is any comments */}
        {site.comments && site.comments.map(comment => {
          return <article
            key={comment.id} className="media">
            <figure className="media-right">

              <p className="image is-64x64">
                <img src={comment.user.user_avatar} />
              </p>
              {console.log(site, comment)}


            </figure>
            <div className="media-content">
              <div className="content pl-3">
                <p><strong className="is-capitalized dark-green" color='#045762'> {comment.user.username} </strong> <small className="media-right"> posted:  {comment.created_at} </small>
                  <br />
                  {comment.content} </p>


              </div>
              

              



            </div>
            {/* {isCreator(comment.user.id) && } */}
            {isCreator(comment.user.id) && <div className="media-right">
              <Link className="icon" to={`/comment/${comment.id}`}>
                <FontAwesomeIcon icon={faEdit} color='#045762' />
              </Link>
              <button
                className="delete"
                onClick={() => handleDeleteComment(comment.id)}>
                Delete
              </button>
            </div>}
            {console.log(`comment.id is : ${comment.id}`)}


          </article>
        })}


        {/*post comments */}
        {localStorage.getItem('token') && <article className="media">
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea
                  className="textarea"
                  placeholder="Share your comments on this site..."
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
                  className="button is-link">
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




