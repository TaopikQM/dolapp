

import useAuth from '../hooks/useAuth';

const SecurePage = () => {
  const user = useAuth();

  if (!user) {
    return null; // Atau loading spinner
  }

  return (
    <div>
      <h1>Halaman Terlindungi</h1>
      <p>Selamat datang, {user.displayName}!</p>
    </div>
  );
};

export default SecurePage;
