import productListJSON from '../data/productList.json';
import style from '../assets/css/productReservation.module.css'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react'
import { ProductHeader } from './ProductHeader';
import { Card, Form } from 'react-bootstrap'
import {FiCheckCircle} from 'react-icons/fi'
import {MdLocationPin} from 'react-icons/md'
import Calendar from 'react-calendar';
import { getPreviousDay } from '../assets/js/functions';
import { ProductRules } from './ProductRules';
import CustomButton from './CustomButton';
import { UserContext, useWidthContext } from '../context';
import { isMobile } from '../App'
import { ReservationSuccess } from './ReservationSuccess';
import { getProduct, getCity, getCategory, getImage, getBookings, postBookings } from '../services/api';
import Products from './Products';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export const ProductReservation = () => {
  const [ user, ] = useContext(UserContext);
  const {id} = useParams();
  const navigate = useNavigate()
  const [ product, setProduct ] = useState(1);
  const [ date, setDate ] = useState();
  const widthSize = useWidthContext()
  const [city,setCity] = useState()
  const [reservedDates,setReservedDates] = useState()
  const [category,setCategory] = useState()
  const [image,setImage] = useState()
  const [hour,setHour] = useState()

  useEffect(() => {
    getProduct(id)
    .then((res) => {
      setProduct(res);
    })
  }, [id]);

  useEffect(() => {
    // console.log(date)
  }, [date]);

  useEffect(() => {
    // console.log(product)
    if(product !== 1){
      // console.log(product)
      async function traeCity(){
        setCity(await getCity(product.city))
      }
      async function traeCategory(){
        // console.log(product)
        setCategory(await getCategory(product.category))
      }
      async function traeImagen(){
        setImage(await getImage(product.images[0]))
      }
      async function traeBookings(){
        // console.log(product.id)
        setReservedDates(await getBookings(product.id))
      }
      traeCity()
      traeCategory()
      traeImagen()
      traeBookings()
    }
  }, [product]);

  function checkReserved(date){
    let disabled = false
    for (let i = 0; i < reservedDates.length; i++) {
      let start_date = new Date(reservedDates[i].startDate)
      let end_date = new Date(reservedDates[i].endDate)
      let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
      disabled = newDate >= start_date && newDate <= end_date
      if(!!disabled){
        break;
      }
    }
    return disabled
  }

  function handleDisabled ({ activeStartDate, date, view }) {
    return (date < getPreviousDay(new Date()) || checkReserved(date))
  }

  async function handleSubmit(){
    let occupied = false;
    if(!date){
      Swal.fire({
        title: 'Por favor, seleccione un rango de fechas',
        // text: 'Do you want to continue',
        icon: 'warning',
        confirmButtonText: 'Continuar'
      })
    }
    for (let i = 0; i < reservedDates.length; i++) {
      let booking_start_date = new Date(reservedDates[i].startDate)
      let compareDate_start = new Date(booking_start_date.getFullYear(), booking_start_date.getMonth(), booking_start_date.getDate(),0,0,0)
      let start_date = new Date(date[0].getFullYear(), date[0].getMonth(), date[0].getDate(),0,0,0)
      let end_date =  new Date(date[1].getFullYear(), date[1].getMonth(), date[1].getDate(),0,0,0)
      occupied = compareDate_start >= start_date && compareDate_start <= end_date
      if(!!occupied){
        break;
      }
    }
    if(!occupied){
      let body = {
        startHour: hour ? hour+':00:00' : '10:00:00',
        startDate: new Date(date[0].getFullYear(), date[0].getMonth(), date[0].getDate(),0,0,0),
        endDate: new Date(date[1].getFullYear(), date[1].getMonth(), date[1].getDate(),0,0,0),
        product: product.id,
        user: 9
      }
      let response = await postBookings(body);
      if(response.status == 200){
        Swal.fire({
          title: 'Generando reserva...',
          text: 'No cierre esta ventana por favor',
          timer: 1500,
          timerProgressBar: true,
          icon: 'info',
        })
        setTimeout(() => {
          navigate("/reservationSuccess");
        }, 1500)
      }else{
        Swal.fire({
          title: 'Lamentablemente la reserva no ha podido realizarse',
          text: 'Por favor, intente más tarde',
          icon: 'error',
          confirmButtonText: 'Continuar'
        })
      }
    }else{
      Swal.fire({
        title: 'Fechas no disponibles',
        html: '<p class="mb-0">Las fechas que ha seleccionado no están disponibles.<br />Intente seleccionando otro rango</p>',
        icon: 'warning',
        confirmButtonText: 'Continuar'
      })
    }
  }

  function handleChange(e){
    let value = e.target.value
    setHour(value);
  }

  return (
    
        <>
          <div key={product.id} className='container-fluid px-0 pb-5' style={{backgroundColor: 'rgba(173, 181, 189, .2)'}}>
            <ProductHeader product={product} />

            <div className='pt-4 px-4 px-lg-5'>
              <div className='row row-cols-lg-2 gx-lg-5 mx-0 mt-2'>
                <div className='col-12 col-lg-7'>
                  {/* Form datos */}
                  <div>
                    <h2 className='fw-semibold'>Completá tus datos</h2>
                    <div className='mt-4'>
                      <Card style={{boxShadow: '0 15px 15px rgb(0 0 0 / 20%)', borderRadius: '12px'}}>
                        <Card.Body>
                          <Form>
                            <div className='row row-cols-1 row-cols-md-2 p-2'>
                              <Form.Group className="mb-4" controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" placeholder="Nombre" value={localStorage.jwt ? localStorage.name : null} disabled />
                              </Form.Group>

                              <Form.Group className="mb-4" controlId="surname">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" placeholder="Apellido" value={localStorage.jwt ? localStorage.surname : null} disabled />
                              </Form.Group>

                              <Form.Group className="mb-4" controlId="email">
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control type="email" placeholder="Correo electrónico" value={localStorage.jwt ? localStorage.email : null} disabled />
                              </Form.Group>

                              <Form.Group className="mb-4" controlId="city">
                                <Form.Label>Ciudad</Form.Label>
                                <Form.Control type="text" placeholder="Ciudad" required />
                              </Form.Group>
                            </div>
                          </Form>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>

                  {/* Calendario fecha de reserva */}
                  <div className='mt-5'>
                    <h2 className='fw-semibold'>Seleccioná tu fecha de reserva</h2>
                    <div className='mt-4'>
                      <div className='col-12'>
                      {reservedDates ? 
                        <Calendar
                          className={`calendar position-relative w-100`}
                          value={date}
                          onChange={setDate}
                          selectRange={true}
                          tileDisabled={handleDisabled}
                          showDoubleView={isMobile(widthSize) ? false : true} 
                        />
                        :
                        <Calendar
                          className={`calendar position-relative w-100`}
                          value={date}
                          onChange={setDate}
                          selectRange={true}
                          showDoubleView={isMobile(widthSize) ? false : true} 
                        />
                      }
                      </div>
                      
                    </div>
                  </div>

                  {/* Selección horario de llegada */}
                  <div className='mt-5'>
                    <h2 className='fw-semibold'>Tu horario de llegada</h2>
                    <div className='mt-4'>
                      <Card style={{boxShadow: '0 15px 15px rgb(0 0 0 / 20%)', borderRadius: '12px'}}>
                        <Card.Body className='p-4'>
                          <p className='d-flex flex-column flex-sm-row align-items-center fw-600'>
                            <FiCheckCircle size={25} className='me-2 mb-2 mb-md-0' /> 
                            Tu habitación va a estar lista para el check-in entre las 10:00 AM y las 11:00 PM
                          </p>

                          <div className='mt-3'>
                            <span className='small fw-600'>Indicá tu horario estimado de llegada</span>
                            <Form.Select aria-label="Indicá tu horario estimado de llegada" controlId="arrivalTime" className={`mt-2 w-75 fw-500 ${style.arrivalSelect}`} onChange={handleChange} defaultValue='10'>
                              <option value="1">01:00 AM</option>
                              <option value="2">02:00 AM</option>
                              <option value="3">03:00 AM</option>
                              <option value="4">04:00 AM</option>
                              <option value="5">05:00 AM</option>
                              <option value="6">06:00 AM</option>
                              <option value="7">07:00 AM</option>
                              <option value="8">08:00 AM</option>
                              <option value="9">09:00 AM</option>
                              <option value="10">10:00 AM</option>
                              <option value="11">11:00 AM</option>
                              <option value="12">12:00 AM</option>
                              <option value="13">01:00 PM</option>
                              <option value="14">02:00 PM</option>
                              <option value="15">03:00 PM</option>
                              <option value="16">04:00 PM</option>
                              <option value="17">05:00 PM</option>
                              <option value="18">06:00 PM</option>
                              <option value="19">07:00 PM</option>
                              <option value="20">08:00 PM</option>
                              <option value="21">09:00 PM</option>
                              <option value="22">10:00 PM</option>
                              <option value="23">11:00 PM</option>
                              <option value="24">12:00 PM</option>
                            </Form.Select>
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </div>
                </div>

                <div className='col-12 col-lg-5 mt-5 pt-3 px-0'>
                  <Card className={`p-2 p-lg-0 h-100 ${style.cardReserva}`} style={{boxShadow: '0 15px 15px rgb(0 0 0 / 20%)', borderRadius: '12px', fontSize: '18px'}}>
                    <Card.Title className='px-4 pt-4 pb-2 fw-bold' style={{fontSize: '1.5rem'}}>Detalle de la reserva</Card.Title>
                    <Card.Body className='row row-cols-2 row-cols-lg-1 pt-2 px-4 px-lg-0'>
                      <div className='col-12 col-sm-6 col-lg-12'>
                        <Card.Img src={image ? image.url : <></>} style={{maxHeight: '500px', borderRadius: '0'}} className={`pb-3 ${style.cardImg}`} />
                      </div>
                      <Card.Text className='col-12 col-sm-6 col-lg-12 pt-lg-4 px-lg-4 d-flex flex-column justify-content-evenly'>
                        <div className='px-2 px-lg-3'>
                          <div className={style.cardTitle}>
                            <div className={style.title}>
                              <span className={`text-uppercase mb-0 ${style.cardCategory}`}>{category ? category.title : <></>}</span>
                              <h2 className={style.cardName}>{product.title}</h2>
                            </div>
                          </div>
                          <p className={`d-flex flex-row align-items-center mt-2 ${style.cardLocation}`}>
                            <MdLocationPin size={22} color={'var(--secondary)'} />{city ? city.name : <></>}, {city ? city.country : <></>} 
                          </p>
                        </div>
                        <div div className='px-2 px-lg-3 mb-3' style={{fontWeight: 600}}>
                          <hr />
                          <div className='d-flex justify-content-between'>
                            <span>Check in</span>
                            <span>{date ? date[0].toLocaleDateString() : <></>}</span>
                          </div>
                          <hr />
                          <div className='d-flex justify-content-between'>
                            <span>Check out</span>
                            <span>{date ? date[1].toLocaleDateString() : <></>}</span>
                          </div>
                          <hr />
                        </div>
                        <div className='px-lg-2'>
                            <CustomButton content={"Confirmar reserva"} styleType={'highlight'} others={`w-100 py-3 py-lg-2`} clickAction={handleSubmit} />
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
              
            </div>

          </div>

          <div className='mt-5 px-md-4'>
            <ProductRules />
          </div>
          
    </>
  )
}