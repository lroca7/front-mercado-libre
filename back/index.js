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

      const nData = {
        author,
        categories: [],
        items
      }

      res.send(nData);

    })
    .catch(error => 
      console.log('Ha ocurrido un error con la petición:' + error.message)
    );

});



app.listen(3000, () => console.log('Servidor listo ...'));
