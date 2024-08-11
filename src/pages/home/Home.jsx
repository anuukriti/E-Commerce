import Layout from '../../components/layout/Layout'
import HeroSection from '../../components/heroSection/HeroSection'
import Category from '../../components/category/Category'
import AllProduct from '../../components/allProduct/AllProduct'

function Home() {
  return (
    <Layout> 
        <HeroSection />
        <Category />
        <AllProduct />
    </Layout>
  )
}

export default Home