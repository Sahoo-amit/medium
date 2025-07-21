import React from 'react'

const footer = ['Help','Status','About','Careers','Press','Blog','Privacy','Rules','Terms','Text to speech']

const Footer = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full border-t-2 border-black'>
      <div className="flex items-center text-center max-w-xl justify-between mx-auto text-gray-600 text-sm py-8">
        {footer.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default Footer