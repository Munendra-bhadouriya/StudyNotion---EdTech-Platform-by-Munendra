import React, { useEffect, useState } from 'react'
import {
    TiStarFullOutline,
    TiStarHalfOutline,
    TiStarOutline,
} from "react-icons/ti"
const RatingStar = ({ Review_Count, Star_Size }) => {
    
    const [starCount, setStarCount] = useState({
        full: 0,
        half: 0,
        empty: 0,
    });

    useEffect(() => {
        const wholeStars = Math.floor(Review_Count) || 0;
        setStarCount({
            full: wholeStars,
            half: Number.isInteger(Review_Count) ? 0 : 1,
            empty: Number.isInteger(Review_Count) ? 5 - wholeStars : 4 - wholeStars,
        })
    }, [Review_Count]);
    
  return (
    <div className="flex gap-[2px] text-yellow-100">
        {
            [...new Array(starCount.full)].map((_, i) => (
                <TiStarFullOutline key={i} size={Star_Size || 20}/>
            ))
        }
        
        {
            [...new Array(starCount.half)].map((_, i) => (
                <TiStarHalfOutline key={i} size={Star_Size || 20}/>
            ))
        }
        
        {
            [...new Array(starCount.empty)].map((_, i) => (
                <TiStarOutline key={i} size={Star_Size || 20}/>
            ))
        }
    </div>
  )
}

export default RatingStar