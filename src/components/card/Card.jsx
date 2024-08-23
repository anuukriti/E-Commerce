import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({key, title, image}) {
  const navigate = useNavigate();

  return(
    <div onClick={() => navigate(`/category/${title}`)} key={key} className="rounded-md shadow-md w-[150px] md:w-[230px] justify-between relative">
    <img
      src={image}
      alt={title}
      className="w-full rounded-t-md object-cover cursor-pointer h-full md:h-[320px]"
    />
    <div className="absolute inset-0 cursor-pointer  rounded-md bg-gradient-to-t from-gray-900 to-transparent hover:from-blue-950 transition-all ease-in-out"></div>
    <div className="p-2 absolute bottom-4 text-white">
      <div>
          <h1 className=" items-center text-[12px] md:text-md lg:text-[16px]">{title}</h1>
      </div>
      <button
        type="button"
        className="mt-2 text-sm font-semibold"
      >
        Shop Now...
      </button>
    </div>
  </div>
  )
}

export default Card