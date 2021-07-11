
import React, { useState, useRef, useEffect } from 'react';

import { useHistory, useParams } from 'react-router-dom';

import './styles/DetailProduct.scss';


import logo from '../assets/Logo_ML.png'
import iconSearch from '../assets/ic_Search.png'

const DetailProduct = (props) => { 

  const history = useHistory();
  const refTextSearch = useRef(null);

  const API = 'http://localhost:3000/api/items';

  const [data, setData] = useState(null);
  
  const { id }= useParams();

  useEffect(() => {

    const url = `${API}/${id}`
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        debugger
        setData(data.item)
      });
  }, [id]);


  return (
    <>
      <div className='breadcrumb'>Algo - algo - algo</div>
      {(data !== undefined && data !== null) && (
        <div className='product-detail'>        
          <div className='detail'>
            <div className='product-img'>
              <img src={data.picture} alt='Imagen de producto'/>
            </div>   
            <div className='product-info'>
              <p className='store'>{data.condition} {data.sold_quantity} vendidos</p>
              <p className='title'>{data.title}</p>
              <p className='price'>$ {data.price.amount}</p>
              <button type='button' className='btn-primary'>Comprar</button>
            </div> 
          </div>
          <div className='product-description'>
            <h2 className='product-subtitle'>Descripción del producto</h2>
            <p className='description'>{data.description}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailProduct;
