import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';

function Filter({categoryOptions, genderarray}) {
    console.log(genderarray);
    const context = useContext(MyContext);
    const { filterType, setFilterType, filterPrice, setFilterPrice, filterGender, setFilterGender} = context;

    const handleResetBtn = () => {
        setFilterType("Category");
        setFilterPrice("Price");
        setFilterGender("Gender");
    }

    return (
        <div className='flex justify-between bg-gray-100 items-center w-full overflow-x-auto mb-5'>
            <div className="flex gap-2 md:gap-10 items-center py-2 px-2 w-auto">
                <select 
                    value={filterType} 
                    onChange={(e) => setFilterType(e.target.value)} 
                    className="w-auto px-4 py-2 rounded-md bg-gray-50 shadow-sm text-[12px] md:text-sm"
                >                  
                    <option value="All" className='px-2'>Category</option>  
                    {categoryOptions.map((obj) => {
                        return (
                            <option value={obj} className='px-2'>{obj}</option>
                        )
                    })}
                </select>
                <select 
                    value={filterPrice} 
                    onChange={(e) => setFilterPrice(e.target.value)} 
                    className="w-auto px-2 md:px-4 py-2 rounded-md bg-gray-50 shadow-sm text-[12px] md:text-sm"
                >
                    <option value="All" className='px-[2px] md:px-2'>Price</option>
                    <option value="500" className='px-[2px] md:px-2'>Under 500</option>
                    <option value="1000" className='px-[2px] md:px-2'>Under 1000</option>
                    <option value="2000" className='px-[2px] md:px-2'>Under 2000</option>
                </select>
                {genderarray.length > 0 
                    && 
                    <select 
                    value={filterGender} 
                    onChange={(e) => setFilterGender(e.target.value)} 
                    className="w-auto px-4 py-2 rounded-md bg-gray-50 shadow-sm text-[12px] md:text-sm"
                >                  
                    <option value="All" className='px-2'>Gender</option>  
                    {genderarray.map((obj) => {
                        return (
                            <option value={obj} className='px-2'>{obj}</option>
                        )
                    })}
                </select>
                }
                
            </div>
            <div className='w-auto'>
                <button 
                    onClick={handleResetBtn} 
                    className="px-2 md:px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-800 text-[12px] md:text-sm font-medium rounded-md w-[100px]"
                >
                    Reset Filter
                </button>
            </div>
        </div>
    );
}

export default Filter;
