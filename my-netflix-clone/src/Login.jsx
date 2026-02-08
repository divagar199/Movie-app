import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter a valid email and password.');
      return;
    }

    try {
      // ✅ FIX 3: Added "/login" to the end of the URL
      const response = await axios.post('https://netflix-backend-g548.onrender.com/api/login', {
        email,
        password
      });

      if (response.data.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <div className="relative h-screen w-full bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="bg-black/60 w-full h-full">
        <div className="px-6 py-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix Logo" className="h-10" />
        </div>
        <div className="flex justify-center items-center h-[80vh]">
          <div className="bg-black/75 p-16 rounded-md w-full max-w-md text-white">
            <h1 className="text-3xl font-bold mb-8">Login</h1>
            {error && <div className="bg-[#e87c03] p-3 rounded text-sm mb-4">{error}</div>}
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input type="text" placeholder="Email" className="p-4 bg-[#333] rounded text-white" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" className="p-4 bg-[#333] rounded text-white" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="bg-[#e50914] py-3 rounded font-bold mt-6 hover:bg-[#c11119] transition">Login</button>
            </form>
            <div className="mt-16 text-[#737373]">
              New to Netflix? <Link to="/signup" className="text-white hover:underline">Sign up now.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;