import React, { useContext } from 'react'
import Layout from '../layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import MyContext from '../../context/MyContext';
import ProductCard from "../card/ProductCard";
import Loader from '../loader/Loader';
import Card from '../card/Card'

function CategoryPage() {
    const { categoryName} = useParams();
    console.log(categoryName)

    const {getAllProduct, loading} = useContext(MyContext);
    const navigate = useNavigate();

    // filter product 
    const filterProduct = getAllProduct.filter((obj)=> obj.category.includes(categoryName));
    console.log(filterProduct.length);
    console.log("filter: ", filterProduct);
    console.log("all: ", getAllProduct);
    const categorydata = [
        {
            image: 'https://i.pinimg.com/564x/49/70/72/4970728b98a0ebcc5a048e1bfd42b5d6.jpg',
            name: "Shirt",
            category: "Fashion",
            gender: "male",
        },
        {
            image: 'https://i.pinimg.com/736x/b2/cd/6b/b2cd6b4edbbfcf24ab123538b2b38270.jpg',
            name: "Trouser",
            category: "Fashion",
            gender: "male",
        },
        {
            image: 'https://i.pinimg.com/564x/67/97/a1/6797a1cd034caec2da437db5defe4e0b.jpg',
            name: "jeans",
            category: "Fashion",
            gender: "male",
        },
        {
            image: 'https://i.pinimg.com/736x/b7/eb/09/b7eb09e12771c268aeac3c887693386a.jpg',
            name: "T-shirt",
            category: "Fashion",
            gender: "male",
        },
        {
            image: 'https://i.pinimg.com/564x/aa/84/b8/aa84b81ef23aad7ab83a7063420f7645.jpg',
            name: "Pullover",
            category: "Fashion",
            gender: "male",
        },
        {
            image: 'https://i.pinimg.com/564x/aa/4a/c7/aa4ac7b09a4ebd9178fa0cca84853661.jpg',
            name: "Blazer",
            category: "Fashion",
            gender: "male",
        },
        {
            image: 'https://i.pinimg.com/564x/20/3a/bb/203abba406d8bab7d78fe8f203aa180a.jpg',
            name: "T-shirt",
            category: "Fashion",
            gender: "female",
        },
        {
            image: 'https://i.pinimg.com/564x/3b/38/b2/3b38b2b21a90862a487856d57ba6ea67.jpg',
            name: "Shirt",
            category: "Fashion",
            gender: "female",
        },
        {
            image: 'https://i.pinimg.com/564x/7c/1e/7c/7c1e7cfee56e155fcda98e3c5aa1f0e0.jpg',
            name: "Top",
            category: "Fashion",
            gender: "female",
        },
        {
            image: 'https://i.pinimg.com/564x/fd/7f/0d/fd7f0df97b865b7432753ecae447050e.jpg',
            name: "Dresses",
            category: "Fashion",
            gender: "female",
        },
        {
            image: 'https://i.pinimg.com/564x/b2/19/f5/b219f510a652c57ec79322108adfbffb.jpg',
            name: "Cord-set",
            category: "Fashion",
            gender: "female",
        },
        {
            image: 'https://i.pinimg.com/736x/6e/34/4d/6e344d9953f2f88ecde26e642663d3bf.jpg',
            name: "Trouser",
            category: "Fashion",
            gender: "female",
        },
        {
            image: 'https://i.pinimg.com/564x/e8/58/d6/e858d67948094b3d2b431ff95718932b.jpg',
            name: "Skirts",
            category: "Fashion",
            gender: "female",
        },
        {
            image: 'https://i.pinimg.com/564x/cc/57/9e/cc579e592b7ae921debb44a704a23d2a.jpg',
            name: "Kurti",
            category: "Fashion",
            gender: "female",
        },
        {
            image: 'https://i.pinimg.com/564x/90/b1/a1/90b1a1c9bd5c51ce6f21bb73a5952bd0.jpg',
            name: "Kurts set",
            category: "Fashion",
            gender: "female",
        },
        {
            image: 'https://i.pinimg.com/564x/29/10/fa/2910faa211049da723e0b63b0b9bf6a1.jpg',
            name: "sharara set",
            category: "Fashion",
            gender: "female",
        },
        {
            image: 'https://i.pinimg.com/736x/84/eb/9c/84eb9c6d60faed3805571ab377c220e2.jpg',
            name: "Lehenga",
            category: "Fashion",
            gender: "female",
        },
        {
            image: 'https://i.pinimg.com/736x/5f/59/be/5f59be77fef94f5c98e0294c11a4b832.jpg',
            name: "Saree",
            category: "Fashion",
            gender: "female",
        },
    ]

  return (
    <Layout>
        <div className='px-10 border-b-2 pb-5'>
        <section className="w-full flex flex-wrap gap-4 justify-center my-5 -z-20">
            
            {categorydata.filter((obj)=> obj.category.includes(categoryName)).map((item, index) => (
                <Card key={index} title={item.name} image={item.image} />
            ))}
        </section>

        
        </div>
        {loading ?
            <div className='w-full flex justify-center'> <Loader /> </div> 
         : 
            <>
            {filterProduct.length > 0 ? 
                <section className="text-gray-600 body-font md:mx-10 my-10">
                    <div className="flex flex-wrap gap-2 md:gap-10 justify-center">
                        {filterProduct.map((item, index) => (  
                            <ProductCard key={index} image={item.productImgUrl} price={item.price} title={item.title} item_id={item.id} />
                        ))}
                    </div>
            </section>
            :
            <div className='w-full flex justify-center'>
                <div>
                    <img className='h-80' src='https://img.freepik.com/premium-vector/vector-illustration-about-concept-search-no-results-search-yielding-no-results_675567-6179.jpg?w=740' />
                    <p className='w-full text-center'>Opps! No result Found</p>
                </div>
            </div>
            }
            
            </>
        }
       
    </Layout>
  )
}

export default CategoryPage