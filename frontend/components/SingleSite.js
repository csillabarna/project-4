import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'


const SingleSite = (props) => {
  const [site, updateSite] = useState({})
  const [content, updateContent] = useState('')

  const siteId = props.match.params.siteId
  const token = localStorage.getItem('token')
 
  console.log('site ID is: ' + siteId, token)

  useEffect(() => {
    axios.get(`/api/sites/${siteId}`)
      .then(res => {
        const data = res.data
        console.log(data)
        updateSite(data)
      })
  }, [])



  // if (!site.id) {
  //   return <div className="section">
  //     <div className="container">
  //       <div className="title">
  //         Loading ...
  //       </div>
  //     </div>
  //   </div>
  // }


  function handleDelete() {
    axios.delete(`/api/sites/${siteId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        props.history.push('/sites')
      })
  }
  // comments section
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
        // props.history.push(`/sites/${siteId}`)
      })
    
  }


  return <div>
    <div className="section">
      <div className="container">
        <img src={site.image} alt={site.name} />
        <h1 className="title">{site.name}</h1>
        <h2 className="subtitle">{site.province}</h2>
        <h2 className="subtitle">{site.country}</h2>
        <h2 className="subtitle">{site.description}</h2>
        {token && isCreator(site.user ? site.user.id : '') && <button className="button is-dark" onClick={handleDelete}>
          Remove site
        </button>}
        {token && isCreator(site.user ? site.user.id : '') && <Link className="button is-primary" to={`/sites/edit-site/${site.id}`}>
          Edit site
        </Link>}
        <div>
          <br />
          <br />
        </div>

        {/*show comments */}

        {/* this will prevent breaking when loading checks is any comments */}
        {site.comments && site.comments.map(comment => {
          // console.log(comment)
          return <article key={comment.id} className="media">
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

            {isCreator(comment.user.id) && <Link className="button is-small" to={`/comments/${comment.id}`}>
              Edit 🖊️
            </Link>}

          </article>
        })}


        {/*post comments */}
        <article className="media">
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
        </article>
      </div>

    </div>


  </div>
}

export default SingleSite




