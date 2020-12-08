import React, { useEffect, useState } from 'react'
import axios from 'axios'

const EditComment = (props) => {
  const [comment, updateComment] = useState({})

  const siteId = props.match.params.siteId
  const commentId = props.match.params.commentId
  console.log(`comment.id :${comment.id}
                commentId is :${commentId}`)

  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`/api/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        const data = resp.data
        // console.log(data)
        updateComment(data)
      })
  }, [comment])

  function handleUpdateComment() {
    axios.put(`/api/comments/${comment.id}`, comment, {
      headers: { Authorization: `Bearer ${token}` }

    })
      .then(resp => {
        // console.log(resp.data)
        props.history.push(`/sites/${siteId}`)
      })

  }

  function handleChange(event) {

    const data = {
      ...comment,

      [event.target.name]: event.target.value
    }
    // console.log(event.target.value)
    // console.log(data)
    updateComment(data)

  }


  return <article className="media">
    <div className="media-content">
      <div className="field">
        <p className="control">
          <textarea
            className="textarea"
            onChange={handleChange}
            value={comment.text}
            name='text'>
            {comment.text}
          </textarea>
        </p>
      </div>
      <div className="field">
        <p className="control">
          <button
            onClick={handleUpdateComment}
            className="button is-info">
            Save
          </button>
        </p>
      </div>
    </div>
  </article>
}

export default EditComment