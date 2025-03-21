import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.jsx';
import SearchBox from './components/search-box/search-box.jsx';

import './App.css';

const App = () => {
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => {
        setMonsters(data);
        setFilteredMonsters(data);
      })
  }, []);

  const onSearchChange = (event) => {
    const searchString = event.target.value.toLowerCase();
    const newFilteredMonsters = monsters.filter(
      monster => monster.name.toLowerCase().includes(searchString)
    );
    setFilteredMonsters(newFilteredMonsters);
  }

  return (
    <div className='app-container'>
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox onChangeHandler={onSearchChange}/>
      <CardList monsters={filteredMonsters}/>
    </div>
  )
}

export default App;