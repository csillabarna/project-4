import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import MapGL, { Marker } from 'react-map-gl'


const Sites = () => {
  const [search, updateSearch] = useState('')
  const [searched, updateSearched] = useState('')
  // const [fav, setFav] = useState(false)
  // function add(){
  //   return setFav(true) 
  // }

  const [sites, updateSites] = useState([])

  useEffect(() => {
    if (search){
      axios.get(`api/search/${search}`)
        .then(res => {
          updateSites(res.data)
        })
    } else {
      axios.get('api/sites')
        .then(res => {
          // console.log(res.data)
          updateSites(res.data)
        })
    }

  }, [searched])

  useEffect(() => {
   
    axios.get('api/favourites')
      .then(res => {
        updateSites(res.data)
      })
        
  }, [])

  return <>
  <div className="columns">
    <div className="field has-addons column">
      <div className="control">
        <input className="input is-family-code search"
          placeholder="Search"
          onChange={(event) => updateSearch(event.target.value)}
          value={search} />
      </div>
      <div className="control">
        <button className="button is-family-code is-dark"
          onClick={() => {
            updateSearched(search)
          }}>
          Search
        </button>
      </div>
    </div>
  </div>
  
  <div className="columns is-multiline is-mobile">
    {sites.map((site, index) => {
      return <div
        className="column is-one-third-desktop is-half-tablet is-half-mobile"
        key={index}
      >
        <Link to={`/sites/${site.id}`}>
          <div className="card">
            <div className="card-content">
              <div className="card-image">
                <figure className="image is-3by3">
                  <img src={site.image} alt={site.name} />
                </figure>
              </div>
              <div className="media">
                <div className="media-content">
                  <h2 className="title is-4">
                    {site.name}
                  </h2>
                  <p className="subtitle is-4">
                    {site.country}
                  </p>
                  
                </div>
              </div>
            </div>
          </div>
        </Link>
        {/* <button className="heart" onClick={add}> */}
        {/* <span><FontAwesomeIcon color="green" icon={faHeart} /></span> */}
        {/* </button> */}
      </div>
    })}
  </div>

  </>

}

export default Sites