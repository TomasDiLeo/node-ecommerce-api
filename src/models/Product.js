import { db } from "../config/firebase.js";


const __dirname = import.meta.dirname;

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
  try {
    
    const snapshot = await getDocs(productsCollection);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  } catch (error) {
    console.error(error);
  }
};

// export const getAllProducts = async () => {
//   try {
//     const data = await fs.readFile(
//       path.join(__dirname, "products.json"),
//       "utf-8"
//     );

//     const products = JSON.parse(data);

//     return products;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const getProductById = async (id) => {
//   try {
//     const data = await fs.readFile(
//       path.join(__dirname, "products.json"),
//       "utf-8"
//     );

//     const products = JSON.parse(data);

//     const product = products.find((item) => item.id == id);

//     return product;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const createProduct = async (data) => {
  try {
    const docRef = await addDoc(productsCollection, data);
    return { id: docRef.id, ...data };
  } catch (error) {
    console.error(error);
  }
}

export const deleteProduct = async (id) => {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return false;
    }

    await deleteDoc(productRef);
    return true;

  } catch (error) {
    console.error(error);
    return false;
  }
};

// export const createProduct = async (nombre, precio, categorias) => {
//   const product = {
//     id: Date.now(),
//     nombre,
//     precio,
//     categorias,
//   };

//   try {
//     const data = await fs.readFile(
//       path.join(__dirname, "products.json"),
//       "utf-8"
//     );

//     const products = JSON.parse(data);

//     products.push(product);

//     await fs.writeFile(
//       path.join(__dirname, "products.json"),
//       JSON.stringify(products)
//     );

//     return product;
//   } catch (error) {
//     console.error(error);
//   }
// };
