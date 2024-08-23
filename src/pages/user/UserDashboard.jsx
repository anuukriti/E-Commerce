import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import MyContext from "../../context/MyContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem("users"));
    const {loading, getAllOrder}  = useContext(MyContext);

    const sortedOrder = [...getAllOrder].sort((a, b) => new Date(b.time.seconds) - new Date(a.time.seconds));

    return (
        <Layout>
            <div className=" container mx-auto px-4 py-5 lg:py-8">
                {   /* top */}
                <div className=" bg-[#EEEDEB] py-5 rounded-xl border border-[[#EEEDEB]]">
                    {/* image  */}
                    <div className="flex justify-center">
                    <img className="w-20 h-20 md:h-24 md:w-24" src="https://img.icons8.com/ios-glyphs/90/user--v1.png" alt="user--v1"/>
                    </div>
                    {/* text  */}
                    <div>
                        <h1 className=" text-center text-sm md:text-lg"><span className=" font-semibold">Name :</span>{user?.name}</h1>
                        <h1 className=" text-center text-sm md:text-lg"><span className=" font-semibold">Email :</span>{user?.email}</h1>
                    </div>
                </div>


                {/* bottom  */}
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        {/* text  */}
                        <h2 className=" text-2xl lg:text-3xl font-bold">Order Details</h2>

                        <div className="flex justify-center relative top-10">
                        {loading && <Loader/>}
                        </div>
                        
                        {/* main 2 */}
                        {sortedOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => {
                            // console.log(order);
                            return (
                                <div key={index}>
                                    {order.cartItems.map((item, index) => {
                                        const { id, date, quantity, price, title, productImgUrl, category, selectedSize } = item
                                        const { status } = order
                                        return (
                                            <div key={index} className="mt-5 flex flex-col overflow-hidden rounded-xl border border-gray-100 md:flex-row">
                                                <div className="w-full border-r border-gray-100 bg-gray-50 md:max-w-xs">
                                                    {/* details */}
                                                    <ul className="flex flex-col gap-2 p-4 md:p-6 mb-2 text-[12px] font-medium text-black md:text-sm">
                                                                <li>Order Id : #{id}</li>
                                                                <li>Date : {date}</li>
                                                                <li>Total Amount : ₹ {price * quantity}</li>                                                  
                                                                <li className="text-green-800 first-letter:uppercase">Order Status : {status}</li>
                                                    </ul>
                                                </div>
                                                {/* img  */}
                                                <div className="flex-1">
                                                    <div className="p-8">
                                                        <ul className="-my-7 divide-y divide-gray-200">
                                                            <li
                                                                className="flex flex-col justify-between space-x-5 py-7 md:flex-row"
                                                            >
                                                                <div className="flex flex-1 items-stretch">
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            className="h-20 w-20 rounded-lg border border-gray-200 object-cover"
                                                                            src={productImgUrl}
                                                                            alt="img"
                                                                        />
                                                                    </div>
                                                                    <div className="ml-5 flex flex-col justify-between">
                                                                        <div className="flex-1">
                                                                            <p className="text-sm font-bold text-gray-900">{title}</p>
                                                                            <p className="mt-1.5 text-sm font-medium text-gray-500">{category}</p>
                                                                            {selectedSize && <p className="mt-1.5 text-sm font-medium text-gray-500">size: {selectedSize}</p>}
                                                                            
                                                                        </div>
                                                                        <p className="mt-4 text-sm font-medium text-gray-500">x {quantity}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="ml-auto flex flex-col items-end justify-between">
                                                                    <p className="text-right text-sm font-bold text-gray-900">₹ {price}</p>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                        
                    </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;