import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='flex flex-col justify-center items-center min-h-screen gap-4'>
            <h3 className='text-center'>Terimakasih telah melakukan pembayaran</h3>
            <Link href="http://localhost:3000/" className="text-center">Kembali</Link>
        </div>
    )
}

export default page