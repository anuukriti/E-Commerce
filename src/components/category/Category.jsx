import React from 'react'
import Card from '../card/Card'

function Category() {

    const category = [
        {
            image: 'https://i.pinimg.com/564x/36/6a/21/366a211264a9aa625b8bcfb36d35fb15.jpg',
            name: "Fashion",
        },
        {
            image: 'https://i.pinimg.com/564x/72/9a/6b/729a6b61b8506a9012f2f9fe02acbcea.jpg',
            name: "Kids",
        },
        {
            image: 'https://i.pinimg.com/564x/f1/ce/c8/f1cec8c12b57ac8969e7c01adccda272.jpg',
            name: "Footwear",
        },
        {
            image: 'https://i.pinimg.com/564x/18/f3/7f/18f37f7f0f5b301ca6af0bbe5ab67175.jpg',
            name: "Cosmetics",
        },
        {
            image: 'https://i.pinimg.com/564x/0d/a9/0f/0da90f0e872b3dfbcde329eeec37a009.jpg',
            name: 'Jewellery',
        },
        {
            image: 'https://i.pinimg.com/564x/b6/d7/df/b6d7df3f1bb3bd8f70df9ac1fd678465.jpg',
            name: 'Watch',
        },
        {
            image: 'https://i.pinimg.com/564x/d9/17/c5/d917c5981efc8f2542ef16dcff58c6a2.jpg',
            name: 'Gadgets',
        },
        {
            image: 'https://i.pinimg.com/736x/10/4f/ac/104fac41b910145bb2c3bb15cf6b8894.jpg',
            name: "Home",
        },
        {
            image: 'https://i.pinimg.com/564x/80/55/96/805596598db8f4b2a7815f1526fa5455.jpg',
            name: "Kitchen",
        },
        {
            image: 'https://i.pinimg.com/564x/80/55/96/805596598db8f4b2a7815f1526fa5455.jpg',
            name: "Bags",
        }
    ]

  return (
    <div className="mt-8">
        <section className="w-full flex flex-wrap gap-4 md:gap-10 justify-center py-5">
            {category.map((item, index) => (
                <Card key={index} title={item.name} image={item.image} />
            ))}
        </section>    
    </div>
  )
}

export default Category