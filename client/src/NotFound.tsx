import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NotFound() {
  const {t} = useTranslation()

  return (
    <div className='flex flex-col justify-center items-center mt-16'>
      <h2 className='text-3xl font-sans text-red-600 font-bold'>404 Not Found</h2>
      <div className='mt-4'>
      <Link to="/">
        <div className="mt-8">
           <button
             id="backToHomeButton"
             type="submit"
             className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
           >
             {t('homeBtn')}
           </button>
         </div>
      </Link>
      </div>
    </div>
  )
}
