
import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './styles/Products.scss';


const Products = (props) => { 

  const history = useHistory();

  const API = 'http://localhost:3000/api/items';

  const [data, setData] = useState([]);

  const getDetailProduct = (id) => {
    history.push({
      pathname: `/items/${id}`
    });
  }

  useEffect(() => {
    const query = history.location.search;
    const url = API + query;
    if (query) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setData(data.items)
        });
    }
  }, [history.location.search]);


  return (
    <>
      <div className='breadcrumb'>Algo - algo - algo</div>
      <div className='list-products'>
        {data.length  > 0 && (
          <div className='products'>
            {data.map(product => {
              return <div className='product' onClick={() => getDetailProduct(product.id)}>
                <div className='product-img'>
                  <img src={product.picture} alt='Imagen de producto'/>
                </div>
                <div className='product-info'>
                  <p className='price'>${product.price.amount}</p>
                  <p className='title'>{product.title}</p>
                </div>
                <div className='product-city'>
                  <p className='city'>Cartagena</p>
                </div>
              </div>
            })
          }
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
