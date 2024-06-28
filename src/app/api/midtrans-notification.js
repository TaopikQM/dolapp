import { ref, set } from 'firebase-admin/database';
import { rtdb } from '../../config/firebase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const notification = req.body;

    // Log request body
    console.log('Notification received:', notification);

    // Validate required fields
    if (!notification.order_id) {
      console.error('Missing order_id');
      return res.status(400).send('Missing order_id');
    }

    const transactionRef = ref(rtdb, 'transactions/' + notification.order_id);

    try {
      await set(transactionRef, {
        transaction_time: notification.waktu_transaksi,
        transaction_status: notification.status_transaksi,
        transaction_id: notification.transaction_id,
        status_message: notification.status_message,
        status_code: notification.kode_status,
        signature_key: notification.kunci_tandatangan,
        settlement_time: notification.waktu_kedaluwarsa,
        payment_type: notification.jenis_pembayaran,
        order_id: notification.order_id,
        merchant_id: notification.id_pedagang,
        gross_amount: notification.jumlah_kotor,
        fraud_status: notification.fraud_status,
        currency: notification.mata_uang,
        va_numbers: notification.va_numbers,
        payment_amounts: notification.payment_amounts,
      });
      res.status(200).send('Notification saved successfully');
    } catch (error) {
      console.error('Error saving notification:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
