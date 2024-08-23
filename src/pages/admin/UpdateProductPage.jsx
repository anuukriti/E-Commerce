import { useNavigate, useParams } from "react-router";
import MyContext from "../../context/MyContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const categoryList = [
  { name: 'fashion' },
  { name: 'kids' },
  { name: 'gadgets' },
  { name: 'footwear' },
  { name: 'kitchen' },
  { name: 'home' },
  { name: 'watch' },
  { name: 'cosmetics' },
  { name: 'jewellery' }
];

const genderList = ['Select Gender','All', 'Male', 'Female', 'Boy', 'Girl'];

const UpdateProductPage = () => {
  const context = useContext(MyContext);
  const { loading, setLoading, getAllProductfunc } = context;
  const navigate = useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    quantity: 1,
    productImgUrl: "",
    category: "",
    description: "",
    subCategory: "",
    gender: "",
    size: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      { month: "short", day: "2-digit", year: "numeric" }
    ),
  });

  const getSingleProductFunction = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      const product = productTemp.data();
      setProduct({
        title: product?.title,
        price: product?.price,
        productImgUrl: product?.productImgUrl,
        category: product?.category,
        subCategory: product?.subCategory,
        description: product?.description,
        quantity: product?.quantity,
        gender: product?.gender || "",
        size: product?.size || "",
        time: product?.time,
        date: product?.date
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, 'products', id), product);
      toast.success("Product Updated successfully");
      getAllProductfunc();
      setLoading(false);
      navigate('/admin-dashboard');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductFunction();
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center h-screen w-screen bg-gray-200 overflow-y-scroll">
        {loading && <Loader />}
        <div className="bg-gray-50 px-6 pb-6 border border-gray-100 rounded-xl shadow-lg items-center justify-center w-full h-full md:w-auto md:h-auto">
        <h2 className='text-center text-lg md:text-2xl font-bold text-black py-6'>Update Product</h2>

        <div className="flex flex-col gap-4 text-[12px] md:text-sm">
                    <div>
                        <input
                            type="text"
                            name="title"
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    title: e.target.value,
                                })
                            }}
                            placeholder='Product Title'
                            className='bg-gray-50 text-black border border-gray-200 px-4 py-1 md:py-2 w-full md:w-96 rounded-md outline-none placeholder-gray-400'
                        />
                    </div>

                    <div>
                        <input
                            type="number"
                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    price: e.target.value,
                                })
                            }}
                            placeholder='Product Price'
                            className='bg-gray-50 text-black border border-gray-200 px-4 py-1 md:py-2 w-full md:w-96 rounded-md outline-none placeholder-gray-400'
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            value={product.productImgUrl}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    productImgUrl: e.target.value,
                                })
                            }}
                            placeholder='Product Image Url'
                            className='bg-gray-50 text-black border border-gray-200 px-4 py-1 md:py-2 w-full md:w-96 rounded-md outline-none placeholder-gray-400'
                        />
                    </div>

                    <div>
                        <select 
                            value={product.category.toLowerCase()}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    category: e.target.value,
                                });
                            }}
                            className="w-full px-2 py-1 md:py-2 text-black bg-gray-50 border border-gray-200 rounded-md outline-none">
                            <option>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value;
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div>
                        <input
                            type="text"
                            value={product.subCategory}
                            onChange={(e) => {
                                setProduct({
                                    ...product,
                                    subCategory: e.target.value,
                                })
                            }}
                            placeholder='Sub Category'
                            className='bg-gray-50 text-black border border-gray-200 px-4 py-1 md:py-2 w-full md:w-96 rounded-md outline-none placeholder-gray-400'
                        />
                    </div>

                {["fashion", "watch", "footwear", "kids", "jewellery"].includes(product.category.toLowerCase()) && (
                    <>
                        <div>
                            <select
                                value={product.gender}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        gender: e.target.value,
                                    });
                                }}
                                className="w-full px-2 py-1 md:py-2 text-black bg-gray-50 border border-gray-200 rounded-md outline-none">
                                <option disabled>Select Gender</option>
                                {genderList.map((gender, index) => (
                                    <option key={index} value={gender}>{gender}</option>
                                ))}
                            </select>
                        </div>
                        </>
                )}
                {["fashion", "footwear"].includes(product.category.toLowerCase()) && (
                    <>
                        <div>
                            <input
                                type="text"
                                value={product.size}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        size: e.target.value,
                                    })
                                }}
                                placeholder='Product Sizes (e.g., S, M, L, XL)'
                                className='bg-gray-50 text-black border border-gray-200 px-4 py-1 md:py-2 w-full md:w-96 rounded-md outline-none placeholder-gray-400'
                            />
                        </div>

                    </>
                )}

                <div>
                    <textarea 
                        value={product.description}
                        onChange={(e) => {
                            setProduct({
                                ...product,
                                description: e.target.value,
                            })
                        }}
                        name="description" 
                        placeholder="Product Description" 
                        rows="5" 
                        className=" w-full px-4 py-1 text-black bg-gray-50 border border-gray-200 rounded-md outline-none placeholder-gray-300">
                    </textarea>
                </div>
                    <div>
                        <button
                            type='button'
                            onClick={updateProduct}
                            className='bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-1 md:py-2 font-bold rounded-md'>
                            Update Product
                        </button>
                    </div>
                </div>

        </div>
      </div>
    </div>
  );
}

export default UpdateProductPage;
