import Link from 'next/link';

const HelpCenter = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6 relative">
      <div>
        <div className="bg-blue-500 text-white py-4 text-center rounded-lg">
          <h1 className="text-3xl font-bold">FAQ</h1>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Informasi Umum</h2>
          <div className="mb-6">
            <p className="text-lg font-medium">Apakah Dolanrek menyediakan informasi wisata seluruh Indonesia?</p>
            <hr className="my-4" />
          </div>
          {/* Add more questions in similar blocks as above */}
          <div className="mb-6">
            <p className="text-lg font-medium">Dimana saja Dolanrek bisa diakses?</p>
            <hr className="my-4" />
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/more-articles">
            <a className="text-blue-500 font-medium">Lihat artikel lainnya</a>
          </Link>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Pemesanan dan Pembayaran</h2>
          <div className="mb-6">
            <p className="text-lg font-medium">Apakah bisa memesan tiket wisata melalui Dolanrek?</p>
            <hr className="my-4" />
          </div>
          {/* Add more questions in similar blocks as above */}
          <div className="mb-6">
            <p className="text-lg font-medium">Apakah bisa melakukan pembayaran dengan transfer bank?</p>
            <hr className="my-4" />
          </div>
        </div>
        <div className="text-center mt-6">
          <Link href="/more-articles">
            <a className="text-blue-500 font-medium">Lihat artikel lainnya</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
