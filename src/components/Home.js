import { useEffect, useState } from 'react';
import Header from './Header.js';
import TopAiring from './TopAiring.js';
import AnimeTrailer from './AnimeTrailer.js';
import Searched from './Searched.js';
import HeadingText from './HeadingText.js';
import React from 'react';
import { AnimeInfo } from './AnimeInfo.js';

function Home({login, Setlogin}) {
  const [topAnime, SetTopAnime] = useState([]);
  const [animeList, SetAnimeList] = useState([]);
  const [search, SetSearch] = useState('');
  const [searchStatus, SetSearchStatus] = useState(true);
  const [animeInfo,setAnimeInfo]=useState('')
  const GetTopAnime = async () => {
    const response = await fetch('https://api.jikan.moe/v4/top/anime').then(
      (res) => res.json()
    );
    SetTopAnime(response.data);
  };

  const HandleSearch = (e) => {
    e.preventDefault();
    SetSearchStatus(false);
    FetchAnime(search);
  };

  const FetchAnime = async (query) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&limit=10`
    ).then((res) => res.json());
    SetAnimeList(response.data);
  };

  useEffect(() => {
    GetTopAnime();
    return () => {
      GetTopAnime();
    };
  }, []);

  return (
    <div>
      <AnimeTrailer topAnime={topAnime} />
      <Header
        HandleSearch={HandleSearch}
        search={search}
        SetSearch={SetSearch}
        animeList={animeList}
        SetSearchStatus={SetSearchStatus}
        login={login}
        Setlogin={Setlogin}
      />
      
      { animeInfo && <AnimeInfo animeInfo={animeInfo}/>}
      {searchStatus ? (
        <div>
          
          <HeadingText text='Top Anime' />
          <TopAiring topAnime={topAnime}
          setAnimeInfo={setAnimeInfo} />
          
          </div>
      ) : (
        <div>
          <Searched search={search} animeList={animeList} />
        </div>
      )}
    </div>
  );
}

export default Home;
