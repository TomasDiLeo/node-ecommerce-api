import ProductsService from "../services/products.service.js";
/**
 * Controlador de Productos
 * Maneja las peticiones HTTP relacionadas con productos
 */
class ProductsController {
  /**
   * GET /api/products
   * Obtener todos los productos
   */
  async getAll(req, res, next) {
    try {
      const result = await ProductsService.getAllProducts();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/products/:id
   * Obtener un producto por ID
   */
  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ProductsService.getProductById(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * POST /api/products/create
   * Crear un nuevo producto
   */
  async create(req, res, next) {
    try {
      const productData = req.body;
      const result = await ProductsService.createProduct(productData);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * PUT /api/products/:id
   * Actualizar un producto
   */
  async update(req, res, next) {
    try {
      const { id } = req.params;
      const productData = req.body;
      const result = await ProductsService.updateProduct(id, productData);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  /**
   * DELETE /api/products/:id
   * Eliminar un producto
   */
  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const result = await ProductsService.deleteProduct(id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductsController();
