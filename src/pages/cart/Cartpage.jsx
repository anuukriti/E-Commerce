import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react'
import {deleteFromCart, incrementQuantity, decrementQuantity} from '../../redux/CartSlice'
import {useDispatch, useSelector} from 'react-redux'
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import BuyNowModal from "../../components/buyNowModel/BuyNowModel";
import { Navigate } from "react-router";


const CartPage = () => {

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    useEffect(()=> {
        localStorage.setItem('cart', JSON.stringify(cartItems));
      }, [cartItems]);

    const cartItemTotal = cartItems.map(item => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0);

    // console.log(cartItemTotal,cartTotal);
    // console.log(cartItems.length);

    // user
    const user = JSON.parse(localStorage.getItem('users'))
    
    // address
    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
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

    // Buy Now Function
    const buyNowFunction= async () => {
        // validation 
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Fields are required")
        }
    
        var options = {
          key: "rzp_test_wAQwoHpxLuuWXs",
          key_secret: "NvlWT6RkF5eQhlx16FvfNvRY",
          amount: parseInt(cartTotal * 100),
          currency: "INR",
          order_receipt: 'order_rcptid_' + addressInfo.name,
          name: "E-Bharat",
          description: "for testing purpose",
          handler: function (response) {

            toast.success('Payment Successful')
            const paymentId = response.razorpay_payment_id
            // store in firebase 
            const orderInfo = {
              cartItems,
              addressInfo,
              email: user.email,
              userid: user.uid,
              status: "confirmed",
              time: Timestamp.now(),
              date: new Date().toLocaleString(
                "en-US",
                {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }
              ),
              paymentId
            }
    
            try {
                const orderRef = collection(fireDB, 'order');
                addDoc(orderRef, orderInfo);
                setAddressInfo({
                    name: "",
                    address: "",
                    pincode: "",
                    mobileNumber: "",
                })
            toast.success("Order Placed Successfull")
            } catch (error) {
              console.log(error)
            }
          },
          theme: {
            color: "#3399cc"
          }
        };
        var pay = new window.Razorpay(options);
        pay.open();
        console.log(pay)
    };
    
    return (
        <Layout>
            <div className="container mx-auto max-w-7xl px-2 lg:px-0">
                <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shopping Cart
                    </h1>
                    {cartItems.length > 0
                        ?
                        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="rounded-lg bg-white lg:col-span-8">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>
                                <ul role="list" className="divide-y divide-gray-200">
                                {cartItems.map((product) => (
                                    <div key={product.id} className="">
                                        <li className="flex py-6 sm:py-6 ">
                                            <div className="flex-shrink-0">
                                                <img
                                                    src={product.productImgUrl}
                                                    alt={product.title}
                                                    className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <a href={product.href} className="font-semibold text-black">
                                                                    {product.name}
                                                                </a>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm">
                                                            <p className="text-sm text-gray-500">{product.color}</p>
                                                            {product.size ? (
                                                                <p className="ml-4 border-l border-gray-200 pl-4 text-sm text-gray-500">
                                                                    {product.size}
                                                                </p>
                                                            ) : null}
                                                        </div>
                                                        <div className="mt-1 flex items-end">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {product.price}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <div className="mb-2 flex">
                                            <div className="min-w-24 flex">
                                                <button onClick={() => handleDecrement(product.id)} type="button" className="h-7 w-7">
                                                    -
                                                </button>
                                                <input
                                                    type="text"
                                                    className="mx-1 h-7 w-9 rounded-md border text-center"
                                                    value = {product.quantity}
                                                />
                                                <button onClick={() => handleIncrement(product.id)} type="button" className="flex h-7 w-7 items-center justify-center">
                                                    +
                                                </button>
                                            </div>
                                            <div className="ml-6 flex text-sm">
                                                <button onClick={() => deleteCart(product)} type="button" className="flex items-center space-x-1 px-2 py-1 pl-0">
                                                    <Trash size={12} className="text-red-500" />
                                                    <span className="text-xs font-medium text-red-500">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ul>                              
                        </section>
                        {/* Order summary */}
                        <section
                            aria-labelledby="summary-heading"
                            className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
                        >
                            <h2
                                id="summary-heading"
                                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
                            >
                                Price Details
                            </h2>
                            <div>
                                <dl className=" space-y-1 px-2 py-4">
                                    <div className="flex items-center justify-between">
                                        <dt className="text-sm text-gray-800">Price ({cartItemTotal} item)</dt>
                                        <dd className="text-sm font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>
                                    {/* <div className="flex items-center justify-between pt-4">
                                        <dt className="flex items-center text-sm text-gray-800">
                                            <span>Discount</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">- ₹ 3,431</dd>
                                    </div> */}
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="flex text-sm text-gray-800">
                                            <span>Delivery Charges</span>
                                        </dt>
                                        <dd className="text-sm font-medium text-green-700">Free</dd>
                                    </div>
                                    <div className="flex items-center justify-between border-y border-dashed py-4 ">
                                        <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                                        <dd className="text-base font-medium text-gray-900">₹ {cartTotal}</dd>
                                    </div>
                                </dl>
                                <div className="px-2 pb-4 font-medium text-green-700">
                                    <div className="flex gap-4 mb-6">
                                        {user
                                            ? 
                                            <BuyNowModal
                                                    addressInfo={addressInfo}
                                                    setAddressInfo={setAddressInfo}
                                                    buyNowFunction={buyNowFunction}
                                            /> 
                                            : 
                                            <Navigate to={'/login'}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                    </form>
                        :
                        <div className="w-full flex justify-center mt-10">
                            <div>
                            <img src="https://i.pinimg.com/564x/70/57/58/705758b9edfc1637da71d4af09f0622b.jpg" />
                            <p className="pt-10 w-full text-center text-md font-semibold"> Your Cart is empty!</p>
                            </div>
                        </div>
                    }
                    
                </div>
            </div>
        </Layout>
    );
}

export default CartPage;