import { ref, set } from 'firebase/database';
import { rtdb } from '../../config/firebase';


export default async function handler(req, res) {
  if (req.method === 'POST') {
    const notification = req.body;

    // Log request body (bisa diganti dengan penyimpanan ke database)
    console.log('Notification received:', notification);

    const transactionRef = ref(rtdb, 'transactions/' + notification.order_id);

   try {
      await  set(transactionRef,{
        transaction_time: notification.transaction_time,
        transaction_status: notification.transaction_status,
        transaction_id: notification.transaction_id,
        status_message: notification.status_message,
        status_code: notification.status_code,
        signature_key: notification.signature_key,
        payment_type: notification.payment_type,
        order_id: notification.order_id,
        merchant_id: notification.merchant_id,
        masked_card: notification.masked_card,
        gross_amount: notification.gross_amount,
        fraud_status: notification.fraud_status,
        eci: notification.eci,
        currency: notification.currency,
        channel_response_message: notification.channel_response_message,
        channel_response_code: notification.channel_response_code,
        card_type: notification.card_type,
        bank: notification.bank,
        approval_code: notification.approval_code
        // field lainnya jika diperlukan
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
