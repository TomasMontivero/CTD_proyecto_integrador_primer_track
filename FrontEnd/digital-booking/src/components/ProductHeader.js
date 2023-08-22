import backBtn from '../assets/img/icons/backBtn.svg'
import style from '../assets/css/productDetail.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getCategory } from '../services/api';

export const ProductHeader = ({product}) =>{
  const navigate = useNavigate();
  const [category, setCategory] = useState();

  useEffect(() => {
    if(product){
      async function traeCategoria(){
        setCategory(await getCategory(product.category))
      }
      traeCategoria();
    }
  }, [product]);

  return (
    <div className={`${style.detailName} pt-4 pt-sm-5 pt-md-4 pb-1 ps-5`}>
      <h2 className='d-flex flex-column pt-2 pt-md-0 pb-2' style={{fontWeight: 600}}>
        {category ? 
          category.title.startsWith('bed') ? 
          <span style={{fontSize: '1.15rem', fontWeight: 500, textTransform: 'capitalize'}}>{category.title}</span> :
          <span style={{fontSize: '1.15rem', fontWeight: 500, textTransform: 'capitalize'}}>{category.title.endsWith('es') ? category.title.slice(0, -2) : category.title.slice(0, -1)}</span>
          :
          <></>}
        {product.title}
      </h2>
      <button className="btn pb-3 pb-md-4" onClick={() => navigate(-1)}>
        <img src={backBtn} alt="Go back" className='pe-5'/>
      </button>
    </div>
  )
}