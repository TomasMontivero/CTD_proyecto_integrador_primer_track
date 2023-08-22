import style from '../assets/css/categories.module.css'
// import data from '../data/categories.json'
import CardCategory from './CardCategory';
import { getCategories } from '../services/api';
import { useEffect, useState } from 'react';

export default function Categories({filter}){
  const [ categories, setCategories ] = useState([])

  useEffect(() => {
    getCategories()
    .then((res) => {
      setCategories(res.data);
    })
  }, []);

  return (
    <div className='container mb-5'>
      <div>
        <div className={`mb-4 ${style.categoriesTitle}`}>
          <h2>Buscar por tipo de alojamiento</h2>
          <p>Tenemos varias opciones para ofrecerte:</p>
        </div>

        <div className={'row row-cols-1 row-cols-lg-2 row-cols-xl-4 gx-3 gy-4'}>
          {categories!== null ? categories.map((category) =>{
            return <div key={category.id} className='d-flex justify-content-center d-sm-block'>
              <CardCategory 
                id={category.id}
                key={category.id} 
                name={category.title} 
                img={category.urlImage} 
                amountAvailable={category.amount}
                className={style.category}
                filterProducts={filter}
              />
              </div>
          }) : <></>}
        </div>
      </div>
    </div>

  )
}