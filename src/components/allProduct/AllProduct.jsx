import { useContext } from "react";
import ProductCard from "../card/ProductCard";
import MyContext from "../../context/MyContext";
import Loader from "../loader/Loader";

const AllProduct = () => {
    const { loading, getAllProduct } = useContext(MyContext);

    // Sort products by date in descending order
    const sortedProducts = [...getAllProduct].sort((a, b) => new Date(b.time.seconds) - new Date(a.time.seconds));

    return (
        <div className="my-8">
            {/* Heading  */}
            <div className="">
                <h1 className="text-center mb-5 text-2xl font-semibold">New Products</h1>
            </div>

            {/* main  */}
            <section className="text-gray-600 body-font md:mx-10">
                <div className="flex flex-wrap md:gap-10 justify-center">
                    {loading && <Loader />}
                    {sortedProducts.slice(0, 20).map((item, index) => (
                        <ProductCard
                            key={item.id}  // Use item.id as the key instead of index
                            image={item.productImgUrl}
                            price={item.price}
                            title={item.title}
                            item_id={item.id}
                            item={item}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

export default AllProduct;
