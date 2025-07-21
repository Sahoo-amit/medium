import React from 'react'
import Header from '../components/Dashboard/Header'
import Blog from '../components/Dashboard/Blog';

const Dashboard = () => {
  return (
    <>
      <div className='w-full'>
        <Header />
        <Blog />
      </div>
    </>
  );
}

export default Dashboard