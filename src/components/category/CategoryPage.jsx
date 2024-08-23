import React, { useContext, useEffect } from 'react';
import Layout from '../layout/Layout';
import { useParams } from 'react-router-dom';
import MyContext from '../../context/MyContext';
import ProductCard from "../card/ProductCard";
import Loader from '../loader/Loader';
import Filter from '../filter/Filter';

function CategoryPage() {
    const { categoryName } = useParams();
    const { getAllProduct, loading, filterType, filterPrice, filterGender } = useContext(MyContext);

    // Filter the products based on selected category
    let filterProduct = getAllProduct.filter((obj) => obj.category.toLowerCase().includes(categoryName));

    // filter the product based on subcategory and gender
    let stringSetCategory = new Set();
    let stringSetGender = new Set();
    filterProduct.map((obj) => [
        stringSetCategory.add(obj.subCategory),
        obj.gender && stringSetGender.add(obj.gender),
    ])
    let categoryOptions = Array.from(stringSetCategory);
    let genderarray = Array.from(stringSetGender);

    filterProduct = filterProduct
        .filter((obj) => filterType === "Category" || obj.subCategory.includes(filterType))
        .filter((obj) => filterPrice === "Price" || obj.price < parseInt(filterPrice))
        .filter((obj) => filterGender === "Gender" || obj.gender.includes(filterGender))

    useEffect(() => {
        // Re-filter products whenever filterType or filterPrice changes
    }, [filterType, filterPrice, filterGender]);

    return (
        <Layout>
            <Filter categoryOptions={categoryOptions} genderarray={genderarray} /> 
            {loading ? (
                <div className='w-full flex justify-center'><Loader /></div>
            ) : (
                <>
                    {filterProduct.length > 0 ? (
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

export default CategoryPage;
