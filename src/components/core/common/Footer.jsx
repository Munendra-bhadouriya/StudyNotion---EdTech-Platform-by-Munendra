import React from 'react'
import { FooterLink2 } from '../../../data/footer-links'
import FooterItem from '../../footer components/FooterItem';
import Logo from '../../../assets/Logo/Logo-Full-Light.png'
import FooterHeading from '../../footer components/FooterHeading'
import { PiFacebookLogoFill } from "react-icons/pi";
import { PiGoogleLogoFill } from "react-icons/pi";
import { PiTwitterLogoFill } from "react-icons/pi";
import { PiYoutubeLogoFill } from "react-icons/pi";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces"
];

const Plans = [
  "Paid memberships",
  "For students",
  "Business solutions "
];

const Community = [
  "Forums",
  "Chapters",
  "Events"
];

const Support = [
  "Help Center"
];

const Company = [
  "About",
  "Careers",
  "Affiliates"
];

const Footer = () => {
  return (
    <div className='bg-richblack-800 w-full'>
      <div className='relative mx-auto flex w-11/12 max-w-maxContent items-start justify-between'>
        
        <div className='flex w-[50%] items-center gap-12 py-[52px]'>
          
          <div className='flex w-full items-start justify-between pr-16'>
            <div className='flex flex-col gap-4'>
              <img src={Logo} className='w-42 h-8' />

              <FooterHeading text={"Company"} />

              <div className='flex flex-col gap-2'>
                {
                  Company.map((element, index) => {
                    return (
                      <FooterItem text={element} key={index}/>
                    )
                  })
                }
              </div>

              <div className='flex gap-3 text-richblack-400'>
                <PiFacebookLogoFill className='w-8 h-8 hover:text-richblack-100 transition-all duration-200 cursor-pointer'/>
                <PiGoogleLogoFill className='w-8 h-8 hover:text-richblack-100 transition-all duration-200 cursor-pointer'/>
                <PiTwitterLogoFill className='w-8 h-8 hover:text-richblack-100 transition-all duration-200 cursor-pointer'/>
                <PiYoutubeLogoFill className='w-8 h-8 hover:text-richblack-100 transition-all duration-200 cursor-pointer'/>
              </div>
              
            </div>
  
            <div className='flex flex-col gap-12'>
              <div className='flex flex-col gap-4'>
                <FooterHeading text={"Resources"} />
                <div className='flex flex-col gap-2'>
                  {
                    Resources.map((element, index) => {
                      return (
                        <FooterItem text={element} key={index}/>
                      )
                    })
                  }
                </div>
              </div>

              <div className='flex flex-col gap-4'>
                <FooterHeading text={"Support"} />
                <div className='flex flex-col gap-2'>
                  {
                    Support.map((element, index) => {
                      return (
                        <FooterItem text={element} key={index}/>
                      )
                    })
                  }
                </div>
              </div>
            </div>
                
            <div className='flex flex-col gap-12'>
              <div className='flex flex-col gap-4'>
                <FooterHeading text={"Plans"} />
                <div className='flex flex-col gap-2'>
                  {
                    Plans.map((element, index) => {
                      return (
                        <FooterItem text={element} key={index}/>
                      )
                    })
                  }
                </div>
              </div>

              <div className='flex flex-col gap-4'>
                <FooterHeading text={"Community"} />
                <div className='flex flex-col gap-2'>
                  {
                    Community.map((element, index) => {
                      return (
                        <FooterItem text={element} key={index}/>
                      )
                    })
                  }
                </div>
              </div>
            </div>

          </div>
        </div>
                  
        <div className='flex w-[50%] items-center gap-12 py-[52px]'>
          <div className='flex w-full items-start justify-between pl-16 border-l border-richblack-700'>
            
            {
              FooterLink2.map((element, index) => {
                return (
                  <div className='flex flex-col gap-3'>
                    <FooterHeading text={element.title} key={index}/>

                    {
                      element.links.map((item, i) => {
                        return (
                          <FooterItem text={item.title} linkto={item.link}/>
                        )
                      })
                    }
                  
                  </div>
                )
              })
            }
            
          </div>         
        </div>
      </div>

      <div className='border border-richblack-700 relative mx-auto flex w-11/12 max-w-maxContent items-start justify-between '></div>

      <div className='relative mx-auto flex w-11/12 max-w-maxContent items-center justify-between py-6'>
        <div className='flex gap-3 items-center justify-between font-medium divide-x-2 divide-richblack-600'>
            {
              BottomFooter.map((element, index) => {
                return (
                  <div className='flex items-start justify-start pl-2'>
                    <FooterItem text={element} key={index}/>
                  </div>
                )
              })
            }
        </div>

        <div className='text-base leading-6 text-richblack-400 hover:text-richblack-100 transition-all duration-200 cursor-pointer'>
          Developed by Munendra❤️
        </div>
          
      </div>
    </div>
  )
}

export default Footer