import React, { useContext, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import MyContext from '../../context/MyContext'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import {addDoc, collection, Timestamp, onSnapshot, query, where } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
    const context = useContext(MyContext);
    const {loading, setLoading} = context

    // navigate
    const navigate = useNavigate();

    //user signup state
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    })

        //user login state
        const [userLogin, setUserLogin] = useState({
          email: "",
          password: "",
      })

    //users signup function
    const userSignupFunction = async () => {
        // validation 
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required")
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }

            // create user Refrence
            const userRefrence = collection(fireDB, "user")

            // Add User Detail
            addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            })

            toast.success("Signup Successfully");

            context.setLoading(false);
            navigate('/login')
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }
        //guest account function
      const handleGuestAccount = async() => {
          const users = await signInWithEmailAndPassword(auth, "guestuser@gmail.com", "guest@123");
          try {
            const q = query(
                collection(fireDB, "user"),
                where('uid', '==', users?.user?.uid)
            );
            const data = onSnapshot(q, (QuerySnapshot) => {
                let user;
                QuerySnapshot.forEach((doc) => user = doc.data());
                localStorage.setItem("users", JSON.stringify(user) )
                setUserLogin({
                    email: "",
                    password: ""
                })
                toast.success("Login Successfully");
                setLoading(false);
                if(user.role === "user") {
                    navigate('/');
                }else{
                    navigate('/admin-dashboard');
                }
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

  return (
    <div>
        <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      {loading && <Loader />}
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{' '}
            <a
              href="./Login"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </a>
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="text-base font-medium text-gray-900">
                  {' '}
                  Full Name{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    value={userSignup.name}   
                    onChange={(e) => {
                        setUserSignup({
                            ...userSignup,
                            name : e.target.value}
                        )
                    }}   
                    placeholder="Full Name"
                    id="name"
                  ></input>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="text-base font-medium text-gray-900">
                  {' '}
                  Email address{' '}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    value={userSignup.email}
                    onChange={(e) => {
                        setUserSignup({
                            ...userSignup,
                            email : e.target.value}
                        )
                    }} 
                    placeholder="Email"
                    id="email"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-base font-medium text-gray-900">
                    {' '}
                    Password{' '}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    value={userSignup.password}
                    onChange={(e) => {
                        setUserSignup({
                            ...userSignup,
                            password : e.target.value}
                        )
                    }} 
                    placeholder="Password"
                    id="password"
                  ></input>
                </div>
              </div>
              <div className='flex flex-col gap-5'>
                <button
                  type="button"
                  onClick={userSignupFunction}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
                <button
                  type="button"
                  onClick={handleGuestAccount}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Login with Guest User <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Signup