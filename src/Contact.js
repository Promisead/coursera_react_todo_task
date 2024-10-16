import React from 'react'

const Contact = ({imgUrl,name,phone,email}) => {
  return (
    <div>
      <img src={imgUrl}/>
      <h2>Name: {name}</h2>
      <p>Phone: {phone}</p>
      <p>Email: {email}</p>
    </div>
  )
}

export default Contact
