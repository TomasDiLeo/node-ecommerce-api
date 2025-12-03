import ProductModel from "../models/product.model.js";

/**
 * Servicio de Productos
 * Contiene la lógica de negocio
 */
class ProductsService {
  /**
   * Obtener todos los productos
   */
  async getAllProducts() {
    try {
      const products = await ProductModel.getAll();
      return {
        success: true,
        data: products,
        count: products.length,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Obtener un producto por ID
   */
  async getProductById(id) {
    try {
      if (!id) {
        throw new Error("El ID del producto es requerido");
      }

      const product = await ProductModel.getById(id);

      if (!product) {
        const error = new Error("Producto no encontrado");
        error.status = 404;
        throw error;
      }

      return {
        success: true,
        data: product,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Crear un nuevo producto
   */
  async createProduct(productData) {
    try {
      // Validar datos requeridos
      if (!productData.name || !productData.price) {
        const error = new Error("Nombre y precio son campos requeridos");
        error.status = 400;
        throw error;
      }

      // Validar que el precio sea positivo
      if (productData.price <= 0) {
        const error = new Error("El precio debe ser mayor a 0");
        error.status = 400;
        throw error;
      }

      const newProduct = await ProductModel.create(productData);

      return {
        success: true,
        message: "Producto creado exitosamente",
        data: newProduct,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Actualizar un producto
   */
  async updateProduct(id, productData) {
    try {
      if (!id) {
        throw new Error("El ID del producto es requerido");
      }

      // Verificar que el producto existe
      const existingProduct = await ProductModel.getById(id);
      if (!existingProduct) {
        const error = new Error("Producto no encontrado");
        error.status = 404;
        throw error;
      }

      // Validar precio si se proporciona
      if (productData.price !== undefined && productData.price <= 0) {
        const error = new Error("El precio debe ser mayor a 0");
        error.status = 400;
        throw error;
      }

      const updatedProduct = await ProductModel.update(id, productData);

      return {
        success: true,
        message: "Producto actualizado exitosamente",
        data: updatedProduct,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Eliminar un producto
   */
  async deleteProduct(id) {
    try {
      if (!id) {
        throw new Error("El ID del producto es requerido");
      }

      // Verificar que el producto existe
      const existingProduct = await ProductModel.getById(id);
      if (!existingProduct) {
        const error = new Error("Producto no encontrado");
        error.status = 404;
        throw error;
      }

      await ProductModel.delete(id);

      return {
        success: true,
        message: "Producto eliminado exitosamente",
      };
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductsService();
