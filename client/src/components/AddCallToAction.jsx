import { Button } from 'flowbite-react'
import React from 'react'

export default function AddCallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center 
    items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className='flex-1 flex flex-col justify-center'>
            <h2 className='text-2xl'>Want to learn Javascript from scratch?</h2>

            <p className='text-gray-500 my-2'>Checkout this resourse</p>

            <Button outline className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.w3schools.com/Js/" target='_blank' rel='noopener noreferrer'>
                learn more
                </a>
            </Button>
        </div>

        <div className='p-7 flex-1'>
            <img src='https://tse1.mm.bing.net/th/id/OIP.BvhW31yMZtBMIPMGUwHTUAHaEK?cb=thfvnextfalcon2&rs=1&pid=ImgDetMain&o=7&rm=3'/>
        </div>
    </div>
  )
}
