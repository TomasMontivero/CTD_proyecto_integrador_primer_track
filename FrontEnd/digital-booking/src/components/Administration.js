import style from '../assets/css/administration.module.css'
import { useNavigate, Navigate } from 'react-router-dom';
import backBtn from '../assets/img/icons/backBtn.svg'
import trashIcon from '../assets/img/icons/trash-icon.svg'
import { Button, Card, Dropdown, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getCategories, getLocations, getProducts } from '../services/api';
import {library} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faWifi, faKitchenSet, faCar, faSnowflake, faPersonSwimming, faPaw, faPlus } from '@fortawesome/free-solid-svg-icons';
import CustomButton from './CustomButton';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

library.add(faTv, faWifi, faKitchenSet, faCar, faSnowflake, faPersonSwimming, faPaw, faPlus)

export default function Administration() {
  const navigate = useNavigate();
  const [ products, setProducts ] = useState([])
  const [ categories, setCategories ] = useState([])
  const [ locations, setLocations ] = useState([])
  const [ amenities, setAmenities ] = useState([
      {
        name: 'Cocina',
        icon: faKitchenSet
      },
      {
        name: 'Televisor',
        icon: faTv
      },
      {
        name: 'Aire acondicionado',
        icon: faSnowflake
      },
      {
        name: 'Apto mascotas',
        icon: faPaw
      },
      {
        name: 'Estacionamiento gratuito',
        icon: faCar
      },
      {
        name: 'Pileta',
        icon: faPersonSwimming
      },
      {
        name: 'Wifi',
        icon: faWifi
      },
    ])
  const [ images, setImages ] = useState([])
  const manageImages = () =>{
    const imageList = document.getElementById('imgList')
    const imgInput = document.getElementById('imgInput').value
    

    function updateList() {
      imageList.innerHTML= ''
      images.forEach((elem, index) =>{
        imageList.innerHTML +=  `
          <div style="display:flex; justify-content: space-between; align-items: center; margin-bottom: 10px; background: rgba(206, 212, 218, .25); padding: 8px 15px;
          border-radius: 5px;" id='elem${index}' key=${index} >
            <p style="margin-bottom: 0; word-break: break-all">${elem}</p>
            <button id=${index} style="background-color: var(--bs-red); border: none; border-radius: 10px" class="btnDelete py-1 px-2"><img src=${trashIcon} width="16px" /></button>
          </div>
        `
    })
    const deleteImgBtns = document.querySelectorAll('.btnDelete')
    deleteImgBtns.forEach(btn => {
      btn.addEventListener('click', (event) =>{
        event.preventDefault()
        let elem = document.getElementById(`elem${btn.id}`)
        let index = images.indexOf(elem.innerText)
        if (index > -1) { // only splice array when item is found
          images.splice(index, 1); // 2nd parameter means remove one item only
        }
        setImages(images)
        console.log(images)
        updateList()
      })
    })
  }

    images.push(imgInput)
    setImages(images)
    updateList()

  }
  const [ productCategory, setProductCategory ] = useState()
  const [ productCity, setProductCity ] = useState()
  const [ redirect, setRedirect ] = useState(false)
  const [ productAmountAttributes, setProductAmountAttributes ] = useState(0)
  const [ productAttributes, setProductAttributes ] = useState([])

  const [values, setValues] = useState({
    name: '',
    category: '',
    address: '',
    city: '',
    description: '',
    attributes: [],
    images: []
  });

  useEffect(() => {
    getCategories()
    .then((res) => {
      setCategories(res.data);

    })
    getLocations()
    .then((res) => {
      setLocations(res.data);
    })
    getProducts()
    .then((res) =>{
      setProducts(res.data)
    })
  }, []);

  useEffect(() =>{
    categories.map((elem) =>{
      if(elem.title == `${values.category.toLowerCase()}`){
        setProductCategory(elem.id)
      }
    })
  }, [values.category])
  useEffect(() =>{
    locations.map((elem) =>{
      let index = values.city.indexOf(',')
      if(elem.name == `${values.city.slice(0, index)}`){
        setProductCity(elem.id)
      }
    })
  }, [values.city])

  function handleChange(evt) {
    const { name, value } = evt.target;
    const newValues = {
        ...values,
        [name]: value
    };
    // console.log(newValues)
    setValues(newValues);
  }
  
  function handleAttributes(evt){
    evt.target.classList.toggle('selected')

    let selected = document.getElementsByClassName('selected')

  }

  const handleSubmit = (evt) => {
    const url = 'http://digitalbooking.sytes.net:8080/products'
    evt.preventDefault();

    let body = JSON.stringify({
      category: `${productCategory}`,
      title: `${values.name}`,
      city: `${productCity}`,
      productDescription: `${values.description}`,
      rating: '',
      images: [
      ],
      amenities: [
      ],
      bookings: [
      ],
      availabilities: [
      ]
    })

    
    // configuramos la request del Fetch
    const settings = {
      method: "POST",
      body: body,
      headers: {
        "Content-type": "application/json"
      }
    }
    console.log(body)

    fetch(url, settings)
    .then( response => {
      console.log(response);

      if(!response.ok){
        Swal.fire({
          icon: 'error',
          title: 'Ha habido un error. Intente de nuevo en unos minutos'
        })
      }else{
        setRedirect(true)
      }
      
      return response.json() 
    })
    .then( data => {

      console.log(data)
      // Swal.fire({
      //   title: 'Creando producto...',
      //   text: 'No cierre esta ventana por favor',
      //   timer: 1500,
      //   timerProgressBar: true,
      //   icon: 'info',
      // })
      // setTimeout(() => {
      //   navigate('/productCreated');
      // }, 1500)
    })
  }



  return (
    <div>
      {redirect ? <Navigate to='/productCreated'/> : <></>}
      <div className={`${style.header} d-flex align-items-center justify-content-between pt-4 pt-sm-5 pt-md-4 pb-1 ps-5`}>
        <h3 className='fw-600 text-white'>Administración de productos</h3>
        <button className="btn pb-3 pb-md-2" onClick={() => navigate(-1)}>
          <img src={backBtn} alt="Go back" className='pe-5 pb-2'/>
        </button>
      </div>
      <div className='container-fluid px-5 mt-5'>
        <h4 className='fw-bold'>Crear propiedad</h4>

        <div className='mt-4'>
          <Card style={{boxShadow: '0 15px 15px rgb(0 0 0 / 20%)', borderRadius: '12px'}}>
            <Card.Body>
              <Form>
                <div className='row row-cols-1 row-cols-md-2 p-2'>
                  <Form.Group className="mb-4" controlId="propertyName">
                    <Form.Label>Nombre de la propiedad</Form.Label>
                    <Form.Control type="text" placeholder="Nombre de la propiedad" name="name" onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="category">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select aria-label="Categoría" name="category" onChange={handleChange} required>
                      <option>Categoría</option>
                      {categories !== null ? categories.map((elem) =>{
                        let currentCategory = elem.title
                        currentCategory = currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1)
                        return <option value={currentCategory}>{currentCategory}</option>
                      }) : <></>}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="address">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" placeholder="Dirección" name="address" onChange={handleChange} required />
                  </Form.Group>

                  <Form.Group className="mb-4" controlId="city">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Select aria-label="Ciudad" name="city" onChange={handleChange} required>
                      <option>Ciudad</option>
                      {locations !== null ? locations.map((elem) =>{
                        let currentLocation = elem.name + ", " + elem.country
                        return <option value={currentLocation}>{currentLocation}</option>
                      }) : <></>}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-5 w-100" controlId="description">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Escribir aquí" name="description" onChange={handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-5 w-100" controlId="amenities">
                    <Form.Label className={style.formTitle}>Agregar atributos</Form.Label>
                    <div className='p-3' style={{background: 'rgba(206, 212, 218, .5)', borderRadius: '5px'}}>
                      <Dropdown autoClose="outside">
                        <Dropdown.Toggle variant="success" id="check-amenities" className={`w-100 text-start ps-3 d-flex justify-content-between align-items-center ${style.input}`}>
                          Atributos
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          {amenities !== null ? amenities.map((elem, index) =>{
                            return <Dropdown.Item key={index} href={`#/action-${index}`} className="amenity d-flex align-items-center" name="attributes" onClick={(evt) => handleAttributes(evt)}>
                              <FontAwesomeIcon icon={elem.icon} className='me-2' />
                              <Form.Check type="checkbox" id={elem.name} label={elem.name}></Form.Check>
                            </Dropdown.Item>
                          }) : <></>}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-5 w-100" controlId="politics">
                    <Form.Label className={style.formTitle}>Políticas del producto</Form.Label>
                    <Card style={{boxShadow: '0 15px 15px rgb(0 0 0 / 10%)', borderRadius: '12px'}}>
                      <Card.Body className='row row-cols-1 row-cols-lg-3 gx-lg-4 p-4'>
                          <div className='col col-lg-4 mb-4 mb-lg-0'>
                            <h5 className='fw-600 mb-3'>Normas de la casa</h5>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={10} placeholder="Escribir aquí" />
                          </div>
                          <div className='col col-lg-4 mb-4 mb-lg-0'>
                            <h5 className='fw-600 mb-3'>Salud y seguridad</h5>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={10} placeholder="Escribir aquí" />
                          </div>
                          <div className='col col-lg-4 mb-4 mb-lg-0'>
                            <h5 className='fw-600 mb-3'>Políticas de cancelación</h5>
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={10} placeholder="Escribir aquí" />
                          </div>
                      </Card.Body>
                    </Card>
                  </Form.Group>

                  <Form.Group className="mb-4 w-100">
                    <Form.Label className={`mb-3 ${style.formTitle}`}>Cargar imágenes</Form.Label>
                    <div className='d-flex p-3' style={{background: 'rgba(206, 212, 218, .5)', borderRadius: '5px'}}>
                      <Form.Control id="imgInput" type="text" placeholder="Insertar https://" className={`w-100 text-start ps-3 d-flex justify-content-between align-items-center me-1`} onClick={() => document.getElementById('imgInput').value = 'https://'} required />
                      <Button className={style.fileBtn} onClick={() => manageImages()}><FontAwesomeIcon icon={faPlus} color='#fff' /></Button>
                    </div>
                    <div id="imgList" className='mt-3' ></div>
                  </Form.Group>
                </div>
                <div className='mx-5 px-5'>
                  <CustomButton content='Crear' type="submit" styleType={'highlight'} others='py-2 w-100' clickAction={handleSubmit} />
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    
  )
}