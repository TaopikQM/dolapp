import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
       
             <div className="bg-green-500 text-white p-4 rounded-lg text-center">
                  <h1 className="text-2xl font-bold">Terima Kasih!</h1>
                  <p>Transaksi Anda telah berhasil.</p>
                  <a href="http://localhost:3000/" className="underline">Kembali ke Beranda</a>
            </div>
    )
}

export default page
