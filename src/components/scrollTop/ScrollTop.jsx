import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function scrollTop() {
    const {pathname} = useLocation();

    useEffect(()=>{
        setTimeout(() => {
            window.scrollTo(0,0);
        }, 0)
    }, [pathname]);
  return null;
}

export default scrollTop