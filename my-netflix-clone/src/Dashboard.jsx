import { useEffect, useState } from 'react';
import axios from 'axios';
import Row from './Row';

const Dashboard = () => {
  const [bannerMovie, setBannerMovie] = useState(null);
  const [allBannerMovies, setAllBannerMovies] = useState([]); 
  
  const API_KEY = "9d861649a6c41bf2474237b83de83687"; 
  const BASE_URL = "https://api.themoviedb.org/3";

  const requests = {
    fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  };


  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const movies = request.data.results;
      
      setAllBannerMovies(movies); 
      setBannerMovie(movies[Math.floor(Math.random() * movies.length)]); 
      return request;
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (allBannerMovies.length === 0) return;

    const interval = setInterval(() => {
      const randomMovie = allBannerMovies[Math.floor(Math.random() * allBannerMovies.length)];
      setBannerMovie(randomMovie);
    }, 5000); 

    return () => clearInterval(interval);
  }, [allBannerMovies]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="bg-[#111] min-h-screen text-white overflow-hidden">
      
      <div className="flex items-center justify-between p-4 px-8 fixed w-full z-50 bg-linear-to-b from-black to-transparent">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix" 
          className="h-6 md:h-8 cursor-pointer" 
        />
        <button 
          className="bg-[#e50914] text-white px-4 py-1 rounded font-bold hover:bg-[#c11119] transition"
          onClick={() => window.location.href = '/'}
        >
          Sign Out
        </button>
      </div>


      <header
        className="h-[60vh] md:h-[80vh] bg-cover bg-center object-contain relative text-white transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-transparent opacity-90"></div>

        <div className="relative ml-4 md:ml-12 pt-[20vh] md:pt-[30vh] h-47.5 z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold pb-1 max-w-2xl drop-shadow-lg">
            {bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}
          </h1>
          
          <div className="pt-4 flex gap-2">
            <button className="cursor-pointer text-black font-bold rounded px-6 py-2 bg-white hover:bg-[#e6e6e6] transition-all flex items-center gap-2">
             <a href="https://www.netflix.com/in/"  target='blank'> Play</a>
            </button>
            <button className="cursor-pointer text-white font-bold rounded px-6 py-2 bg-[rgba(109,109,110,0.7)] hover:bg-[rgba(109,109,110,0.5)] transition-all">
              <a href="https://www.netflix.com/in/" target='blank'> More Info</a>
            </button>
          </div>
          
          <h1 className="w-full md:w-180 leading-[1.3] pt-4 text-sm md:text-lg max-w-125 drop-shadow-md">
            {truncate(bannerMovie?.overview, 150)}
          </h1>
        </div>
        
        <div className="absolute w-full h-[7.4rem] bottom-0 bg-linear-to-t from-[#111] via-transparent to-transparent" />
      </header>

      <div className="-mt-24 relative z-20 pl-4 md:pl-8 pb-8 space-y-4">
          <Row title="NETFLIX ORIGINALS" fetchURL={requests.fetchNetflixOriginals} isLargeRow />
          <Row title="Trending Now" fetchURL={requests.fetchTrending} />
          <Row title="Top Rated" fetchURL={requests.fetchTopRated} />
          <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
          <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
          <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
          <Row title="Romance Movies" fetchURL={requests.fetchRomanceMovies} />
          <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} />
      </div>
    </div>
  );
};

export default Dashboard;