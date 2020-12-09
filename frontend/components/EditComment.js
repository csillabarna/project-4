import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const EditComment = (props) => {
  const [comment, updateComment] = useState({})
  // go back to previous page without a siteId
  const history = useHistory()
  const commentId = props.match.params.id
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`/api/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        const data = resp.data
        console.log(data)
        updateComment(data)
      })
  }, [])

  function handleUpdateComment() {

    axios.put(`/api/comments/${comment.id}`, comment, {
      headers: { Authorization: `Bearer ${token}` }

    })
      .then(resp => {
        (history.goBack())
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
            value={comment.content}
            name='content'>
            {comment.content}
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