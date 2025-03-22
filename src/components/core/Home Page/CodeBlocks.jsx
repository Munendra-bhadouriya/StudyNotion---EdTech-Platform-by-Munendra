import React from 'react'
import CTAButton from './Button'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = (
    {position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor}
) => {
  return (
    <div className={`flex ${position} my-20 justify-between items-center`}>
          {/*section 1*/}
          <div className='w-[50%] flex flex-col gap-8'>
              
            {heading}
            
            <div className='text-richblack-300 font-semibold'>
                {subheading}
            </div>

            <div className='flex gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight/>
                    </div>
                </CTAButton>
                
                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    {ctabtn2.btnText}
                </CTAButton>
            </div>
          </div>

          <div  className="relative bg-cover bg-center">
              
            <div className={`
                absolute
                top-0 left-0
                w-[372.95px] h-[257.05px]
                ${backgroundGradient}
                backdrop-blur-[68px]
                opacity-20
                `}>
            </div>

            {/*section 2*/}
            <div className='h-fit flex flex-row w-[50%] lg:w-[550px] py-4 font-mono bg-gradient-to-b from-[rgba(14,26,45,0.24)] to-[rgba(17,30,50,0.38)]
            border-[2px] border-transparent rounded-lg [border-image:linear-gradient(90deg,rgba(255,255,255,0.22),rgba(255,255,255,0))_1]
            backdrop-blur-[52px]'>            
                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-bold gap-[6px]'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation 
                        sequence={[codeblock, 10000, ""]}
                        repeat={Infinity}
                        style={
                            {
                                whiteSpace: "pre-line",
                                display: "block" 
                            }
                        }
                        omitDeletionAnimation
                    />
                </div>
            </div>
          </div>
          
    </div>
  )
}

export default CodeBlocks