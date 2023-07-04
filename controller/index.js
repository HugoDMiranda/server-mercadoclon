const axios = require("axios");

class ProductosService {
  async obtenerDatos(url) {
    const { data } = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });
    return data;
  }

  async buscar(url) {
    const limit = 8;
    //const limit = 4;
    const resultados = await this.obtenerDatos(url);

    const productos = [];
    for (let index = 0; index < resultados.results.length; index++) {
      const categoriesId = resultados.results[index].category_id;
      const categories = await this.obtenerDatos(
        `https://api.mercadolibre.com/categories/${categoriesId}`
      );
      const currencyId = resultados.results[index].currency_id;
      const currency = await this.obtenerDatos(
        `https://api.mercadolibre.com/currencies/${currencyId}`
      );

      productos.push({
        author: {
          name: resultados.results[index].seller.nickname,
          lastname: String,
        },
        categories: categories.path_from_root.map((category) => {
          return category.name;
        }),
        items: [
          {
            id: resultados.results[index].id,
            title: resultados.results[index].title,
            price: {
              currency: currency.id,
              amount: resultados.results[index].installments.amount,
              decimals: currency.decimal_places,
              price: resultados.results[index].price,
            },
            picture: resultados.results[index].thumbnail,
            condition: resultados.results[index].condition,
            free_shipping: resultados.results[index].shipping.free_shipping,
            state_name: resultados.results[index].address.state_name,
          },
        ],
      });
    }
    return productos;
  }

  async buscarUno(url1, url2) {
    const data1 = await this.obtenerDatos(url1);
    const data2 = await this.obtenerDatos(url2);

    const authorId = data1.seller_id;
    const currencyId = data1.currency_id;

    const author = await this.obtenerDatos(
      `https://api.mercadolibre.com/users/${authorId}`
    );
    const currency = await this.obtenerDatos(
      `https://api.mercadolibre.com/currencies/${currencyId}`
    );

    const producto = {
      author: {
        name: author.first_name,
        lastname: author.last_name,
      },
      item: {
        id: data1.id,
        title: data1.title,
        price: {
          currency: currency.id,
          amount: data1.available_quantity,
          decimals: currency.decimal_places,
          price: data1.price,
        },
        picture: data1.thumbnail,
        condition: data1.condition,
        free_shipping: data1.shipping.free_shipping,
        sold_quantity: data1.sold_quantity,
        description: data2.plain_text,
      },
    };
    return producto;
  }
}

module.exports = ProductosService;
