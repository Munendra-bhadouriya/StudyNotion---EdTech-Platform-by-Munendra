import React from 'react'

const IconBtn = ({

    text,
    onclick,
    children,
    disabled,
    outline = false,
    cutsomClasses,
    type

}) => {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={cutsomClasses}
      >
        {
              children ? (
                  <div className='flex items-center justify-center gap-2 py-2 px-4'>
                    <span>
                        {text}
                    </span>
                    <span>{children}</span>
                  </div>
              ) : (text) 
        }
    </button>
  )
}

export default IconBtn