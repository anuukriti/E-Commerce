import React, { useContext, useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import MyContext from '../../context/MyContext';
import ProductCard from "../../components/card/ProductCard";
import Loader from '../../components/loader/Loader';

function Wishlist() {
    // const { categoryName } = useParams();
    const { getAllProduct, loading,} = useContext(MyContext);


    return (
        <Layout>
            {loading ? (
                <div className='w-full flex justify-center'><Loader /></div>
            ) : (
                <>
                    {getAllProduct.length > 0 ? (
                        <section className="text-gray-600 body-font md:mx-10 my-10">
                            <div className="flex flex-wrap gap-2 md:gap-10 justify-center">
                                {filterProduct.map((item, index) => (
                                    <ProductCard 
                                        key={index} 
                                        image={item.productImgUrl} 
                                        price={item.price} 
                                        title={item.title} 
                                        item_id={item.id} 
                                        item={item} 
                                    />
                                ))}
                            </div>
                        </section>
                    ) : (
                        <div className='w-full flex justify-center'>
                            <div>
                                <img 
                                    className='h-80' 
                                    src='https://img.freepik.com/premium-vector/vector-illustration-about-concept-search-no-results-search-yielding-no-results_675567-6179.jpg?w=740' 
                                    alt="No results found"
                                />
                                <p className='w-full text-center'>Oops! No results found</p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </Layout>
    );
}

export default Wishlist;
