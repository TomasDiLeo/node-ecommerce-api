import ProductModel from "../models/product.model.js";
import {
  BadRequestError,
  NotFoundError,
  ValidationError,
} from "../utils/errors.js";

/**
 * Servicio de Productos
 * Contiene la lógica de negocio
 */
class ProductsService {
  /**
   * Obtener todos los productos
   */
  async getAllProducts() {
    const products = await ProductModel.getAll();
    return {
      count: products.length,
      products: products,
      success: true,
    };
  }

  /**
   * Obtener un producto por ID
   */
  async getProductById(id) {
    if (!id || id.trim() === "") {
      throw new BadRequestError(
        "ID requerido",
        "El ID del producto es obligatorio para esta operación",
      );
    }

    const product = await ProductModel.getById(id);

    if (!product) {
      throw new NotFoundError(
        "Producto no encontrado",
        `No existe un producto con ID ${id}`,
      )
    }

    return {
      product: product,
      success: true,
    };
  }

  /**
   * Crear un nuevo producto
   */
  async createProduct(productData) {
    // Validar datos
    if (!productData) {
      throw new BadRequestError(
        "Datos inválidos",
        "Los datos del producto no pueden estar vacíos"
      );
    }

    //Validar nombre
    if (!productData.name) {
      throw new ValidationError(
        "El nombre es requerido",
        'Asegúrate de proporcionar un nombre con la forma {"name": "nombre del producto"}'
      );
    }

    // Validar precio
    if (productData.price !== undefined) {
      const price = Number(productData.price);
      if (isNaN(price)) {
        throw new ValidationError(
          "Precio inválido",
          "El precio debe ser un número válido"
        );
      }
      if (price <= 0) {
        throw new ValidationError(
          "Precio inválido",
          "El precio debe ser mayor a 0"
        );
      }
      productData.price = price;
    }

    const newProduct = await ProductModel.create(productData);

    return {
      message: "Producto creado exitosamente",
      data: newProduct,
      success: true,
    };
  }

  /**
   * Actualizar un producto
   */
  async updateProduct(id, productData) {
    if (!id) {
      throw new BadRequestError(
        "ID requerido",
        "El ID del producto es obligatorio para esta operación"
      );
    }

    if (!productData || Object.keys(productData).length === 0) {
      throw new BadRequestError(
        "Datos inválidos",
        "Los datos a actualizar no pueden estar vacíos"
      );
    }

    // Verificar que el producto existe
    const existingProduct = await ProductModel.getById(id);
    if (!existingProduct) {
      throw new NotFoundError(
        "Producto no encontrado",
        `No existe un producto con ID ${id}`
      );
    }

    // Validar nombre si se proporciona
    if (productData.name !== undefined && productData.name.trim() === "") {
      throw new ValidationError(
        "Nombre inválido",
        "El nombre del producto no puede estar vacío"
      );
    }

    // Validar precio si se proporciona
    if (productData.price !== undefined) {
      const price = Number(productData.price);
      if (isNaN(price)) {
        throw new ValidationError(
          "Precio inválido",
          "El precio debe ser un número válido"
        );
      }
      if (price <= 0) {
        throw new ValidationError(
          "Precio inválido",
          "El precio debe ser mayor a 0"
        );
      }
      productData.price = price;
    }

    const updatedProduct = await ProductModel.update(id, productData);

    return {
      message: "Producto actualizado exitosamente",
      product: updatedProduct,
      success: true,
    };
  }

  /**
   * Eliminar un producto
   */
  async deleteProduct(id) {
      if (!id) {
        throw new BadRequestError(
          "ID requerido",
          "Debes proporcionar un ID de producto válido"
        );
      }

      // Verificar que el producto existe
      const existingProduct = await ProductModel.getById(id);
      if (!existingProduct) {
        throw new NotFoundError(
          "Producto no encontrado",
          `No existe un producto con el ID: ${id}`
        );
      }

      const product = await ProductModel.delete(id);

      return {
        message: `Producto ${product.id} (${product.name}) eliminado exitosamente`,
        success: true,
      };
  }
}

export default new ProductsService();
