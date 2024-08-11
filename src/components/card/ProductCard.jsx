import React from 'react'
import { useNavigate } from 'react-router-dom'

function ProductCard({key, title, price, image, item_id}) {
    const navigate = useNavigate();

    return (
    <div key={key} className="rounded-md shadow-md w-[150px] md:w-[280px] justify-between">
          <img
            onClick={() => navigate(`/productInfo/${item_id}`)}
            src={image}
            alt={title}
            className="w-full rounded-t-md object-cover cursor-pointer h-[180px] md:h-[280px]"
          />
          <div className="p-2 h-auto">
          <div>
                <h1 className=" items-center text-[12px] md:text-md">{title}</h1>
                <h1 className=" items-center font-semibold text-sm md:text-lg">Rs {price}</h1>
            </div>
            {/* <button
              type="button"
              className="mt-2 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add to Cart
            </button> */}
          </div>
        </div>
  )
}

export default ProductCard