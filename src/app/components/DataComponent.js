// components/DataComponent.js

import { useEffect, useState } from 'react';
import { db } from '../config/firebase'; // Mengimpor objek db dari file konfigurasi Firebase
import { collection, query, where, getDocs } from 'firebase/firestore'; // Mengimpor fungsi-fungsi dari Firestore SDK

const DataComponent = ({ title }) => { // Menerima prop title
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Membuat query untuk mendapatkan dokumen dengan kondisi 'category' sama dengan nilai title
                const q = query(collection(db, 'tempat_wisata'), where('category', '==', title));
                const querySnapshot = await getDocs(q); // Mengambil snapshot hasil query
                const fetchedData = [];
                querySnapshot.forEach((doc) => {
                    fetchedData.push(doc.data()); // Mengumpulkan data dari setiap dokumen
                });
                setData(fetchedData); // Mengatur data ke dalam state
            } catch (error) {
                console.error('Gagal mengambil data:', error);
            }
        };

        fetchData();
    }, [title]); // Menambahkan title ke dalam dependency array useEffect

    return (
        <div>
            <h2>Data:</h2>
            <div style={{ border: '1px solid black', padding: '10px', margin: '10px' }}>
                {data.map((item, index) => (
                    <div key={index}>
                        <p>Nama Field: {item.name}</p>
                        {/* Ganti 'namaField' dengan nama field yang sesuai dari dokumen Firestore */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DataComponent;
