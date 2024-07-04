import { useState, useEffect } from 'react';

const TransactionsUser = ({ userEmail }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions?userEmail=${userEmail}`);
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userEmail]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data Transaksi</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">TANGGAL & WAKTU</th>
              <th className="px-4 py-2 border-b">ORDER ID</th>
              <th className="px-4 py-2 border-b">JENIS TRANSAKSI</th>
              <th className="px-4 py-2 border-b">CHANNEL</th>
              <th className="px-4 py-2 border-b">STATUS</th>
              <th className="px-4 py-2 border-b">NILAI</th>
              <th className="px-4 py-2 border-b">E-MAIL PELANGGAN</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.transaction_id} className="border-b">
                <td className="px-4 py-2">{transaction.transaction_time}</td>
                <td className="px-4 py-2">{transaction.transaction_id}</td>
                <td className="px-4 py-2">{transaction.payment_type}</td>
                <td className="px-4 py-2">{transaction.channel}</td>
                <td className="px-4 py-2">{transaction.transaction_status}</td>
                <td className="px-4 py-2">{transaction.gross_amount}</td>
                <td className="px-4 py-2">{transaction.userEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionsUser;
