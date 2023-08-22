import style from '../assets/css/cardProduct.module.css'
import btnStyle from '../assets/css/button.module.css'
import CustomButton from './CustomButton'
import {MdLocationPin} from 'react-icons/md'
import { isMobile } from '../App'
import { useWidthContext } from '../context'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getCity, getImage, getCategory } from '../services/api'

export default function Card({ product }) {
  const widthSize = useWidthContext()
  const [showFullDescription, setFullDescription] = useState(false);
  const [image,setImage] = useState()
  const [city,setCity] = useState()
  const [category,setCategory] = useState()
  const showFullDescriptionHandler = () => {
    setFullDescription(!showFullDescription);
  };

  useEffect(() => {
    getImage(product.images[0])
    .then((res) => {
      setImage(res);
    })
  }, [product]);

  useEffect(() => {
    if(product){
      async function traeCity(){
        setCity(await getCity(product.city))
      }
      async function traeCategory(){
        setCategory(await getCategory(product.category))
      }
      traeCity()
      traeCategory()
    }
  }, [product]);
  

  const description = showFullDescription ? product.productDescription : product.productDescription.slice(0, 80);

  
  return (
    <div className={`${style.card} marginB3`}>
      <div className={`d-flex flex-column flex-md-row row row-cols-1 row-cols-md-2 ${style.cardBody}`}>
        <div className='col-lg-5 col-xl-6 pe-1'>
        {image ?
          <img src={image.url} alt="Foto del producto" className='img-fluid' />
        :
          <></>}
        </div>
        <div className={`col-lg-7 col-xl-6 p-2 ${style.cardText}`}>
          <div className='px-3 px-md-0'>
            <div className={style.cardTitle}>
              <div className={style.title}>
                <p className={`my-1 ${style.cardCategory}`}>{category ? category.title : <></>}</p>
                <h2 className={style.cardName}>{product.title}</h2>
              </div>
              {/* <div className={style.rating}>
                <span className={style.ratingNum}>{product.rating}</span>
                {product.rating >= 7.5 ? <span className={style.ratingDesc}>Muy bueno</span> : <span>Bueno</span>}
              </div> */}
            </div>
            {city ?
              <p className={`d-flex flex-row align-items-center mt-2 mb-3 ${style.cardLocation}`}>
                <MdLocationPin size={22} color={'var(--secondary)'} />{city.name}, {city.country} 
                <CustomButton content={'MOSTRAR EN EL MAPA'} others={style.btnMapa} className='ms-3 ms-md-0' />
              </p>
              :<></>
            }
              <p className={`pe-3 mb-1 ${style.cardDescription}`}>
                {description}
                <button onClick={showFullDescriptionHandler} className={`btn py-0 px-1 secondary ${style.btnReadMore}`}>
                  {showFullDescription ? "ver menos" : "...más"}
                </button>
              </p>
          </div>
          
          <Link to={`product/${product.id}`} className={style.detailLink}><CustomButton content={'Ver más'} clickAction={() => window.scroll(0,0)} styleType={'primary'} others={`${btnStyle.btnProduct} mb-2 mb-md-0`} /></Link>
        </div>
        
      </div>
    </div>
  )
}