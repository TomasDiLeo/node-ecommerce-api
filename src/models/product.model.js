import { db } from "../config/firebase.js";
import { InternalServerError } from "../utils/errors.js";

const COLLECTION_NAME = "products";
const collectionRef = db.collection(COLLECTION_NAME);

class ProductModel {
  async getAll() {
    try {
      const snapshot = await collectionRef.get();

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw new InternalServerError(
        "Error al consultar productos",
        "No se pudieron obtener los productos de la base de datos"
      );
    }
  }

  async getById(id) {
    try {
      const docRef = collectionRef.doc(id);
      const snapshot = await docRef.get();

      if (!snapshot.exists) return null;

      return {
        id: snapshot.id,
        ...snapshot.data(),
      };
    } catch (error) {
      console.error("Error al obtener producto:", error);
      throw new InternalServerError(
        "Error al consultar producto",
        "No se pudo obtener el producto de la base de datos"
      );
    }
  }

  async create(productData) {
    try {

      const newProduct = {
        ...productData,
      };

      const docRef = await collectionRef.add(newProduct);

      return {
        id: docRef.id,
        ...newProduct,
      };
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw new InternalServerError(
        "Error al crear producto",
        "No se pudo guardar el producto en la base de datos"
      );
    }
  }

  async update(id, productData) {
    try {
      const docRef = collectionRef.doc(id);

      const updateData = {
        ...productData,
      };

      await docRef.update(updateData);
      const updatedDoc = await docRef.get();

      return {
        id,
        ...updatedDoc.data(),
      };
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      throw new InternalServerError(
        "Error al actualizar producto",
        "No se pudo actualizar el producto en la base de datos"
      );
    }
  }

  async delete(id) {
    try {
      const docRef = collectionRef.doc(id);
      const snapshot = await docRef.get();

      await docRef.delete();

      return {
        id: snapshot.id,
        name: snapshot.data().name,
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw new InternalServerError(
        "Error al eliminar producto",
        "No se pudo eliminar el producto de la base de datos"
      );
    }
  }
}

export default new ProductModel();
