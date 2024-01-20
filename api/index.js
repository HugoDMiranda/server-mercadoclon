const { Router } = require("express");
const ProductosService = require("../controller/index");

const router = Router();
const service = new ProductosService();

router.get("/items", async (req, res) => {
  try {
    const search = req.query.search;
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${search}`;
    const productos = await service.buscar(url);

    res.json(productos);
  } catch (error) {
    res.json({
      message: "error",
      error,
    });
  }
});
// http://localhost:3001/api/items/prueba?search=television

router.get("/items/search/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${id}`;
    const productos = await service.buscar(url);

    res.json(productos);
  } catch (error) {
    res.json({
      message: "error",
      error,
    });
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const url = `https://api.mercadolibre.com/items/${id}`;
    const urlDescripcion = `https://api.mercadolibre.com/items/${id}/description`;
    const description = await service.buscarUno(url, urlDescripcion);

    res.json(description);
  } catch (error) {
    res.json({
      message: "error",
    });
  }
});

module.exports = router;
