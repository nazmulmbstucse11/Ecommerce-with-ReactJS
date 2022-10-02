import productData from "../../data/products.json"

export default async function getAllProduct(req, res) {
    
    res.json(productData);
  }