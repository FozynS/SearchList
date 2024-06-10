import React, { useEffect, useState } from 'react';
import SearchInput from './components/searchInput';
import SearchList from './components/searchList';
import './App.css';


const App: React.FC = () => {
  const [onSubmit, setOnSubmit] = useState<boolean>(false);
  const [coins, setCoins] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await fetch('https://api-eu.okotoki.com/coins');
        const data: string[] = await response.json();
        const filteredCoins = data.filter(coin => coin.trim() !== '');
        const sortedCoins = filteredCoins.sort((a, b) => a.localeCompare(b));
        setCoins(sortedCoins);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    }
    fetchData();
  }, []);


  return (
    <>
      <div className='container'>
        <SearchInput 
          onSubmit={onSubmit}
          setSubmit={setOnSubmit}
        />
        {onSubmit && coins ? (
          <SearchList coins={coins}/>
        ) : null}
      </div>
    </>
  );
}

export default App;
