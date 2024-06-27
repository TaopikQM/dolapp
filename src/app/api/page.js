import { ref, set } from 'firebase/database';
import { rtdb } from '../../config/firebase';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const notification = req.body;

    // Log request body for debugging
    console.log('Notification received:', notification);

    // Reference to the transaction in the Realtime Database
    const transactionRef = ref(rtdb, 'transactions/' + notification.order_id);

    try {
      await set(transactionRef, {
        transaction_time: notification.transaction_time,
        transaction_status: notification.transaction_status,
        transaction_id: notification.transaction_id,
        status_message: notification.status_message,
        status_code: notification.status_code,
        signature_key: notification.signature_key,
        settlement_time: notification.settlement_time, // Add this line
        payment_type: notification.payment_type,
        order_id: notification.order_id,
        merchant_id: notification.merchant_id,
        gross_amount: notification.gross_amount,
        fraud_status: notification.fraud_status,
        expiry_time: notification.expiry_time, // Add this line
        currency: notification.currency,
        va_numbers: notification.va_numbers, // Add this line
        payment_amounts: notification.payment_amounts // Add this line
        // Add other fields as necessary
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
