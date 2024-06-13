// src/app/tempat-wisata/[[...id]].js

import db from '../../firebase';

const TempatWisataDetails = ({ params }) => {
  const { id } = params;
  const [tempat, setTempat] = useState({});

  useEffect(() => {
    db.ref(`tempat_wisata/${id}`).on('value', (snapshot) => {
      const data = snapshot.val();
      setTempat(data);
    });
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>{tempat.nama}</title>
      </Head>
      <h1 className="text-3xl font-bold mb-4">{tempat.nama}</h1>
      <p className="text-gray-600">{tempat.lokasi}</p>
      <p className="text-gray-600">{tempat.deskripsi}</p>
    </div>
  );
};

export default TempatWisataDetails;