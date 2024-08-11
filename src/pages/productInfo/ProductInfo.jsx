import React, { useContext, useState, useEffect } from 'react'
import Layout from '../../components/layout/Layout'
import { Star, ChevronDown } from 'lucide-react'
import MyContext from '../../context/MyContext'
import { useParams } from 'react-router-dom';
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from '../../components/loader/Loader';

function ProductInfo() {
  const {loading, setLoading} = useContext(MyContext);

  const [product, setProduct] = useState('');

  const { id } = useParams()
  // console.log("id use params", id);

  // getProductData
  const getProductData = async () => {
    setLoading(true)
    try {
        const productTemp = await getDoc(doc(fireDB, "products", id))
        setProduct(productTemp.data());
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

console.log(product);

useEffect(() => {
    getProductData()
}, [])

  return (
    <Layout>
        <section className='flex flex-wrap mt-10 justify-center gap-20'>
        {loading ? <> <Loader /> </> :
          <>
            {/* image */}
            <div className='h-[550px] w-auto'>
                <img src={product?.productImgUrl} alt='product_image' className='bg-contain h-full' />
            </div>
            {/* desc */}
            <div className='w-[800px]'>
              <h2 className="text-sm font-semibold tracking-widest text-gray-500">{product?.title}</h2>
              <h1 className="my-4 text-3xl font-semibold text-black">{product?.description}</h1>
              <div className="my-4 flex items-center border-b-2 border-gray-100 pb-5">
                <span className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-500" />
                  ))}
                  <span className="ml-3 inline-block text-xs font-semibold">1.2k Reviews</span>
                </span>
              </div>

              <p className="leading-relaxed text-xl font-bold text-gray-900">₹{product?.price}</p>
              
              {/* color */}
              <div className="mb-5 mt-6 flex items-center">
                <div className="flex items-center">
                  <span className="mr-3 text-sm font-semibold">Color</span>
                  <button className="h-6 w-6 rounded-full border-2 border-gray-300 focus:outline-none"></button>
                  <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-700 focus:outline-none"></button>
                  <button className="ml-1 h-6 w-6 rounded-full border-2 border-gray-300 bg-green-200 focus:outline-none"></button>
                </div>
              </div>

              {/* size */}
              <div className="mb-5 mt-6 pb-5">
                <span className="mr-3 text-sm font-semibold">Size Chart</span>
                <div className="flex items-center gap-2 pt-2">
                  <button className="h-8 w-16 rounded-full border border-gray-300 focus:outline-none">S</button>
                  <button className="h-8 w-16 rounded-full border border-gray-300 focus:outline-none">M</button>
                  <button className="h-8 w-16 rounded-full border border-gray-300 focus:outline-none">L</button>
                  <button className="h-8 w-16 rounded-full border border-gray-300 focus:outline-none">XL</button>
                  <button className="h-8 w-16 rounded-full border border-gray-300 focus:outline-none">XXL</button>
                  <button className="h-8 w-16 rounded-full border border-gray-300 focus:outline-none">XXXL</button>
                </div>
              </div>

              {/* button */}
              <div className="flex items-center justify-center gap-10 border-b-2 border-gray-100 pb-5">
                <button
                  type="button"
                  className="w-[50%] rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="w-[50%] rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add to Wishlist
                </button>
              </div>   
            </div>
          </>
        }    
        </section>
    </Layout>
  )
}

export default ProductInfo