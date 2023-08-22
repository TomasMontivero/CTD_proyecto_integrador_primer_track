import { Card } from 'react-bootstrap'
import CustomButton from './CustomButton'
import { BsPatchCheckFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import style from '../assets/css/productReservation.module.css'

export const ReservationSuccess = () =>{
  return(
    <div className={`container-fluid mt-3 ${style.cardContainer}`}>
      <div className='d-flex justify-content-center mx-3'>
        <Card style={{boxShadow: '0 15px 15px rgb(0 0 0 / 20%)', borderRadius: '15px', width: 'fit-content', maxWidth: '500px'}} className='p-3 px-md-5 py-md-4' >
          <Card.Body className='text-center'>
            <BsPatchCheckFill size={80} color='var(--primary)' className='mb-4' />
            <h1 className='fw-bold'>¡Muchas gracias!</h1>
            <p className='mb-2' style={{fontSize: '1.25rem', fontWeight: 500}}>Su reserva se ha realizado con éxito</p>
            <p>Le hemos enviado un mail a {localStorage.email} con los detalles</p>
            <Link to='/'>
              <CustomButton content={"Ok"} styleType={'highlight'} others='w-100 py-2 mt-3' />
            </Link>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}