import React from 'react'
import InstagramFeed from './InstagramFeed'
import './Footer.css'

export default () => (
  <div>
    <br />
    <h2 className="taCenter">
    Связаться со мной в Instagram:{' '}
      <a href="https://instagram.com/zbakirova/">@zbakirova</a>
    </h2>
    <footer className="footer">
      <div className="container taCenter">
        <span>
          © Копирайт {new Date().getFullYear()} Все права сохранены.
        </span>
      </div>
    </footer>
  </div>
)
