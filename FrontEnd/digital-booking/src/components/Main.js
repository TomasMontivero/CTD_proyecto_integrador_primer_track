import SearchBanner from "./SearchBanner";
import Categories from "./Categories";
import Products from "./Products";
import { useEffect, useState } from "react";
import { getProducts, getBookings } from "../services/api";

export default function Main() {
  const [ products, setProducts ] = useState([]);
  const [ productsData, setProductsData ] = useState([]);
  const [ filteredProducts, setFilteredProducts ] = useState([]);
  const [ filteredByCategory, setFilteredByCategory ] = useState([]);
  const [ filteredByDate, setFilteredByDate] = useState([]);
  const [ date, setDate ] = useState();

  useEffect(() => {
    getProducts()
    .then((res) => {
      setProductsData(res.data)
      setProducts(res.data);
      setFilteredProducts(res.data)
      setFilteredByDate(res.data)
      setFilteredByCategory(res.data)
    })
  }, []);

  useEffect(()=>{
    traerBookings()
  }, [productsData]);

  const traerBookings = async () => {
    for( let producto of productsData){
      let booking = await getBookings(producto.id)
      producto.bookings = booking;
    }
    // console.log(productsData)
  }

  const filterByCategory = (e) =>{
    const filteredProducts = productsData.filter((prod) => prod.category == e.currentTarget.id)
    setFilteredProducts(filteredProducts)
    setFilteredByDate(filteredProducts);
    setFilteredByCategory(filteredProducts)
  }

  const filterByLocation = (e) =>{
    const filteredProducts = productsData.filter((prod) => prod.city == e.currentTarget.id)
    let result = filteredByCategory.filter(product=> filteredProducts.includes(product))
    console.log("filteredProducts")
    console.log(filteredProducts)
    setFilteredProducts(result)
    setFilteredByDate(result);
  }

  const checkDates = () => {
    let filteredByDate2 = [];
    if(!!date){
      let occuped = false
      let start_date = new Date(date[0])
      let compareStartDate = new Date(start_date.getFullYear(), start_date.getMonth(),start_date.getDate())
      let end_date = new Date(date[1])
      let compareEndDate = new Date(end_date.getFullYear(), end_date.getMonth(),end_date.getDate())
      filteredProducts.forEach(product =>{
        for (let i = 0; i < product.bookings.length; i++) {
          let bookingStartDate = new Date(product.bookings[i].startDate)
          let compareDate = new Date(bookingStartDate.getFullYear(), bookingStartDate.getMonth(),bookingStartDate.getDate())
          occuped = compareDate >= compareStartDate && compareDate <= compareEndDate 
          if(!!occuped){
            console.log(product.bookings[i]);
            break;
          }
        }
        if(!occuped){
          filteredByDate2.push(product)
        }
      })
      console.log(filteredByDate2)
      setFilteredByDate(filteredByDate2) 
    }
  }

  const filterProducts = (e) =>{
    setFilteredByDate(productsData)
    e.preventDefault()
    checkDates();
  }

    return (
        <>
          <SearchBanner filterByLocation={filterByLocation} filterProducts={filterProducts} date={date} setDate={setDate} />
          <Categories filter={filterByCategory} />
          <Products products={filteredByDate} />
        </>
    )
}