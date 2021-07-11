
import React, { useState, useRef } from 'react';

import { useHistory, Link } from 'react-router-dom';

import './styles/Search.scss';


import logo from '../assets/Logo_ML.png'
import iconSearch from '../assets/ic_Search.png'

const Search = (props) => { 

  const history = useHistory();
  const refTextSearch = useRef(null);

  const searchItems = () => {
    const textSearch = refTextSearch.current.value;

    history.push({
      pathname: '/items/search',
      search: '?q='+textSearch
    });
  }

  return (
    <div className='search'>
      <Link to='/'>
        <img src={logo} alt='logo'/>
      </Link>
      
      <div className='search-box'>
        <input className='field' type='text' placeholder='Nunca dejes de buscar' ref={refTextSearch} />
        <div className='search-btn'>
          <img src={iconSearch} alt='buscar' onClick={() => searchItems()}/>
        </div>
      </div>      
    </div>
  );
}

export default Search;
