import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Verification = (props) => {
  const id = props.match.params.id
  const [res, setRes] = useState({})
  const [error, updateError] = useState(false)
  console.log(props)

  useEffect(() => {
    axios.put(`/api/verification/${id}`)
      .then(res => {
        console.log(res)
        setRes(res)
      }
      ).catch(error => {
        console.log(error)
        updateError(true)
      })
  }, [])

  if (!res) {
    return <>
    <div className="flex-loader">
      Loading...
    </div>
    </>
  }

  return <div className='container has-text-centered mt-5 mb-5'>
    <h1 className='title has-text-black'>Verification</h1>
    {!error 
      ?
      <div>
        <h3 className='subtitle is-2 has-text-black'>Yor email address has been confirmed!✅</h3>
        <h3 className='subtitle is-2 has-text-black'>Thank you</h3>
        <br></br>
        <Link className='button is-large is-black is-outlined' to={'/login'}>Please login</Link>
      </div>
      :
      <h2 className='subtitle is-2 has-text-black'>Verification Failed!</h2>}
  </div>
}

export default Verification