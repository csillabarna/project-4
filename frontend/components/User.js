import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { isCreator } from '../lib/auth'
const token = localStorage.getItem('token')


// import Rater from 'react-rater'

const User = (props) => {

  console.log(props)
  const userId = props.match.params.userId
  const [user, updateUser] = useState([])

  const token = localStorage.getItem('token')



  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then(res => {
        console.log(res.data)
        updateUser(res.data)
      })
  }, [])

  
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

  return <div className="container is-fluid mt-5">
    <div className="columns">
      <div className="column">
        <figure className="image is-128x128 is-justify-content-center">
          <img className="" src={user.user_avatar} />
        </figure>
        <div className="container is-fluid has-text-centered mt-5">
          <h1 className="title is-1 is-capitalized">{user.username}</h1>
          <h2 className="subtitle is-3">{user.user_city}</h2>
          <h2 className="subtitle is-3">A bit about yourself:</h2>
          <p>{user.user_bio}</p>
          {token && <Link className="button is-primary" to={`/user/${user.id}/edit`}>
          Edit Profile
          </Link>}
        </div>
      </div>
      <div className="column is-one-third">
        <div className="tile is-ancestor">
          <div className="tile is-vertical is-parent">

            <h1>my favourite places</h1>

            {user.favourites && user.favourites.map((favourite, index) => {
              
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