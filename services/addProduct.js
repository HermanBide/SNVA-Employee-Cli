const Product = require("../model/product");
const fs = require("fs");

let products = [];

function allProducts() {
  return products;
}

function saveProducts(product) {
  const folderPath = `c:\\`;
  const filePath = `${folderPath}/data/products.json`;
  const jsonProduct = fs.readFile(filePath);
  let products = JSON.parse(jsonProduct);
  products.push(product);

  fs.writeFileSync(filePath, JSON.stringify(products), (error) => {
    if (error) {
      // console.log("Error saving employee data: ", error);
    } else {
      console.log(
        `Product with ID ${product.getId()} has been added and saved.`
      );
      console.log(`Product data has been saved to: ${filePath}`);
    }
  });
}

function addProduct(product) {
  const { title, description, price, media } = product;
  if (!title || !description || !price || !media) {
    throw new Error(`can not save product without all fills being filled`);
  }
  if (typeof media !== "string") {
    throw new Error("Error media is not a file");
  }

  const id = (products.length + 1);
  const newProduct = new Product(id, title, description, price, media);
  products.push(newProduct);
  saveProducts(newProduct);
  return products;
}

module.exports = addProduct;
