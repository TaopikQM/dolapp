"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Link  from 'next/link';
import { ref, set } from 'firebase/database';

import { auth , rtdb} from "../../config/firebase";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    // Pastikan hanya menerima angka
    if (/^\d*$/.test(inputValue)) {
      setPhone(inputValue);
    }
  };
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  
    // Validasi password
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[a-zA-Z]).{8,}$/;
    if (!regex.test(newPassword)) {
      setPasswordError("Password harus terdiri dari huruf kecil, huruf besar, angka, dan karakter khusus, minimal 8 karakter.");
    } else {
      setPasswordError("");
    }
  };
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSignup = async () => {
    // Memeriksa apakah ada input yang kosong
    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("Semua inputan harus diisi!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    } else {
      setPasswordError("");
    }

    // Memeriksa format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Format email tidak valid!");
      return;
    }

    // Memeriksa format password (minimal 8 karakter, huruf besar, huruf kecil, dan angka)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert("Password harus terdiri dari minimal 8 karakter, setidaknya satu huruf besar, satu huruf kecil, dan satu angka!");
      return;
    }

    try {
      console.log("Mencoba mendaftar...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Berhasil mendaftar!", userCredential);
      const user = userCredential.user;
      
      // Simpan data tambahan di Realtime Database
      const userId = user.uid;
      const userRef = ref(rtdb, `users/${userId}`);
      const currentTime = new Date().toISOString();
      await set(userRef, {
        displayName: name,
        phoneNumber: phone,
        signupTime: currentTime
      });
      
      // Redirect ke halaman utama setelah pendaftaran berhasil
      alert("Pendaftaran berhasil!");
      window.location.href = "/"; // Redirect to the home page after successful signup
    } catch (error) {
      console.error("Error signing up with email and password", error);
      if (error.code === "auth/email-already-in-use") {
        alert("Email sudah digunakan oleh pengguna lain. Silakan gunakan email lain.");
      } 
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "/"; // Redirect to the home page after successful signup
    } catch (error) {
      console.error("Error signing up with Google", error);
      alert("Failed to sign up with Google. Please try again.");
    }
  };

  
  return (
    <div className="bg-white flex justify-center items-center min-h-screen">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img src="/img/Logo.png" alt="Dolanrek Logo" className="h-14 mb-6" />
          <p className="text-center text-2xl mb-4 [font-family:'Poppins-Medium',Helvetica] font-medium text-[#424242] text-[18px] tracking-[0] leading-[normal]">Buat Akun Anda</p>
          <div className="w-full">
            <div className="mb-4">
              <input
                type="nama"
                value={name}
                onChange={handleNameChange}
                placeholder="Nama"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="tel"
                pattern="[0-9]{10}"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="No.Telepon"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
           
            </div>
            <div className="mb-4">
              <input
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Ulangi Password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-6">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={handleSignup}
              >
                Daftar
              </button>
            </div>
            <div className="mb-4 flex items-center justify-center">
              <span className="text-gray-500">atau masuk dengan</span>
            </div>
            <div className="mb-4">
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg flex items-center justify-center hover:bg-gray-200"
              onClick={handleGoogleSignup}
              >
              
              <img src="../google.svg" alt="logo google" className="h-6 mr-3" />
                Daftar dengan Google
              </button>
            </div>
            <div className="flex justify-center">
                <p>Sudah Punya Akun?</p>
            <Link href="/auth/login" className="text-blue-600 hover:underline">Klik Disini</Link>
               </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
