import React, { useContext, useState, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import { Star } from 'lucide-react';
import MyContext from '../../context/MyContext';
import { useNavigate, useParams } from 'react-router-dom';
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from '../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/CartSlice';
import toast from 'react-hot-toast';

function ProductInfo() {
  const { loading, setLoading } = useContext(MyContext);
  const [product, setProduct] = useState('');
  // console.log(product);
  const [selectedSize, setSelectedSize] = useState(''); // New state for selected size
  const { id } = useParams();

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct({ ...productTemp.data(), id: productTemp.id });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addCart = (item) => {
    if (item.size && !selectedSize) {
      toast.error("Please select a size before adding to cart");
      return;
    }

    const itemToAdd = {
      ...item,
      selectedSize: selectedSize || '', // Add the selected size to the item being added to the cart
    };

    dispatch(addToCart(itemToAdd));
    toast.success("Added to cart");
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Layout>
      <section className='flex flex-wrap mt-10 justify-center gap-20'>
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* image */}
            <div className='h-[550px] w-[450px]'>
              <img src={product?.productImgUrl} alt='product_image' className='bg-cover bg-center h-full w-full' />
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

              {/* size */}
              {product.size && product.size.length > 0 && (
                <div className="mb-5 mt-6 pb-5">
                  <span className="mr-3 text-sm font-semibold">Size Chart</span>
                  <div className="flex items-center gap-2 pt-2">
                    {product.size.map((obj, index) => (
                      <button
                        key={index}
                        className={`h-8 w-16 rounded-full border border-gray-300 focus:outline-none text-black ${selectedSize === obj ? 'bg-gray-300' : ''}`}
                        onClick={() => setSelectedSize(obj)}
                      >
                        {obj}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* button */}
              <div className="flex items-center justify-center gap-10 border-b-2 border-gray-100 pb-5">
                {cartItems.some((p) => p.id === product.id) ? (
                  <button
                    onClick={() => navigate('/cart')}
                    type="button"
                    className="w-[50%] rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Go to Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addCart(product)}
                    type="button"
                    className="w-[50%] rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Add to Cart
                  </button>
                )}

                <button
                  type="button"
                  className="w-[50%] rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}

export default ProductInfo;
