import React, { useEffect, useState } from 'react';
import Helment from 'react-helmet';
import api from '../../services/api';
import './main.css';

function ReadNews({ match }) {
  const [post, setPost] = useState([])


  useEffect(() => {
    async function getPost() {
      const response = await api.get(`/post/${match.params.title}`)
      setPost(response.data)
    }

    getPost()
  }, [])
  return (
    <>
      <Helment title="Project Civil - Posts" />
      <header className="header">
        <span className="name">Project Civil</span>
      </header>
      <main className="mainRead">
        <h1 className="title">{post.title}</h1>
        <p className="description">{post.description}</p>
        <span className="author">Autor - {post.author}</span>
      </main>
    </>
  );
}

export default ReadNews;
