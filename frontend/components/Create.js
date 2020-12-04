
import React, { useState } from 'react'
import axios from 'axios'




const Create = (props) => {

  const [addFormData, updateAddFormData] = useState({
    name: '',
    region: '',
    latitude: Number,
    longitude: Number,
    country: '',
    province: '',
    description: '',
    image: '',
    date_inscribed: Number
  })

  const inputFields = ['name', 'region', 'latitude', 'longitude','country'
    ,'province', 'description', 'image', 'date_inscribed']

  function handleChange(event) {
    console.log('handleChange')
    // overwriting the field we've updated
    const data = {
      ...addFormData,
      
      [event.target.name]: event.target.value
    }
    console.log(data)
    updateAddFormData(data)
  }
  function handleSubmit(event) {
    console.log('handleSubmit')
    event.preventDefault()
    const token = localStorage.getItem('token')
    axios.post('/api/sites', addFormData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        console.log(props.history.push('/sites'))
        props.history.push('/sites')
      })
    
  }

  return <>
    <form onSubmit={handleSubmit}>
      {inputFields.map((field, i) => {
        return <div key={i}>
          <label>{ field}</label> 
          <input
            type='text'
            name={field}
            value={addFormData[field]}
            onChange ={handleChange}
          />
        </div>
      })}
      
      <button>Submit</button>

    </form>

  </>


}

export default Create