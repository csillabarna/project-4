import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MapGL, { Marker } from 'react-map-gl'


const Sites = () => {
  const [search, updateSearch] = useState('')
  const [searched, updateSearched] = useState('')


  const [sites, updateSites] = useState([])
  // console.log(process.env.Google_API)

  useEffect(() => {
    if (search) {
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


  return <>

    <div className="columns is-mobile is-centered section">
      <div className="field has-addons column is-half has-text-centered is-align-items-center">

        <div className="control bd-notification is-primary is-centered">
          <input className="input is-family-code search"
            placeholder="search for country"
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
      {sites.slice(1, 10).map((site, index) => {
        return <div
          className="column is-one-third-desktop is-half-tablet is-half-mobile"
          key={index}
        >
          <Link to={`/sites/${site.id}`}>
            <div className="card">
              <div className="card-content">
                <div className="card-image">
                  <figure className="image is-3by3">
                    <img src={`https://maps.googleapis.com/maps/api/place/photo?photoreference=${site.image[0].photo_reference}&sensor=false&maxwidth=500&key=${process.env.Google_API}`} alt={site.name} />
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

        </div>
      })}
    </div>

  </>

}

export default Sites