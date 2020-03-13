import React, { useEffect, useState } from 'react';
import crypto from 'crypto';
import authPASS from '../auth/password.json'
import Helment from 'react-helmet';
import api from '../../services/api';
import AddUser from './addadmin/index';
import AddPost from './addpost/index'
import { Person } from '@material-ui/icons'
import './main.css';
import { Link } from 'react-router-dom'

function Dashboard({ match, history }) {
  const algorithm = 'aes-256-ctr';
  const [login, setLogin] = useState([]);
  const [users, setUsers] = useState([]);

  function decrypt(text) {
    var decipher = crypto.createDecipher(algorithm, authPASS.secret)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
  }
  useEffect(() => {
    async function valid() {



      const id = await decrypt(match.params.userid)
      const AuthUser = await api.post('/find', {
        _id: id
      })

      if (AuthUser.data === 'Erro') {
        history.push('/')
      } else {
        setLogin(AuthUser.data.response)
      }
    }
    async function ListAdmins() {
      const response = await api.get('/admin')
      setUsers(response.data)
    }

    valid()
    ListAdmins()
  }, [match, history])
  return (
    <>
      <Helment title="DashBoard" />
      <header className="headerDashBoard">
        <h1>Civil Cultural</h1>
        <span className="usernameDash"><Person className="iconDash" style={{
          width: 32,
          height: 32
        }} />{login.name}</span>
      </header>
      <main className="mainDash">
        <div className="menuDash">
          <ul>

            <li className="Item-MenuDash"><Link className="linkDashBoard" to="#NewAdmin">New Admin</Link></li>
            <li className="Item-MenuDash"><Link className="linkDashBoard" to="#ViewAdmins">View Admin</Link></li>
            <li className="Item-MenuDash"><Link className="linkDashBoard" to="#NewPosts">New Post</Link></li>
            <li className="Item-MenuDash"><Link className="linkDashBoard" to="#ViewPosts">View Post</Link></li>

          </ul>
        </div>
        <div className="mainDashMenu">
          <span className="titleDashMenu">All Admins</span>
          <div className="ListMembers">
            <section className="Admins">
              {users.map(admin => (

                <div className="NameAdmin" key={admin.username}>
                  <span>{admin.username.toUpperCase()} - {admin.name}</span>
                </div>

              ))}
            </section>

          </div>

          <div className="addfast">
            <div className="gridFast">
              <span className="TitleFast">Add POST</span>
              <AddPost author={login.name} id={decrypt(match.params.userid)} />
            </div>
            <div className="gridFast">
              <span className="TitleFast">Add ADMIN</span>
              <AddUser matchs={decrypt(match.params.userid)} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
export default Dashboard;