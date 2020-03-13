import React, { useState } from 'react';
import Helment from 'react-helmet';
import './main.css'
import crypto from 'crypto';
import authPASS from '../auth/password.json';
import api from '../../services/api';



function Login({ history }) {
  const algorithm = 'aes-256-ctr';
  async function encrypt(text) {
    var cipher = await crypto.createCipher(algorithm, authPASS.secret)
    var crypted = await cipher.update(text, 'utf8', 'hex')
    crypted += await cipher.final('hex');
    return crypted;
  }
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function AuthUser(event) {
    event.preventDefault()

    const response = await api.post('/auth', {
      username,
      password
    })
    const { _id } = response.data
    const AuthUser = await api.post('/find', {
      _id: _id,
      username,
      password
    })
    if (AuthUser.data === 'Erro') {
      history.push('/login')
    } else {
      const id = await encrypt(_id)
      history.push(`/dashboard/${id}`)
    }
  }

  return (
    <>
      <Helment title="Login" />
      <div className="backLOGIN">

        <form onSubmit={AuthUser} className="box">
          <label>Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="input"
            value={username}
            maxLength="21"
            onChange={e => setUsername(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            id="password"
            maxLength="21"
            className="input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="ButtonLogin" type="submit">LOGIN</button>
        </form>
      </div>

    </>
  )
}
export default Login;