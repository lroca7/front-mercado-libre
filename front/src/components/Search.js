
import React, { useState, useRef } from "react";

import { useHistory } from "react-router-dom";

import './styles/Search.scss';


import logo from "../assets/Logo_ML.png"
import iconSearch from "../assets/ic_Search.png"

const Search = (props) => { 
  return (
    <div className="search">
      <img src={logo} alt='logo'/>
      <div className='search-box'>
        <input className='field' type='text' placeholder='Nunca dejes de buscar'></input>
        <div className='search-btn'>
          <img src={iconSearch} alt='buscar'/>
        </div>
      </div>      
    </div>
  );
}

export default Search;
