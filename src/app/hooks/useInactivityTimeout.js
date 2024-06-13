import { useEffect, useRef } from 'react';

const useInactivityTimeout = (timeout = 7200 * 1000) => { // 7200 detik = 2 jam
  const timerRef = useRef(null);

  const logout = () => {
    // Logika logout Anda
    console.log('Logging out...');
    // Lakukan tindakan logout seperti menghapus token autentikasi
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      alert('Anda telah tidak aktif selama 2 jam. Anda akan diarahkan ke halaman login.');
      logout();
      window.location.href = '/login'; // Redirect users to the login page
    }, timeout);
  };

  useEffect(() => {
    const events = ['mousemove', 'keydown', 'click'];
    const eventHandler = () => resetTimer();

    events.forEach((event) => {
      window.addEventListener(event, eventHandler);
    });

    // Set timer pertama kali
    resetTimer();

    return () => {
      // Hapus event listener dan timer saat komponen dibongkar
      events.forEach((event) => {
        window.removeEventListener(event, eventHandler);
      });
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeout]);
};

export default useInactivityTimeout;
