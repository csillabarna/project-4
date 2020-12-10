import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [sites, updateSites] = useState([])
  useEffect(() => {
    axios.get('api/sites')
      .then(res => {
        // console.log(res.data)
        updateSites(res.data)
      })
  }, [])
  return <>
    <div id="home">



      <div className="columns is-desktop">
        <div className="column">
          <div className="honeycomb" lang="es">
            {sites.slice(1, 29).map((site, index) => {
              return <Link to={`/sites/${site.id}`} className="honeycomb-cell" key={index}>
                <img className="honeycomb-cell__image" src={`http://data.opendatasoft.com/explore/dataset/world-heritage-list@public-us/files/${site.thumbnail_id}/300`} />
                {/* <div className="honeycomb-cell__title">{site.name}</div> */}
              </Link>
            })}
          </div>
        </div>
        <div className="column is-block-widescreen-only is-hidden-desktop-only">
          <div className="honeycomb" lang="es">
            {sites.slice(30, 58).map((site, index) => {
              return <Link className="honeycomb-cell" key={index} to={`/sites/${site.id}`}>
                <img className="honeycomb-cell__image" src={`http://data.opendatasoft.com/explore/dataset/world-heritage-list@public-us/files/${site.thumbnail_id}/300`} />
                {/* <div className="honeycomb-cell__title">{site.name}</div> */}
              </Link>
            })}
          </div>
        </div>
        <div className="column is-block-tablet-only is-hidden-tablet-only">
          <div className="honeycomb" lang="es">
            {sites.slice(1, 29).map((site, index) => {
              return <Link to={`/sites/${site.id}`} className="honeycomb-cell" key={index}>
                <img className="honeycomb-cell__image" src={`http://data.opendatasoft.com/explore/dataset/world-heritage-list@public-us/files/${site.thumbnail_id}/300`} />
                {/* <div className="honeycomb-cell__title">{site.name}</div> */}
              </Link>
            })}
          </div>
        </div>
      </div>

    </div>
  </>
}


export default Home