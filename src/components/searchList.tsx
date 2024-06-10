import React, { useState } from "react";

interface SearchListProps {
  coins: string[];
}

const SearchList: React.FC<SearchListProps> = ({ coins }) => {
  const [favoritesCoins, setFavoritesCoins] = useState<string[]>([]);
  const [displayFavorites, setDisplayFavorites] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');

  const toggleToFavorites = (newItem: string) => {
    if (favoritesCoins.includes(newItem)) {
      setFavoritesCoins(favoritesCoins.filter(item => item !== newItem));
    } else {
      setFavoritesCoins([...favoritesCoins, newItem]);
    }
  }

  const handleFavoritesCoins = () => {
    setDisplayFavorites(!displayFavorites);
  };

  const handleAllCoins = () => {
    setDisplayFavorites(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const filteredCoins = displayFavorites
    ? favoritesCoins.filter(coin => coin.toLowerCase().includes(searchText.toLowerCase()))
    : coins.filter(coin => coin.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className='list_container'>

      <div className="search_container">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
          <path fill="#fff" d="m19.485 20.154l-6.262-6.262q-.75.639-1.725.989t-1.96.35q-2.402 0-4.066-1.663T3.808 9.503T5.47 5.436t4.064-1.667t4.068 1.664T15.268 9.5q0 1.042-.369 2.017t-.97 1.668l6.262 6.261zM9.539 14.23q1.99 0 3.36-1.37t1.37-3.361t-1.37-3.36t-3.36-1.37t-3.361 1.37t-1.37 3.36t1.37 3.36t3.36 1.37"></path>
        </svg>
        <input type="text" placeholder='Search' value={searchText} onChange={handleSearch} />
        {searchText && (
          <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 40 40">
            <path fill="#fff" d="M21.499 19.994L32.755 8.727a1.064 1.064 0 0 0-.001-1.502c-.398-.396-1.099-.398-1.501.002L20 18.494L8.743 7.224a1.064 1.064 0 0 0-.001-1.502c-.398-.396-1.099-.398-1.501.002L20 18.494L8.743 7.224c-.4-.395-1.101-.393-1.499.002a1.05 1.05 0 0 0-.309.751c0 .284.11.55.309.747L18.5 19.993L7.245 31.263a1.064 1.064 0 0 0 .003 1.503c.193.191.466.301.748.301h.006c.283-.001.556-.112.745-.305L20 21.495l11.257 11.27c.199.198.465.308.747.308a1.058 1.058 0 0 0 1.061-1.061c0-.283-.11-.55-.31-.747z"></path>
          </svg>
        )}
      </div>

      <div className='topics'>
        <button className="favorites_btn" onClick={handleFavoritesCoins}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
            <path fill="#828282" d="m7.325 18.923l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.123 3.572l1.241 5.313L12 16.102z"></path>
          </svg>
          Favorites
        </button>
        <button className="allCoins_btn" onClick={handleAllCoins}>All coins</button>
      </div>

      <ul className="coins_list">
        {filteredCoins.map((coinName, index) => (
          <li key={index} className="coin_item">
            <svg
              onClick={() => toggleToFavorites(coinName)}
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24">
              {!favoritesCoins.includes(coinName) 
                ? <path fill="#828282"d="m8.85 16.825l3.15-1.9l3.15 1.925l-.825-3.6l2.775-2.4l-3.65-.325l-1.45-3.4l-1.45 3.375l-3.65.325l2.775 2.425zm-1.525 2.098l1.24-5.313l-4.123-3.572l5.431-.47L12 4.557l2.127 5.01l5.43.47l-4.123 3.572l1.241 5.313L12 16.102zM12 12.25"/>
                :  <path fill="#828282" d="M 7.325 18.923 L 8.565 13.61 L 4.442 10.038 L 9.873 9.568 L 12 4.557 L 14.127 9.567 L 19.557 10.037 L 15.434 13.609 L 16.675 18.922 L 12 16.102 L 7.325 18.923 Z M 12 12.25"></path>
              }
            </svg>
            {coinName}
          </li>
        ))}
      </ul>

    </div>
  )
}

export default SearchList;
