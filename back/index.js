const { response } = require('express');
const express = require('express');
const fetch = require('node-fetch');
const app = express();

const API = 'https://api.mercadolibre.com'
const author = {
  name: 'Lizeth',
  lastname: 'Rodriguez Cabrales'
};

app.get("/api/items", (req, res) => {
  const query = req.query;

  const url = `${API}/sites/MLA/search?q=${query.q}&limit=4`;

  fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)

      const items = data.results.map((item) => {
        const nItem = {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: item.price,
            decimals: null,
          },
          picture: item.thumbnail,
          condition: item.condition,
          free_shipping: item.shipping.free_shipping
        };
        return nItem;
      });

      const categories = data.filters[0].values[0].path_from_root;

      const nData = {
        author,
        categories: categories,
        items
      }

      res.send(nData);

    })
    .catch(error => 
      console.log('Ha ocurrido un error con la petición:' + error.message)
    );

});

const getItem = async (id) => {

  const url = `${API}/items/${id}`;

  const responseItem = await fetch(url, {
    method: 'GET'
  })
  .catch(error => 
    console.log('Ha ocurrido un error con la petición: ' + error.message)
  );

  const item = await responseItem.json();

  return item;
}

const getItemDescription = async (id) => {

  const url = `${API}/items/${id}/description`;

  const response = await fetch(url, {
    method: 'GET'
  })
  .catch(error => 
    console.error('Ha ocurrido un error con la petición: ' + error.message)
  );

  const description = await response.json();

  return description;
}

app.get("/api/items/:id", (req, res)=> {
  
  const id = req.params.id;

  Promise.all([
    getItem(id), getItemDescription(id)]
  ).then((data) => {
    const item = data[0];
    const description = data[1];

    const nItem = {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: item.price,
        decimals: null,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: description.plain_text
    }

    const nData = {
      author,
      item: nItem
    }

    res.send(nData)

  }).catch(error => {
    console.error('Ha ocurrido un error: ' + error.message)
  })

});


app.listen(3000, () => console.log('Servidor listo ...'));
