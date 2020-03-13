import React, { useState } from 'react';
import api from '../../../services/api'
function Addpost({ matchs, history }) {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')


  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/newadmin', {
      id: matchs,
      username,
      name,
      password,
    })
    console.log(response)
    setUsername('')
    setName('')
    setPassword('')
  }


  return (
    <form className="formAddFast" onSubmit={handleSubmit}>
      <input type="text" value={username} name="username" id="username" placeholder="Username" required onChange={e => setUsername(e.target.value)} /><br />
      <input type="text" value={name} name="name" id="name" placeholder="Name" required onChange={e => setName(e.target.value)} /><br />
      <input type="password" value={password} name="password" id="password" required placeholder="Password" onChange={e => setPassword(e.target.value)} /><br />

      <button className="ButtonAddAdmin" type="submit">Add Admin</button>
    </form>
  )
}

export default Addpost;