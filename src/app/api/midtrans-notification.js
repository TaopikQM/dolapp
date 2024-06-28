import { ref, set } from 'firebase-admin/database';
import { rtdbAdmin } from '../../admin/firebaseAdmin';

export default async function handler(req, res) {
  console.log('Request received:', req.method, req.body);
  
  if (req.method === 'POST') {
    const notification = req.body;

    // Log request body
    console.log('Notification received:', JSON.stringify(notification, null, 2));

    // Validate required fields
    if (!notification.order_id) {
      console.error('Missing order_id');
      return res.status(400).send('Missing order_id');
    }

    const transactionRef = ref(rtdbAdmin, 'transactions/' + notification.order_id);

    try {
      await set(transactionRef, {
        transaction_time: notification.transaction_time,
        transaction_status: notification.transaction_status,
        transaction_id: notification.transaction_id,
        status_message: notification.status_message,
        status_code: notification.status_code,
        signature_key: notification.signature_key,
        settlement_time: notification.settlement_time,
        payment_type: notification.payment_type,
        order_id: notification.order_id,
        merchant_id: notification.merchant_id,
        gross_amount: notification.gross_amount,
        fraud_status: notification.fraud_status,
        currency: notification.currency,
        va_numbers: notification.va_numbers,
        payment_amounts: notification.payment_amounts,
      });
      console.log('Notification saved successfully');
      res.status(200).send('Notification saved successfully');
    } catch (error) {
      console.error('Error saving notification:', error);
      res.status(500).send('Internal Server Error');
    }
  } else {
    console.error('Method Not Allowed');
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
