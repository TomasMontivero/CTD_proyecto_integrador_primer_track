import axios from 'axios';

axios.defaults.baseURL = 'http://digitalbooking.sytes.net:8080';

/* ------ CATEGORIES ------  */
export const getCategories = () =>{
  return axios.get('/categories')
  .then((response) => {
      // console.log("RESPONSE " + response)
      return response
    })
    .catch(e => {
      console.log(e);
    })
}

/* ------ PRODUCTS ------  */
export const getProducts = () =>{
  return axios.get('/products')
  .then((response) => {
      // console.log("RESPONSE " + response)
      return response
    })
    .catch(e => {
      console.log(e);
    })
}

export const getProduct = (id) =>{
  return axios.get(`/products/${id}`)
  .then((response) => {
      // console.log("RESPONSE " + response)
      return response.data
    })
    .catch(e => {
      console.log(e);
    })
}

/* ------ LOCATIONS ------  */
export const getLocations = () =>{
  return axios.get('/cities')
  .then((response) => {
      // console.log("RESPONSE " + response)
      return response
    })
    .catch(e => {
      console.log(e);
    })
}

/* ------ IMAGES ------  */
export const getImage = (id) =>{
  return axios.get(`/images/${id}`)
  .then((response) => {
      // console.log(response.data)
      return response.data
    })
    .catch(e => {
      console.log(e);
    })
}

export const getUsers = () =>{
  return axios.get('/users')
  .then((response) => {
      console.log("RESPONSE " + response)
      return response
    })
    .catch(e => {
      console.log(e);
    })
}


export const getCategory = (id) =>{
  return axios.get(`/categories/${id}`)
  .then((response) => {
      // console.log(response.data)
      return response.data
    })
    .catch(e => {
      console.log(e);
    })
}

export const getCity = (id) =>{
  return axios.get(`/cities/${id}`)
  .then((response) => {
      // console.log(response.data)
      return response.data
    })
    .catch(e => {
      console.log(e);
    })
}

export const getBookings = (id) =>{
  return new Promise((res,rej) => {
    axios.get(`/bookings/products/${id}`)
    .then((response) => {
        // console.log(response.data)
        res(response.data)
      })
      .catch(e => {
        console.log(e);
        rej(e);
      })
  })
  
}

export const postBookings = (body) =>{
  return new Promise((res,rej) => {
    axios.post(`/bookings`, body)
    .then((response) => {
        // console.log(response.data)
        res(response)
      })
      .catch(e => {
        console.log(e);
        rej(e);
      })
  })
  
}

export const getAmenities = () =>{
  return new Promise((res,rej) => {
    axios.get(`/amenities`)
    .then((response) => {
        // console.log(response.data)
        res(response.data)
      })
      .catch(e => {
        console.log(e);
        rej(e);
      })
  })
  
}