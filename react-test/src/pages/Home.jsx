import React from 'react'
import { Link } from 'react-router-dom'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Home = () => {
  return (
    <>
    <div className='container'>
      <h1>Board App</h1>
      <h2>* 게시판 앱</h2>
    <DeleteForeverIcon/>
      <Link to="/boards" className='btn'>게시판</Link>
      <Link to="/todos" className='btn'>오늘할일~</Link>
      </div>
    </>
  )
}

export default Home