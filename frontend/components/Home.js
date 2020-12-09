import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  return <div id="home">
    <h1>THIS IS OUR BEAUTIFUL HOME PAGE 😀 🌇 </h1>
    <ul className="honeycomb" lang="es">
      <li className="honeycomb-cell">
        <img className="honeycomb-cell__image" src="https://source.unsplash.com/random/1" />
        <div className="honeycomb-cell__title">Diseño exclusivo</div>
      </li>
      <li className="honeycomb-cell">
        <img className="honeycomb-cell__image" src="https://source.unsplash.com/random/2" />
        <div className="honeycomb-cell__title">Impermeables</div>
      </li>
      <li className="honeycomb-cell">
        <img className="honeycomb-cell__image" src="https://source.unsplash.com/random/3" />
        <div className="honeycomb-cell__title">Tablero doble cara</div>
      </li>
      <li className="honeycomb-cell">
        <img className="honeycomb-cell__image" src="https://source.unsplash.com/random/4" />
        <div className="honeycomb-cell__title">Maletín de empaque</div>
      </li>
      <li className="honeycomb-cell">
        <img className="honeycomb-cell__image" src="https://source.unsplash.com/random/5" />
        <div className="honeycomb-cell__title">Antireflectivo<small>No vidrio</small></div>
      </li>
      <li className="honeycomb-cell">
        <img className="honeycomb-cell__image" src="https://source.unsplash.com/random/6" />
        <div className="honeycomb-cell__title">6 fichas<small>1 de repuesto</small></div>
      </li>
      <li className="honeycomb-cell">
        <img className="honeycomb-cell__image" src="https://source.unsplash.com/random/7" />
        <div className="honeycomb-cell__title">Tablero magnético</div>
      </li>
      <li className="honeycomb-cell honeycomb__placeholder"></li>
    </ul>
  </div>
}


export default Home