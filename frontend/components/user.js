import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import Rater from 'react-rater'

const User = (props) => {

  console.log(props)
  const userId = props.match.params.userId
  const [user, updateUser] = useState([])
  const [comments, updateComments] = useState([])


  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(resp => {
        console.log(resp.data)
        updateUser(resp.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/users/${userId}/comments`)
      .then(resp => {
        updateComments(resp.data)
      })
  }, [])

  console.log(comments)

  if (!user.username) {
    return <div className="section">
      <div className="container">
        <div className="title">
          Loading ...
        </div>
        <progress className="progress is-small is-link" max="100">60%</progress>
      </div>
    </div>
  }

  console.log(user.user_avatar)
  return <div className="container is-fluid mt-5">
    <div className="columns">
      {/* <div className="column">
      </div> */}
      <div className="column">
        <figure className="image is-128x128 is-justify-content-center			">
          <img className="" src={user.user_avatar} />
        </figure>
        <div className="container is-fluid has-text-centered mt-5">
          <h1 className="title is-1 is-capitalized">{user.username}</h1>
          <h2 className="subtitle is-3">Location: {user.user_city}</h2>
          <h2 className="subtitle is-3">A bit about yourself:</h2>
          <p>{user.user_bio}</p>
        </div>
      </div>
      <div className="column is-one-third">
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-parent">


            {user.favourites.map((favourite, index) => {
              return <div className="tile is-child box" key={index}>
                <Link to={`/sites/${favourite.site_id}`} >

                  <div className="media">
                    <div className="media-left">
                      <figure className="image is-64x64">
                        <img src={`https://data.opendatasoft.com/explore/dataset/world-heritage-list@public-us/files/${favourite.site.thumbnail_id}/300/`} alt={favourite.site.name} />
                      </figure>
                    </div>
                    <div className="media-content">
                      <h2 className="title is-6">
                        {favourite.site.name}
                      </h2>
                      <p className="subtitle is-8">
                        {favourite.site.country}
                      </p>
                    </div>
                  </div>

                </Link>
              </ div>

            })}
          </div>
        </div>

      </div>


    </div>
  </div>

}
export default User