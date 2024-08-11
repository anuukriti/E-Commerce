import { useState } from "react";

// Search Data
const searchData = [
  {
      name: 'Fashion'
  },
  {
      name: 'Shirt'
  },
  {
      name: 'Jacket'
  },
  {
      name: 'Mobile'
  },
  {
      name: 'Laptop'
  },
  {
      name: 'Home'
  },
  {
      name: 'book'
  },
]

const Searchbar = () => {
   // Search State 
   const [search, setSearch] = useState("");

   // Filter Search Data
   const filterSearchData = searchData.filter((obj) => obj.name.toLowerCase().includes(search)).slice(0, 8)
  return (
    <div className="w-full">
    {/* search input  */}
    <div className="input flex justify-center">
        <input
            type="text"
            placeholder='Search here'
            onChange={(e) => setSearch(e.target.value)}
            className=' bg-gray-200 placeholder-gray-400 rounded-lg px-2 py-2 w-full outline-none text-black '
        />
    </div>

    {/* search drop-down  */}
    <div className=" flex justify-center px-10">
        {search && <div className="block absolute bg-gray-200 w-full lg:w-[980px] z-50 my-1 rounded-lg px-2 py-2">
            {filterSearchData.length > 0 ?
                <>
                    {filterSearchData.map((item, index) => {
                        return (
                            <div key={index} className="py-2 px-2">
                                <div className="flex items-center gap-2">
                                    {item.name}
                                </div>
                            </div>
                        )
                    })}
                </>
                :

                <>
                    <div className="flex justify-center">
                        <img className=" w-20" src="https://cdn-icons-png.flaticon.com/128/10437/10437090.png" alt="img" />
                    </div>
                </>}
        </div>
        }
    </div>
</div>
  );
}

export default Searchbar;