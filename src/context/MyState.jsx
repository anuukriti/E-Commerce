import { useEffect, useState } from "react"
import MyContext from "./MyContext"
import { fireDB } from "../firebase/FirebaseConfig";
import { orderBy, query, collection, onSnapshot } from "firebase/firestore";

function MyState({children}) {
    const [loading, setLoading] = useState(false);

    const [getAllProduct, setGetAllProduct] = useState([]);

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

    useEffect(() => {
      getAllProductfunc();
    }, [])

  return (
    <div>
        <MyContext.Provider value={{loading, setLoading, getAllProduct, setGetAllProduct, getAllProductfunc}}>
            {children}
        </MyContext.Provider>
    </div>
  )
}

export default MyState