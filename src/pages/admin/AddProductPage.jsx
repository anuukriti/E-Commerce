import { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { fireDB } from "../../firebase/FirebaseConfig";

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

const AddProductPage = () => {
    const { loading, setLoading } = useContext(MyContext);
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImgUrl: "",
        category: "",
        subCategory: "",
        description: "",
        quantity: 1,
        size: "",
        color: "",
        gender: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

    const addProductFunction = async () => {
        if (product.title === "" || product.price === "" || product.productImgUrl === "" || product.category === "" || product.description === "") {
            return toast.error("All fields are required");
        }

        const categoryWithGenderOptions = ["fashion", "watch", "footwear", "jewellery"];
        if (categoryWithGenderOptions.includes(product.category.toLowerCase())) {
            const sizes = product.size.split(',').map(size => size.trim());

            if (sizes.length === 0) {
                return toast.error("Size are required for products in selected category");
            }

            if (product.gender === "") {
                return toast.error("Gender is required for products in selected category");
            }

            product.size = sizes;
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, 'products');
            await addDoc(productRef, product);
            toast.success("Product added successfully");
            navigate('/admin-dashboard');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Failed to add product");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen w-screen bg-gray-200 overflow-y-scroll">
            {loading && <Loader />}
            <div className="bg-gray-50 px-6 pb-6 border border-gray-100 rounded-xl shadow-lg items-center justify-center w-full h-full md:w-auto md:h-auto">
                <h2 className='text-center text-lg md:text-2xl font-bold text-black py-6'>Add Product</h2>

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
                            onClick={addProductFunction}
                            className='bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-1 md:py-2 font-bold rounded-md'>
                            Add Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductPage;
