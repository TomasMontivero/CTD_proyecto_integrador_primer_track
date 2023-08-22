import style from '../assets/css/login-register.module.css'
import CustomButton from './CustomButton' 
import btnStyle from '../assets/css/button.module.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdOutlineClose } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri"
import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ComesFromDetail, UserContext, UserLoggedContext } from '../context'
import { useEffect } from 'react';
import { getUsers } from '../services/api';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function Login() {
  const url = 'http://digitalbooking.sytes.net:8080/login'
  const form = document.querySelector('form')
  const [ , setIsLogged ] = useContext(UserLoggedContext)
  const [ user,setUser ] = useContext(UserContext)
  const { fromDetail } = useContext(ComesFromDetail)
  const [ isFromDetail, setIsFromDetail ] = fromDetail
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email:{
        value:'',
        error: false,
    },
    password:{
        value:'',
        error: false
    },
    login: false,
    redirect: false
  });

  useEffect(()=>{
    if(localStorage.jwt && localStorage.email){
      setIsLogged(true)
    }
  }, [])

  useEffect(() => {

  },[values.login])

  useEffect(() => {

  }, [user])  

  const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

  function handleSubmit(evt) {
    evt.preventDefault();

    // creamos el cuerpo de la request
    let body = JSON.stringify({
      "email": values.email.value,
      "password": values.password.value
    })
    
    // configuramos la request del Fetch
    const settings = {
      method: "POST",
      body: body,
      headers: {
        "Content-type": "application/json"
      }
    }

    // llamamos a la funcion q hace la consulta
    realizarLogin(settings);
    // reseteamos el form
    form.reset()
  }

  function realizarLogin(settings) {
    console.log("ENTRÓ")
    let hasErrorEmail = !emailRegexp.test(values.email.value);
    setValues((prevState) => ({...prevState, email:{...values.email,error:hasErrorEmail}}));
    
    const hasErrorPass = values.password.value.length > 6 ? false : true;
    setValues((prevState) => ({ ...prevState, password:{...values.password,error:hasErrorPass}}));

    if(!hasErrorEmail && !hasErrorPass){
      fetch(url, settings)
      .then( response => {
        console.log(response);

        if(!response.ok){
          showErrors('loginStatus')
          setValues((prevState) => ({...prevState,login:false}));
          setIsLogged(false)     
        } else{
          clearErrors('loginStatus')
        }
        
        return response.json() 
      })
      .then( data => {
        console.log("Realizando login...");
        // console.log(data);
        if(data.jwt){
          const url = isFromDetail ? -1 : '/'
          localStorage.setItem('jwt', JSON.stringify(data.jwt));

          // redireccionamos
          setIsLogged(true)
          getUsers()
          .then(res => {
            let users = res.data
            users.map(elem => {
              if(elem.email == values.email.value) {
                setUser(elem)
                console.log(elem)
                localStorage.setItem('name', elem.name)
                localStorage.setItem('surname', elem.surname)
                localStorage.setItem('email', elem.email)
                localStorage.setItem('role', elem.role.name)
              }
            })
          })

          Swal.fire({
            icon: 'success',
            title: 'Iniciando sesión...',
            timer: 1000,
            timerProgressBar: true,
          })   
          window.setTimeout(() => {
            setValues((prevState) => ({...prevState,login:true,redirect:true}));
            navigate(url)       
          }, 1000)
          setIsFromDetail(false)
        }
      })
    } else{
      showErrors('loginStatus')
    }
  }

  function handleChange(evt) {
      const { name, value } = evt.target;
      const newValues = {
          ...values,
          [name]:{
              ...values[name],
              value: value, 
          } 
      };
      setValues(newValues);
  }

  const clearErrors = (err) =>{
    let error = document.querySelector(`#${err}`)
    error.style.display = 'none'
  }

  const showErrors = (err) =>{
    let error = document.querySelector(`#${err}`)
   
    error.style.display = 'block'
  }

  return (
    <>
      {values.redirect ? <Navigate to='/'/> : ''}
      <div className={style.btnClose}>
        <Link to="/"><button className={btnStyle.myBtn}><MdOutlineClose color='var(--secondary)' fontSize="2rem" /></button></Link>
      </div>
      {isFromDetail ?  
        <div className='d-flex justify-content-center mx-4 mt-2 mt-md-0'>
          <div className={`d-flex align-items-center py-2 px-3 ${style.errorReservation}`}>
            <RiErrorWarningFill size={30} color='#B00020'/>
            <p className='mb-0 ps-2 fw-600'>Para realizar una reserva necesitas estar logueado</p>
          </div>
        </div> : null
      }
      <div className={style.loginContainer}>
        <form className={`${style.loginForm} marginB2`} id="login-form" onSubmit={handleSubmit}>
          <h2 className={style.title}>Iniciar Sesión</h2>
          <div className={`${style.formInputs} ${style.formLogin} marginB1 align-items-stretch`}>
            <div className={style.items}>
              <label htmlFor="email">Correo electrónico</label>
              <input id="email" name="email" type="text" className={`form-control ${style.input}`} value={values.email.value} onChange={handleChange} aria-invalid={values.email.error} onClick={() => {
                  if(!values.login){
                    clearErrors('loginStatus')
                  }
                }} />
            </div>
            <div className={`mt-4 ${style.items}`}>
              <label htmlFor="password">Contraseña</label>
              <input id="password" name="password" type="password" className={`form-control ${style.input}`} value={values.password.value} onChange={handleChange} aria-invalid={values.password.error} onClick={() => {
                  if(!values.login){
                    clearErrors('loginStatus')
                  }
                }} />
            </div>
          </div>
          <CustomButton content={"Ingresar"} styleType={'highlight'} others='mb-2' />
          <p id="loginStatus" className={style.errorCredentials} style={{ display: 'none' }}>Por favor vuelva a intentarlo, sus credenciales son inválidas</p>
          <p className='marginT1'>¿Aún no tienes cuenta? <Link to='/register'>Regístrate</Link></p>
        </form>
      </div>
    </>
  );
}

export default Login;