import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-b from-gradientblue via-gradientlightblue to-gradientgreen bg-clip-text text-transparent'>  {/*Add gradient here*/}
        {text}
    </span>
  )
}

export default HighlightText