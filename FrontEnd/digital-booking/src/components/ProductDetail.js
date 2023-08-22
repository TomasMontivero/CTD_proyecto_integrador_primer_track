import { useContext, useEffect, useState } from 'react'
import { ComesFromDetail, UserLoggedContext, useWidthContext } from '../context'
import { isMobile } from '../App'
import { Link, useNavigate, useParams } from "react-router-dom"
import { ProductHeader } from './ProductHeader'
import { ProductRules } from './ProductRules'
import style from '../assets/css/productDetail.module.css'
import locationIcon from '../assets/img/icons/location-dot-secondary.svg'
import likeBtn from '../assets/img/icons/icon-like.svg'
import shareBtn from '../assets/img/icons/icon-share.svg'
import imgGallery1 from '../assets/img/img-gallery-1.jpg'
import imgGallery2 from '../assets/img/img-gallery-7.jpg'
import imgGallery3 from '../assets/img/img-gallery-3.jpg'
import imgGallery4 from '../assets/img/img-gallery-4.jpg'
import imgGallery5 from '../assets/img/img-gallery-5.jpg'
import imgGallery6 from '../assets/img/img-gallery-6.webp'
import imgGallery7 from '../assets/img/img-gallery-7.jpg'
import imgGallery8 from '../assets/img/img-gallery-8.jpg'
import imgGallery9 from '../assets/img/img-gallery-9.jpg'
import imgGallery10 from '../assets/img/img-gallery-10.jpg'
import mapaDesktop from '../assets/img/mapa-detalle-desktop.png'
import mapaMobile from '../assets/img/mapa-detalle-mobile.png'
import galleryNext from '../assets/img/icons/next-galeria.svg'
import Modal from 'react-bootstrap/Modal';
import OwlCarousel from 'react-owl-carousel2';
// import 'react-owl-carousel2/style.css';
import 'react-owl-carousel2/src/owl.carousel.css';
import 'react-owl-carousel2/src/owl.theme.default.css';
import Calendar from 'react-calendar';
import { Card } from 'react-bootstrap'
import CustomButton from './CustomButton'
import { tileDisabled } from '../assets/js/functions'
import { getProduct, getCity, getBookings, getAmenities } from '../services/api'
import { getPreviousDay } from '../assets/js/functions';
import {library} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faWifi, faKitchenSet, faCar, faSnowflake, faPersonSwimming, faPaw, faPlus } from '@fortawesome/free-solid-svg-icons';

export const ProductDetail = () => {
  const widthSize = useWidthContext()
  const [ isLogged, setIsLogged ] = useContext(UserLoggedContext)
  const { fromDetail } = useContext(ComesFromDetail)
  const [ isFromDetail, setIsFromDetail ] = fromDetail
  const navigate = useNavigate();
  const [ product, setProduct ] = useState(1);
  const [ modalShow, setModalShow ] = useState(false);
  const images = [ imgGallery1, imgGallery2, imgGallery3, imgGallery4, imgGallery5, imgGallery6, imgGallery7, imgGallery8, imgGallery9, imgGallery10 ]
  const {id} = useParams();
  const [ date, setDate ] = useState();
  const [city,setCity] = useState()
  const [amenities,setAmenities] = useState()
  const [reservedDates,setReservedDates] = useState()

  useEffect(() => {
    getProduct(id)
    .then((res) => {
      console.log(res)
      setProduct(res);
    })
  }, [id]);

  useEffect(() => {
    if(product != 1){
    async function traeCity(){
      setCity(await getCity(product.city))
    }
    async function traeBookings(){
      // console.log(product.id)
      setReservedDates(await getBookings(product.id))
    }
    async function traeAmenities(){
      // console.log(product.id)
      setAmenities(await getAmenities())
    }
    traeCity()
    traeBookings()
  }
  }, [id, product]);

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
  

  const GalleryModal = (props) =>{

    const [ imgShown, setImgShown ] = useState(1)
    const [ imgCount, setImgCount ] = useState(0)

    const options = {
      items: 1,
      singleItem: true,
      nav: true,
      margin: 500,
      navText: [null, `<div style="position: absolute; bottom: 45%; right: -50px"><img src='${galleryNext}' width="50"></div>`],
      dots: true,
      autoplay:true,
      autoplayTimeout:3000,
    }

    const events = {
      onTranslated: function(event) {
        setImgShown(event.item.index +1)
      },
      onInitialized: function (event) {
        setImgCount(event.item.count)
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        id="galleryModal"
      >
        <Modal.Body className="p-0">
          <OwlCarousel id="carousel" className={style.carousel} margin={10} events={events} options={options}>
            {images.map((img, index) => (
              <div key={index} className='item'>
                <img src={img} className={style.imgCarousel} alt=''/>
              </div>
            ))}
          </OwlCarousel>
          <div className="p-2">
            <p className={`py-1 px-3 ${style.carouselCounter}`}>{imgShown}/{imgCount}</p>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  const GalleryMobile = (props) => {
    // const [ imgShown, setImgShown ] = useState(1)
    // const [ imgCount, setImgCount ] = useState(0)

    const options = {
      items: 1,
      singleItem: true,
      nav: false,
      margin: 500,
      dots: true,
      loop: true
      // autoplay:true,
      // autoplayTimeout:3000,
    }

    // const events = {
    //   onTranslated: function(event) {
    //     setImgShown(event.item.index +1)
    //   },
    //   onInitialized: function (event) {
    //     setImgCount(event.item.count)
    //   }
    // };

    return (
      <>
        <OwlCarousel id="carousel" options={options}>
          {images.map((img, index) => (
            <div className='item'>
              <img src={img} key={index} className={style.imgCarousel} alt=''/>
            </div>
          ))}
        </OwlCarousel>
        {/* <div className="p-2">
          <p className={`py-1 px-3 ${style.carouselCounter}`}>{imgShown}/{imgCount}</p>
        </div> */}
      </>
    );
  }

  return (
    <>
      <div key={product.id} className='container-fluid px-0'>
        {/* Bloque header */}
        <ProductHeader product={product} className='mt-1' />
        {/* Bloque ubicación */}
        <div className={`py-2 ps-5 ${style.detailSecondary}`}>
        {city ?
        <>
          <p className="m-0 mb-1">
            <img src={locationIcon} width='14' alt=''/><span className="ps-1"> {city.name}, {city.country}</span></p>
          <span className="ps-4">A 940 m del centro</span>
        </>
          :<></>
        }
        </div>
        
        <div className="px-4 px-lg-5">
          <p className="pt-4 ps-2">
            <img src={shareBtn} alt="Share" width={30} className='me-4' />
            <img src={likeBtn} alt="Add to favorites" width={33} />
          </p>

          {/* Bloque imágenes */}
          {!isMobile(widthSize) ? 
          <>
            <div className={`row row-cols-2 g-1 mt-4 mt-md-0 ${style.gallery}`}>
              <div className="col-12 col-md-6 pe-md-3 d-flex align-items-center position-relative">
                <img src={imgGallery1} className='img-fluid w-100 h-100' alt=''/>
                <button className={`myBtn btn text-white fw-bold d-md-none ${style.galleryBtn}`} onClick={() => setModalShow(true)}>Ver más</button>
              </div>
              <div className="col-6 d-none d-md-block position-relative">
                <div className="row row-cols-2 g-3">
                  <div className="col-6">
                    <img src={imgGallery2} className='img-fluid' alt=''/>
                  </div>
                  <div className="col-6">
                    <img src={imgGallery3} className='img-fluid' alt=''/>
                  </div>
                </div>
                <div className="row row-cols-2 g-3 mt-1">
                  <div className="col-6">
                    <img src={imgGallery4} className='img-fluid' alt=''/>
                  </div>
                  <div className="col-6">
                    <img src={imgGallery5} className='img-fluid' alt=''/>
                  </div>
                </div>
                <button className={`myBtn btn text-white fw-bold ${style.galleryBtn}`} onClick={() => setModalShow(true)}>Ver más</button>
              </div>
            </div>
            <>
              <GalleryModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </>
          </> : 
          <div className={`row g-1 mt-4 mt-md-0 ${style.gallery}`}>
            <GalleryMobile />
          </div>}
          

          {/* Bloque descripción */}
          <div className ='mt-4 pt-3 pt-md-4'>
            <h2 className="px-4 fw-semibold">Alójate en el corazón de {city ? city.name : ''}</h2>
            <div className={`px-4 mt-4 ${style.detailDescription}`}>
              <p>{product.productDescription}</p>
            </div>
          </div>

          <div className ='mt-5'>
            <h2 className="px-4 fw-semibold">¿Qué ofrece este alojamiento?</h2>
            <hr style={{border: '1px solid var(--primary)', backgroundColor: 'var(--primary)', opacity: 1}} />
            <div className={`px-4 mt-4`}>
              <div className={`row row-cols-1 row-cols-md-2 row-cols-lg-4 ${style.detailAmenities}`}>
                <div className="col-auto d-flex flex-column justify-content-between">
                  <span className={style.item}><FontAwesomeIcon icon={faKitchenSet} className='pe-3' />Cocina</span>
                  <span className={style.item}><FontAwesomeIcon icon={faCar} className='pe-3' />Estacionamiento gratuito</span>
                </div>
                <div className="col-auto d-flex flex-column justify-content-between">
                  <span className={style.item}><FontAwesomeIcon icon={faTv} className='pe-3' />Televisor</span>
                  <span className={style.item}><FontAwesomeIcon icon={faPersonSwimming} className='pe-3' />Pileta</span>
                </div>
                <div className="col-auto d-flex flex-column justify-content-between">
                  <span className={style.item}><FontAwesomeIcon icon={faSnowflake} className='pe-3' />Aire Acondicionado</span>
                  <span className={style.item}><FontAwesomeIcon icon={faWifi} className='pe-3' />WiFi</span>
                </div>
                <div className="col-auto d-flex flex-column justify-content-between">
                  <span className={style.item}><FontAwesomeIcon icon={faPaw} className='pe-3' />Apto mascotas</span>
                </div>
              </div>
            </div>
          </div>

          <div className='my-5 py-4'>
            <h2 className="px-4 fw-semibold">Fechas disponibles</h2>
            <div className={`px-4 mt-4`}>
              <div className={`row row-cols-1 row-cols-md-2`}>
                <div className={`col-md-9 col-lg-7`}>
                {reservedDates ? 
                  <Calendar
                    className={`calendar position-relative w-100 h-100 ${style.calendar}`}
                    value={date}
                    onChange={setDate}
                    selectRange={true}
                    minDate={new Date()}
                    tileDisabled={handleDisabled}
                    showDoubleView={widthSize <= 768 ? false : true}
                  />
                  :
                  <Calendar
                    className={`calendar position-relative w-100 h-100 ${style.calendar}`}
                    value={date}
                    onChange={setDate}
                    selectRange={true}
                    minDate={new Date()}
                    showDoubleView={widthSize <= 768 ? false : true}
                  />}
                </div>
                <div className={`col-md-3 col-lg-5 mt-3 mt-md-0 d-flex align-items-center`}>
                  <div className='w-100'>
                    <Card style={{boxShadow: '0 12px 24px rgb(0 0 0 / 20%)'}}>
                      <Card.Body className='fw-bold'>
                        <p className='pt-3 pb-2 text-center'>Agregá tus fechas de viaje para obtener precios exactos</p>
                        {/* <Button className='w-100'>Iniciar reserva</Button> */}
                          <CustomButton 
                            styleType="highlight" 
                            content={"Iniciar reserva"} 
                            others={`w-100 h-100 py-1 ${style.btnReserva}`}
                            clickAction={() => {
                              if(isLogged){
                                navigate('reservation')
                              } else{
                                setIsFromDetail(true)
                                navigate('/login')
                              }
                              window.scroll(0,0)
                            }} />
                      </Card.Body>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className ='mt-5'>
            <h2 className="px-4 fw-semibold">¿Dónde vas a estar?</h2>
            <hr style={{border: '1px solid var(--primary)', backgroundColor: 'var(--primary)', opacity: 1}} />
            <div className={`px-4 mt-4`}>
              <div className={``}>
                <h5>{city ? city.name : ''}, {city ? city.country : ''}</h5>
                <img src={isMobile(widthSize) ? mapaMobile : mapaDesktop} className='mt-3 img-fluid' alt='' />
              </div>
            </div>
          </div>

          <div className ='mt-5'>
            <ProductRules />
          </div>
        </div>
      </div>
    </>
  )
}