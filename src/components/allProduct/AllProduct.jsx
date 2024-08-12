import { useContext } from "react";
import ProductCard from "../card/ProductCard";
import MyContext from "../../context/MyContext";
import Loader from "../loader/Loader";

const AllProduct = () => {
    const {loading, getAllProduct} = useContext(MyContext);
    // console.log("all products : ",getAllProduct);

    return (
        <div className="mt-8">
            {/* Heading  */}
            <div className="">
                <h1 className="text-center mb-5 text-2xl font-semibold">Bestselling Products</h1>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font md:mx-10">
                    <div className="flex flex-wrap md:gap-10 justify-center">
                    {loading && <Loader />}
                        {getAllProduct.slice(0,20).map((item, index) => (
                            
                            <ProductCard key={index} image={item.productImgUrl} price={item.price} title={item.title} item_id={item.id} item={item} />
                        ))}
                    </div>
            </section>
        </div>
    );
}

export default AllProduct;