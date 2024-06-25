

"use client";

{/*"use client";

import React, { useState } from "react";
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "../../config/firebase";
import Link from 'next/link';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User berhasil login!");
      console.log("UID:", user.uid);
      console.log("Display Name:", user.displayName);
      console.log("Email:", user.email);
      console.log("Phone Number:", user.phoneNumber);
      console.log("Photo URL:", user.photoURL);
      localStorage.setItem('user', JSON.stringify(user)); // Simpan data pengguna ke localStorage
      console.log("User data stored:", user);
        
      window.location.href = "/"; // Redirect to the profile page after successful login
    
      //window.location.href = "/"; // Redirect to the home page after successful login
    } catch (error) {
      console.error("Error logging in with email and password", error);
      alert("Failed to login. Please check your credentials and try again.");
    }
  };
  
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log("User berhasil login!");
      console.log("UID:", user.uid);
      console.log("Display Name:", user.displayName);
      console.log("Email:", user.email);
      console.log("Phone Number:", user.phoneNumber);
      console.log("Photo URL:", user.photoURL);
      localStorage.setItem('user', JSON.stringify(user)); // Simpan data pengguna ke localStorage
      console.log("User data stored:", user);
        
      window.location.href = "/"; // Redirect to the profile page after successful login
    
      //window.location.href = "/"; // Redirect to the home page after successful login
    } catch (error) {
      console.error("Error logging in with Google", error);
      alert("Failed to login with Google. Please try again.");
    }
  };
  

  return (
    <div className="bg-white flex justify-center items-center min-h-screen">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img src="/img/Logo.png" alt="Dolanrek Logo" className="h-14 mb-6" />
          <p className="text-center text-2xl mb-4 [font-family:'Poppins-Medium',Helvetica] font-medium text-[#424242] text-[18px] tracking-[0] leading-[normal]">Masuk dengan Akun yang sudah terdaftar</p>
          <div className="w-full">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
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
            </div>
            <div className="mb-6">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              onClick={handleLogin}
              >
                Masuk
              </button>
            </div>
            <div className="mb-4 flex items-center justify-center">
              <span className="text-gray-500">atau masuk dengan</span>
            </div>
            <div className="mb-4">
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg flex items-center justify-center hover:bg-gray-200"
              onClick={handleGoogleLogin}
              >
              
              <img src="../google.svg" alt="logo google" className="h-6 mr-3" />
                Masuk dengan Google
              </button>
            </div>
            <div className="flex justify-between">
              <Link href="#" className="text-blue-600 hover:underline">Lupa?</Link>
              <Link href="/auth/sigup/" className="text-blue-600 hover:underline">Buat Akun</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
*/}

{/*"use client";

import React, { useState } from "react";
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "../../config/firebase";
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User berhasil login!");
      console.log("UID:", user.uid);
      console.log("Display Name:", user.displayName);
      console.log("Email:", user.email);
      console.log("Phone Number:", user.phoneNumber);
      console.log("Photo URL:", user.photoURL);
      
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      };

      localStorage.setItem('user', JSON.stringify(userData)); // Simpan data pengguna ke localStorage
      console.log("User data stored:", userData);
        
      window.location.href = "/"; // Redirect to the home page after successful login
    } catch (error) {
      console.error("Error logging in with email and password", error);
      alert("Failed to login. Please check your credentials and try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log("User berhasil login!");
      console.log("UID:", user.uid);
      console.log("Display Name:", user.displayName);
      console.log("Email:", user.email);
      console.log("Phone Number:", user.phoneNumber);
      console.log("Photo URL:", user.photoURL);

      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      };

      localStorage.setItem('user', JSON.stringify(userData)); // Simpan data pengguna ke localStorage
      console.log("User data stored:", userData);
        
      window.location.href = "/"; // Redirect to the home page after successful login
    } catch (error) {
      console.error("Error logging in with Google", error);
      alert("Failed to login with Google. Please try again.");
    }
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img src="/img/Logo.png" alt="Dolanrek Logo" className="h-14 mb-6" />
          <p className="text-center text-2xl mb-4 [font-family:'Poppins-Medium',Helvetica] font-medium text-[#424242] text-[18px] tracking-[0] leading-[normal]">Masuk dengan Akun yang sudah terdaftar</p>
          <div className="w-full">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
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
            </div>
            <div className="mb-6">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" onClick={handleLogin}>
                Masuk
              </button>
            </div>
            <div className="mb-4 flex items-center justify-center">
              <span className="text-gray-500">atau masuk dengan</span>
            </div>
            <div className="mb-4">
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg flex items-center justify-center hover:bg-gray-200" onClick={handleGoogleLogin}>
                <img src="../google.svg" alt="logo google" className="h-6 mr-3" />
                Masuk dengan Google
              </button>
            </div>
            <div className="flex justify-between">
              <Link href="#" className="text-blue-600 hover:underline">Lupa?</Link>
              <Link href="/auth/signup" className="text-blue-600 hover:underline">Buat Akun</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;*/}

import React, { useState } from "react";
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "../../config/firebase";
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('lastActivity', Date.now());
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging in with email and password", error);
      alert("Failed to login. Please check your credentials and try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      };

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('lastActivity', Date.now());
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging in with Google", error);
      alert("Failed to login with Google. Please try again.");
    }
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img src="/img/Logo.png" alt="Dolanrek Logo" className="h-14 mb-6" />
          <p className="text-center text-2xl mb-4">Masuk dengan Akun yang sudah terdaftar</p>
          <div className="w-full">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
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
            </div>
            <div className="mb-6">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" onClick={handleLogin}>
                Masuk
              </button>
            </div>
            <div className="mb-4 flex items-center justify-center">
              <span className="text-gray-500">atau masuk dengan</span>
            </div>
            <div className="mb-4">
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg flex items-center justify-center hover:bg-gray-200" onClick={handleGoogleLogin}>
                <img src="../google.svg" alt="logo google" className="h-6 mr-3" />
                Masuk dengan Google
              </button>
            </div>
            <div className="flex justify-between">
              <Link href="#" className="text-blue-600 hover:underline">Lupa?</Link>
              <Link href="/auth/sigup" className="text-blue-600 hover:underline">Buat Akun</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

{/**"use client";

import React, { useState } from "react";
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "../../config/firebase";
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User berhasil login!");
      console.log("UID:", user.uid);
      console.log("Display Name:", user.displayName);
      console.log("Email:", user.email);
      console.log("Phone Number:", user.phoneNumber);
      console.log("Photo URL:", user.photoURL);
      
      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      };

      localStorage.setItem('user', JSON.stringify(userData)); // Simpan data pengguna ke localStorage
      console.log("User data stored:", userData);
        
      window.location.href = "/"; // Redirect to the home page after successful login
    } catch (error) {
      console.error("Error logging in with email and password", error);
      alert("Failed to login. Please check your credentials and try again.");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log("User berhasil login!");
      console.log("UID:", user.uid);
      console.log("Display Name:", user.displayName);
      console.log("Email:", user.email);
      console.log("Phone Number:", user.phoneNumber);
      console.log("Photo URL:", user.photoURL);

      const userData = {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
      };

      localStorage.setItem('user', JSON.stringify(userData)); // Simpan data pengguna ke localStorage
      console.log("User data stored:", userData);
        
      window.location.href = "/"; // Redirect to the home page after successful login
    } catch (error) {
      console.error("Error logging in with Google", error);
      alert("Failed to login with Google. Please try again.");
    }
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <img src="/img/Logo.png" alt="Dolanrek Logo" className="h-14 mb-6" />
          <p className="text-center text-2xl mb-4">Masuk dengan Akun yang sudah terdaftar</p>
          <div className="w-full">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
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
            </div>
            <div className="mb-6">
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700" onClick={handleLogin}>
                Masuk
              </button>
            </div>
            <div className="mb-4 flex items-center justify-center">
              <span className="text-gray-500">atau masuk dengan</span>
            </div>
            <div className="mb-4">
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg flex items-center justify-center hover:bg-gray-200" onClick={handleGoogleLogin}>
                <img src="../google.svg" alt="logo google" className="h-6 mr-3" />
                Masuk dengan Google
              </button>
            </div>
            <div className="flex justify-between">
              <Link href="#" className="text-blue-600 hover:underline">Lupa?</Link>
              <Link href="/auth/signup" className="text-blue-600 hover:underline">Buat Akun</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
 */}