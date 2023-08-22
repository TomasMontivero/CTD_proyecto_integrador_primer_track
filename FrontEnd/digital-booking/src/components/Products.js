import style from "../assets/css/products.module.css";
import Card from "./CardProduct"
import { useEffect, useState } from "react";
import productListJSON from '../data/productList.json'
// import { getProducts } from "../services/api";

export default function Products({products}) {
  
  // const [ products, setProducts ] = useState(productListJSON.productList);

  return (
    <>
      <div className={`container ${style.productsContainer}`}>
        <h2 className={`px-0 mb-4 ${style.title}`}>Recomendaciones</h2>
        <div className={`row row-cols-1 row-cols-lg-2 gy-4 ${style.listadoContainer} className='d-flex justify-content-center d-sm-block'`}>
            {products !== null ? products.map((product) => (
              <div key={product.id} className='col-auto'>
                <Card key={product.id} product={product}  />
              </div>
            )) : <></>}
        </div>
      </div>
    </>
  )
}