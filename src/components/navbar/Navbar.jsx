import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Searchbar from '../searchbar/Searchbar';
import {useSelector} from 'react-redux'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem("users"));

    // navigate 
    const navigate = useNavigate();

    // logout function 
    const logout = () => {
        localStorage.clear('users');
        navigate("/login")
    }

    const cartItems = useSelector((state) => state.cart);


  // navList Data
  const navList = (
      <ul className="flex space-x-3 text-darkText font-medium text-md px-5 ">
          {/* Home */}
          <li>
              <Link to={'/'}>Home</Link>
          </li>
          {/* All Product */}
          {/* <li>
              <Link to={'/allproduct'}>Home</Link>
          </li> */}
          {/* Signup */}
          {!user ? <li>
              <Link to={'/signup'}>Signup</Link>
          </li> : ""}
          {/* Login */}
          {!user ? <li>
              <Link to={'/login'}>Login</Link>
          </li> : ""}
          {/* User */}
          {user?.role === "user" && <li>
              <Link to={'/user-dashboard'}>{user?.name}</Link>
          </li>}
          {/* Admin */}
          {user?.role === "admin" && <li>
          <Link to={'/admin-dashboard'}>Admin</Link>
          </li>}
          {/* logout */}
          {user && <li className='cursor-pointer' onClick={logout}>
            Logout
          </li>}
          {/* Cart */}
          <li>
              <Link to={'/cart'}>
              Cart ({cartItems.length})
              </Link>
          </li>
      </ul>
  )
  return (
      <nav className="sticky top-0 bg-whiteText z-50">
          {/* main  */}
          <div className="lg:flex items-center py-3 lg:px-3 w-full">
              {/* left  */}
              <div className="left py-3 lg:py-0">
                  <Link to={'/'}>
                  <h2 className=" font-bold text-darkText text-2xl text-center">Logo</h2>
                  </Link>
              </div>
              {/* right  */}
              {/* Search Bar  */}
              <div className='flex-1 lg:mx-20 mx-5'>
                <Searchbar />
              </div>
              <div className="right flex justify-center mb-4 lg:mb-0">
                  {navList}
              </div>
          </div>
      </nav>
  );
}

export default Navbar;