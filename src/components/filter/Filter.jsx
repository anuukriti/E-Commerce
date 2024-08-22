import React, { useContext } from 'react';
import MyContext from '../../context/MyContext';

function Filter({categoryOptions}) {
    console.log(categoryOptions);
    const context = useContext(MyContext);
    const { filterType, setFilterType, filterPrice, setFilterPrice } = context;

    const handleResetBtn = () => {
        setFilterType("All");
        setFilterPrice("All");
    }

    return (
        <div className='flex justify-between bg-gray-100 items-center'>
            <div className="flex gap-10 items-center py-2 px-2">
                <select 
                    value={filterType} 
                    onChange={(e) => setFilterType(e.target.value)} 
                    className="w-auto px-4 py-3 rounded-md bg-gray-50 shadow-sm text-sm"
                >                  
                    <option value="All" className='px-2'>All</option>  
                    {categoryOptions.map((obj) => {
                        return (
                            <option value={obj} className='px-2'>{obj}</option>
                        )
                    })}
                </select>
                <select 
                    value={filterPrice} 
                    onChange={(e) => setFilterPrice(e.target.value)} 
                    className="w-auto px-4 py-3 rounded-md bg-gray-50 shadow-sm text-sm"
                >
                    <option value="All" className='px-2'>All</option>
                    <option value="500" className='px-2'>Under 500</option>
                    <option value="1000" className='px-2'>Under 1000</option>
                    <option value="2000" className='px-2'>Under 2000</option>
                </select>
            </div>
            <div>
                <button 
                    onClick={handleResetBtn} 
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                >
                    Reset Filter
                </button>
            </div>
        </div>
    );
}

export default Filter;
