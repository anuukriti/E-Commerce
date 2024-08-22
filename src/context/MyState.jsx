import { useEffect, useState } from "react"
import MyContext from "./MyContext"
import { fireDB } from "../firebase/FirebaseConfig";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import {toast} from "react-hot-toast"

function MyState({children}) {
    const [loading, setLoading] = useState(false);

    // product State 
    const [getAllProduct, setGetAllProduct] = useState([]);

    //get all product function
    const getAllProductfunc = async() => {
      setLoading(true);
      try {
        const q = query(
            collection(fireDB, "products"),
            orderBy('time')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let productArray = [];
            QuerySnapshot.forEach((doc) => {
                productArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllProduct(productArray);
            setLoading(false);
        });
        return () => data;
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
    }

    // Order State 
    const [getAllOrder, setGetAllOrder] = useState([]);

    const getAllOrderFunction = async () => {
    setLoading(true);
    try {
        const q = query(
            collection(fireDB, "order"),
            orderBy('time')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let orderArray = [];
            QuerySnapshot.forEach((doc) => {
                orderArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllOrder(orderArray);
            setLoading(false);
        });
        return () => data;
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
    }

  
  // user State 
  const [getAllUser, setGetAllUser] = useState([]);

  const getAllUserFunction = async () => {
    setLoading(true);
    try {
        const q = query(
            collection(fireDB, "user"),
            orderBy('time')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
            let userArray = [];
            QuerySnapshot.forEach((doc) => {
                userArray.push({ ...doc.data(), id: doc.id });
            });
            setGetAllUser(userArray);
            setLoading(false);
        });
        return () => data;
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
    }

    useEffect(() => {
      getAllProductfunc();
      getAllOrderFunction();
      getAllUserFunction();
    }, [])

    const [filterType, setFilterType] = useState("All")
    const [filterPrice, setFilterPrice] = useState("All")
    
  return (
    <div>
        <MyContext.Provider value={{loading, setLoading, getAllProduct, setGetAllProduct, getAllProductfunc, getAllOrder, setGetAllOrder, getAllOrderFunction, getAllUser, getAllUserFunction, filterType, setFilterType, filterPrice, setFilterPrice}}>
            {children}
        </MyContext.Provider>
    </div>
  )
}

export default MyState