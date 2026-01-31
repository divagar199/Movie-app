import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/signup', {
        email,
        password
      });

      if (response.data.success) {
        alert("Account created! Please log in.");
        navigate('/'); 
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Signup failed. Try again.');
      }
    }
  };

  return (
    <div className="relative h-screen w-full bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="bg-black/60 w-full h-full">
      
        <div className="flex justify-between items-center px-6 py-6">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Logo" className="h-8 md:h-10" />
          <Link to="/" className="text-white bg-[#e50914] px-4 py-1 rounded font-bold text-sm">Sign In</Link>
        </div>


        <div className="flex justify-center items-center h-[80vh]">
          <div className="bg-black/75 p-16 rounded-md w-full max-w-md text-white">
            <h1 className="text-3xl font-bold mb-8">Sign Up</h1>
            
            {error && <div className="bg-[#e87c03] p-3 rounded text-sm mb-4">{error}</div>}

            <form onSubmit={handleSignup} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email address"
                className="p-4 bg-[#333] rounded text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Create Password"
                className="p-4 bg-[#333] rounded text-white focus:outline-none focus:ring-1 focus:ring-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              
              <button type="submit" className="bg-[#e50914] py-3 rounded font-bold mt-4 hover:bg-[#c11119] transition">
                Sign Up
              </button>
            </form>

            <div className="mt-8 text-[#737373]">
              Already have an account? <Link to="/" className="text-white hover:underline">Login now.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;