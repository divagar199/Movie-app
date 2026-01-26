import { useEffect, useState } from 'react';
import axios from 'axios';
import Row from './Row'; 

const Dashboard = () => {
  const [bannerMovie, setBannerMovie] = useState([]);
  
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
      setBannerMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  return (
    <div className="bg-[#111] min-h-screen text-white overflow-hidden">
      
      <div className="flex items-center justify-between p-4 px-8 fixed w-full z-50 bg-gradient-to-b from-black to-transparent">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" 
          alt="Netflix" 
          className="h-6 md:h-8 cursor-pointer" 
        />
        <button 
          className="bg-[#e50914] text-white px-4 py-1 rounded font-bold hover:bg-[#c11119]"
          onClick={() => window.location.href = '/'}
        >
          Sign Out
        </button>
      </div>

      <header
        className="h-[60vh] md:h-[80vh] bg-cover bg-center object-contain relative text-white"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${bannerMovie?.backdrop_path}")`,
          backgroundPosition: "center center",
        }}
      >
        <div className="ml-8 pt-[20vh] h-[190px]">
          <h1 className="text-5xl font-extrabold pb-1">
            {bannerMovie?.title || bannerMovie?.name || bannerMovie?.original_name}
          </h1>
          <div className="pt-4">
            <button className="cursor-pointer text-black outline-none border-none font-bold rounded px-8 py-2 mr-4 bg-white hover:bg-[#e6e6e6] transition-all">
              <a href="https://www.netflix.com/in/" target="_blank">Play</a>
            </button>
            <button className="cursor-pointer text-white outline-none border-none font-bold rounded px-8 py-2 bg-[rgba(109,109,110,0.7)] hover:bg-[rgba(109,109,110,0.4)] transition-all">
              <a href="https://www.netflix.com/in/" target="_blank">My List</a>
            </button>
          </div>
          <h1 className="w-[45rem] leading-[1.3] pt-4 text-sm max-w-[360px] h-[80px] truncate">
            {bannerMovie?.overview}
          </h1>
        </div>
        <div className="absolute w-full h-[7.4rem] bottom-0 bg-gradient-to-t from-[#111] via-transparent to-transparent" />
      </header>

      <div className="-mt-32 relative z-10 pl-4">
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