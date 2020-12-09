import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
import Map from './Map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'



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
        axios.get(`/api/favourites/${siteId}`,  {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res =>{
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
    axios.post('/api/favourites', { 'site_id': siteId  }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(
        setFav(true)
      )
    
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
  return <div>
    <div className="section">
      <div className="container">
        <img src={site.image} alt={site.name} />
        <h1 className="title">{site.name}</h1>
        <h2 className="subtitle">{site.country}</h2>
        <h2 className="subtitle">{site.description}</h2>
        <h2 className="subtitle">{site.region} region</h2>

        <h2 className="subtitle"> This site inscribed on UNESCO’s World Heritage List in : {site.date_inscribed}</h2>
        {/* <h2 className="subtitle">get more info {site.weblink} </h2> */}

        <div>
          <br />

          <div className="columns is-centered m-1 is-mobile"><Map site={site} /></div>
          <br />
        </div>
        {fav ?  <button className="button" onClick={deleteFromWish}>delete from Wishlist </button>
          : <button className="button" onClick={addWish}><span><FontAwesomeIcon color="green" icon={faHeart} /></span>
          </button>
        }
        {/* <button className="heart" onClick={add}> */}
        {/*  */}
        {/* </button> */}

        {/*show comments */}

        {/* this will prevent breaking when loading checks is any comments */}
        {site.comments && site.comments.map(comment => {
          return <article
            key={comment.id} className="media">
            <figure className="media-right">
              <p className="image is-64x64">
                <img src={comment.user.user_avatar} />
              </p>
            </figure>
            <div className="media-content">
              <div className="content">
                <p className="subtitle">
                  <strong> {comment.user.username} </strong>
                  <small  className="media-right"> posted:  { comment.created_at} </small> 
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




