import { Card } from 'react-bootstrap'
import CustomButton from './CustomButton'
import { BsPatchCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import style from '../assets/css/productReservation.module.css'

function ProductCreationSuccess(){
  return(
    <div className={`container-fluid mt-3 ${style.cardContainer}`}>
      <div className='d-flex justify-content-center'>
        <Card style={{boxShadow: '0 15px 15px rgb(0 0 0 / 20%)', borderRadius: '15px', width: 'fit-content'}} className='p-3 px-md-5 py-md-4' >
          <Card.Body className='text-center'>
            <BsPatchCheckFill size={80} color='var(--primary)' className='mb-4' />
            <h1 className='fw-bold'>¡Éxito!</h1>
            <p style={{fontSize: '1.25rem', fontWeight: 500}}>Su producto se ha creado con éxito</p>
            <Link to='/'>
              <CustomButton content={"Volver al inicio"} styleType={'highlight'} others='w-100 py-2 mt-3' />
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default ProductCreationSuccess;