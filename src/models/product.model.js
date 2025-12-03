import { db } from "../config/firebase.js";

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
      throw new Error("Error al consultar la base de datos");
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
      throw new Error("Error al consultar la base de datos");
    }
  }

  async create(productData) {
    try {
      const now = new Date();

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
      throw new Error("Error al guardar en la base de datos");
    }
  }

  async update(id, productData) {
    try {
      const docRef = collectionRef.doc(id);

      const updateData = {
        ...productData,
      };

      await docRef.update(updateData);

      return {
        id,
        ...updateData,
      };
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      throw new Error("Error al actualizar en la base de datos");
    }
  }

  async delete(id) {
    try {
      await collectionRef.doc(id).delete();
      return true;
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw new Error("Error al eliminar de la base de datos");
    }
  }
}

export default new ProductModel();
