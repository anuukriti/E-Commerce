import { useState, useContext } from "react";
import {useNavigate} from "react-router-dom"
import MyContext from "../../context/MyContext";

const Searchbar = () => {
    const { getAllProduct } = useContext(MyContext);

    // Search State 
    const [search, setSearch] = useState("");

    // Filter Search Data
    let filtersetdata = new Set();
    getAllProduct.map((obj) => {
        filtersetdata.add(obj.category+","+obj.subCategory);
    })
    let filterdata = Array.from(filtersetdata);

    const filterSearchData = filterdata.filter((obj) => obj.toLowerCase().includes(search.toLowerCase())).slice(0, 8)

    const navigate = useNavigate();

  return (
    <div className="w-full">
    {/* search input */}
    <div className="input flex justify-center">
        <input
            type="text"
            placeholder='Search here'
            value={search}
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
                        const cate = item.split(",")[0];
                        const displayCate = item.split(",")[1];
                        return (
                            <div key={index} className="py-2 px-2" onClick={() => navigate(`category/${cate}`)}>
                                <div className="flex items-center gap-2 text-black cursor-pointer">
                                    {displayCate}
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