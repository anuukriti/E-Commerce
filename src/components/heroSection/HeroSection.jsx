import React from 'react'
import { Carousel } from 'nuka-carousel';

function HeroSection() {
  return (
    // <div>
    //     <img src='https://mir-s3-cdn-cf.behance.net/project_modules/fs/4dc58370704977.5bac0fd214367.jpg' alt='heroimg' className='w-full h-40 md:h-auto'/>
    // </div>
    <Carousel autoplay={true} autoplayInterval={3000} wrapMode="wrap" className='w-full h-auto object-cover'>
  <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/4dc58370704977.5bac0fd214367.jpg " alt='hero_image' className='w-full h-40 md:h-auto object-cover' />
  <img src="https://img.freepik.com/free-photo/portrait-young-asian-woman-isolated-blue-studio-space_155003-12397.jpg?t=st=1724407620~exp=1724411220~hmac=831c324493b199908162489967aac73bb5f18576fda2ea506cf9b457487cf232&w=1380 " alt='hero_image' className='w-full h-40 md:h-auto object-cover' />
  <img src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/4dc58370704977.5bac0fd214367.jpg " alt='hero_image' className='w-full h-40 md:h-auto object-cover' />
  </Carousel>
  )
}

export default HeroSection