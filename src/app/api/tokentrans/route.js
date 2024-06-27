{/*import Midtrans from "midtrans-client";
import { v4 as uuidv4 } from 'uuid';

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT
});

export async function POST(request) {
  try {
    const { id, placeName, price, quantity, visitDate, userName, userEmail } = await request.json();

    // Log incoming request data
    console.log('Received data:', { id, placeName, price, quantity, visitDate, userName, userEmail });

    // Validate the input data
    if (!id || !placeName || !price || !quantity || !visitDate || !userName || !userEmail) {
      //console.error('Missing required fields:', { id, placeName, price, quantity, visitDate, userName, userEmail });
      throw new Error('Missing required fields');
    }

    // Ensure order_id is unique and not too long
    const uniqueOrderId = `${id}.-${uuidv4()}`.slice(0, 50);

    let parameter = {
      transaction_details: {
        order_id: uniqueOrderId,
        gross_amount: price * quantity
      },
      item_details: [{
        id: id,
        name: placeName,
        price: price,
        quantity: quantity
      }],
      customer_details: {
        first_name: userName,
        email: userEmail
      }
    };

    // Log parameters before making transaction
   /// console.log('Transaction parameters:', parameter);

    const transaction = await snap.createTransaction(parameter);
    const token = transaction.token;

   // console.log('Transaction token:', token);
    return new Response(JSON.stringify({ token }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    //console.error('Error creating transaction:', error.message);
    return new Response(JSON.stringify({ error: 'Transaction creation failed', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
*/}
import Midtrans from "midtrans-client";
import { v4 as uuidv4 } from 'uuid';
import { ref, set } from 'firebase/database';
import { rtdb } from '../../config/firebase'; // Sesuaikan dengan konfigurasi Firebase Anda

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: process.env.SECRET,
  clientKey: process.env.NEXT_PUBLIC_CLIENT
});

export async function POST(request) {
  try {
    const { id, placeName, price, quantity, visitDate, userName, userEmail } = await request.json();

    // Log incoming request data
    console.log('Received data:', { id, placeName, price, quantity, visitDate, userName, userEmail });

    // Validate the input data
    if (!id || !placeName || !price || !quantity || !visitDate || !userName || !userEmail) {
      throw new Error('Missing required fields');
    }

    // Ensure order_id is unique and not too long
    const uniqueOrderId = `${id}dol${uuidv4()}`.slice(0, 50);

    let parameter = {
      transaction_details: {
        order_id: uniqueOrderId,
        gross_amount: price * quantity
      },
      item_details: [{
        id: id,
        name: placeName,
        price: price,
        quantity: quantity,
        visitDate: visitDate
      }],
      customer_details: {
        first_name: userName,
        email: userEmail
      }
    };

    // Log parameters before making transaction
    console.log('Transaction parameters:', parameter);

    // Create transaction with Midtrans
    const transaction = await snap.createTransaction(parameter);
    const token = transaction.token;

    // Save received data and transaction_details to Firebase
    const transactionData = {
      receivedData: {
        id, placeName, price, quantity, visitDate, userName, userEmail
      },
      transactionDetails: parameter.transaction_details
    };

    const transactionRef = ref(rtdb, 'transactions/' + uniqueOrderId);
    await set(transactionRef, transactionData);

    // Return response with token and orderId
    return new Response(JSON.stringify({ token, orderId: uniqueOrderId }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    // Handle errors
    console.error('Transaction creation failed:', error);
    return new Response(JSON.stringify({ error: 'Transaction creation failed', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
