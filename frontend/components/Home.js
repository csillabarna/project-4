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

      <div className="honeycomb" lang="es">
        {sites.map((site, index) => {
          return <div className="honeycomb-cell" key={index}>
            <img className="honeycomb-cell__image" src={`http://data.opendatasoft.com/explore/dataset/world-heritage-list@public-us/files/${site.thumbnail_id}/300`} />
            {/* <div className="honeycomb-cell__title">Diseño exclusivo</div> */}
          </div>
        })}
      </div>

    </div>
  </>
}


export default Home