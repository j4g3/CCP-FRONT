import React, { useState, useEffect } from 'react';

import axios from 'axios'
import api from '../../../services/api'

function Addpost({ author, id }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
  }, [])

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(description, author)
    const newpost = await api.post('/newpost', {
      id,
      author,
      title,
      description
    })
    console.log(newpost)

  }

  return (
    <form className="formAddFast" onSubmit={handleSubmit} ><br />
      <input type="text" className="StrongInput" value={title} required onChange={e => setTitle(e.target.value)} placeholder="Title" /><br />

      <textarea required onChange={e => setDescription(e.target.value)} /><br />
      <button className="ButtonAddAdmin" type="submit">Add Post</button>
    </form>
  )
}

export default Addpost;