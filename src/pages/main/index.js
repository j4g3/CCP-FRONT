import React, { useEffect, useState } from 'react';
import Helment from 'react-helmet';
import Readmore from './readMore';
import api from '../../services/api';
import './main.css';

function Main({ history }) {
  const [posts, setPosts] = useState([])


  useEffect(() => {
    async function getPosts() {
      const response = await api.get('/posts')
      setPosts(response.data)
    }

    getPosts()
  }, [])

  function goPost(title) {
    title = title.replace(/ /g, '_')
    console.log(title)
    history.push(`/read/${title}`)
  }

  return (
    <>
      <Helment title="Project Civil - Posts" />
      <header className="header">
        <span className="name">Project Civil</span>
      </header>
      <main className="main">
        <span className="TitledPost">New Posts</span>
        <div className="post">
          {posts.reverse().map(post => (
            <div className="posts" key={post._id} onClick={() => goPost(post.title)}>
              <header className="titlePost">
                <h3>{post.title}</h3>
              </header>
              <main className="main">
                <Readmore
                  textaa={post.description}
                />
              </main>
              <footer className="footer">
                Author: {post.author}.
              </footer>
            </div>
          ))}
        </div>


      </main>
    </>
  );
}

export default Main;
