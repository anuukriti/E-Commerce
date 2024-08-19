import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './pages/home/Home'
import Nopage from './pages/nopage/Nopage'
import ProductInfo from './pages/productInfo/ProductInfo'
import ScrollTop from './components/scrollTop/ScrollTop'
import Cartpage from './pages/cart/Cartpage'
import Login from './pages/registration/Login'
import Signup from './pages/registration/Signup'
import AdminDashboard from './pages/admin/AdminDashboard'
import UserDashboard from './pages/user/UserDashboard'
import AddProductPage from './pages/admin/AddProductPage'
import UpdateProductPage from './pages/admin/UpdateProductPage'
import MyState from './context/MyState'
import {Toaster} from 'react-hot-toast'
import ProtectedRouteForUser from './protectedRoute/ProtectedRouteForUser'
import ProtectedRouteForAdmin from './protectedRoute/ProtectedRouteForAdmin'
import CategoryPage from './components/category/CategoryPage'
import BuyNowModal from './components/buyNowModel/BuyNowModel'


function App() {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/*' element={<Nopage/>} />
          <Route path='/productInfo/:id' element={<ProductInfo/>} />
          <Route path='/cart' element={<Cartpage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/Category/:categoryName' element={<CategoryPage/>} />
          <Route path='/user-dashboard' element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />
          <Route path='/admin-dashboard' element={
            <ProtectedRouteForAdmin>
              <AdminDashboard />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/add-product' element={
            <ProtectedRouteForAdmin>
              <AddProductPage />
            </ProtectedRouteForAdmin>
          } />
          <Route path='/update-product/:id' element={
            <ProtectedRouteForAdmin>
              <UpdateProductPage />
            </ProtectedRouteForAdmin>
          } />
        </Routes>
          <Toaster />
      </Router>
    </MyState>
  )
}

export default App
