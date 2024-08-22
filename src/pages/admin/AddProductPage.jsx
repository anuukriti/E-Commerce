import { useContext, useState } from "react";
import MyContext from "../../context/MyContext";
import { useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { toast } from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import { fireDB } from "../../firebase/FirebaseConfig";

const categoryList = [
  { name: 'Fashion' },
  { name: 'Kids' },
  { name: 'Gadgets' },
  { name: 'Footwear' },
  { name: 'Kitchen' },
  { name: 'Home' },
  { name: 'Toys' },
  { name: 'Women' },
  { name: 'Watch' },
  { name: 'Men' }
];

const AddProductPage = () => {
    const { loading, setLoading } = useContext(MyContext);
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImgUrl: "",
        category: "",
        description: "",
        quantity: 1,
        size: "",
        color: "",
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

        if (product.category === "Fashion") {
            const sizes = product.size.split(',').map(size => size.trim());
            const colors = product.color.split(',').map(color => color.trim());

            if (sizes.length === 0 || colors.length === 0) {
                return toast.error("Size and color are required for Fashion products");
            }

            product.size = sizes;
            product.color = colors;
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
        <div className="flex justify-center items-center h-screen bg-gray-200">
            {loading && <Loader />}
            <div className="login_Form bg-gray-50 px-10 py-10 border border-gray-100 rounded-xl shadow-lg">
                <div className="mb-5">
                    <h2 className='text-center text-2xl font-bold text-black py-6'>
                        Add Product
                    </h2>
                </div>

                <div className="mb-3 py-2 px-2">
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
                        className='bg-gray-50 text-black border border-gray-200 px-4 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                    />
                </div>

                <div className="mb-3 py-2 px-2">
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
                        className='bg-gray-50 text-black border border-gray-200 px-4 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                    />
                </div>

                <div className="mb-3 py-2 px-2">
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
                        className='bg-gray-50 text-black border border-gray-200 px-4 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                    />
                </div>

                <div className="mb-3 py-2 px-2">
                    <select 
                        value={product.category}
                        onChange={(e) => {
                            setProduct({
                                ...product,
                                category: e.target.value,
                            });
                        }}
                        className="w-full px-2 py-2 text-black bg-gray-50 border border-gray-200 rounded-md outline-none">
                        <option disabled>Select Product Category</option>
                        {categoryList.map((value, index) => {
                            const { name } = value;
                            return (
                                <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                            )
                        })}
                    </select>
                </div>

                {product.category === "Fashion" && (
                    <>
                        <div className="mb-3 py-2 px-2">
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
                                className='bg-gray-50 text-black border border-gray-200 px-4 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                            />
                        </div>

                        <div className="mb-3 py-2 px-2">
                            <input
                                type="text"
                                value={product.color}
                                onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        color: e.target.value,
                                    })
                                }}
                                placeholder='Product Colors (e.g., Red, Green, Blue)'
                                className='bg-gray-50 text-black border border-gray-200 px-4 py-2 w-96 rounded-md outline-none placeholder-gray-400'
                            />
                        </div>
                    </>
                )}

                <div className="mb-3 py-2 px-2">
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

                <div className="mb-3 py-2 px-2">
                    <button
                        type='button'
                        onClick={addProductFunction}
                        className='bg-gray-500 hover:bg-gray-600 w-full text-white text-center py-2 font-bold rounded-md'>
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AddProductPage;
