import React from 'react'
import { useNavigate } from 'react-router-dom'

function Card({key, title, image}) {
  const navigate = useNavigate();

  return(
    <div key={key} className="rounded-md shadow-md w-[150px] md:w-[220px] justify-between relative">
    <img
      onClick={() => navigate(`/category/${title}`)}
      src={image}
      alt={title}
      className="w-full rounded-t-md object-cover cursor-pointer h-full md:h-[320px]"
    />
    <div onClick={() => navigate(`/category/${title}`)} className="absolute inset-0 cursor-pointer  rounded-md bg-gradient-to-t from-gray-900 to-transparent hover:from-blue-950 transition-all ease-in-out"></div>
    <div className="p-2 absolute bottom-4 text-white">
      <div>
          <h1 className=" items-center text-[12px] md:text-md">{title}</h1>
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