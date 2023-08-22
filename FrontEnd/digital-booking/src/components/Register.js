import style from '../assets/css/login-register.module.css'
import CustomButton from './CustomButton' 
import btnStyle from '../assets/css/button.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineClose } from "react-icons/md";
import React from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

function Register() {
  const navigate = useNavigate()
  const emailRegexp = new RegExp(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/);

  const [values, setValues] = React.useState({
      name:{
          value:'',
          error: false
      },
      surname:{
          value:'',
          error: false
      },
      email:{
          value:'',
          error: false,
      },
      password:{
          value:'',
          error: false
      },
      confirmPass:{
          value: '',
          error: false
      },
      register: false
  });

  /* -------------------------------------------------------------------------- */
  /*                  Escuchamos el SUBMIT y preparamos el envío                */
  /* -------------------------------------------------------------------------- */
  function handleSubmit(evt) {
    const form = document.querySelector('form')
    evt.preventDefault();

    console.log(values);

    // fetch de login a la api
    let body = {
      name: values.name.value,
      surname: values.surname.value,
      email: values.email.value,
      password: values.password.value
    }

    // configuramos la request del Fetch
    const settings = {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
          'Content-Type': 'application/json'
      }
    };

    if(validarForm()){
      realizarRegister(settings);
    } else{
      console.log("ERROR NO SE PUDO REGISTRAR EL USUARIO")
    }

    // Reiniciamos el formulario
    form.reset();
      
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

  /* -------------------------------------------------------------------------- */
  /*                    Realizamos el registro [POST]                           */
  /* -------------------------------------------------------------------------- */
  function realizarRegister(settings) {
    const url = 'http://digitalbooking.sytes.net:8080'
    // hacemos el fetch a la api, con el path correspondiente según la config de la API, indicando como 2do parametro los datos a enviar
    fetch(`${url}/register`, settings)
    .then( response =>{
        console.log(response);

        if(!response.ok){
          MySwal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Lamentablemente no ha podido registrarse. Por favor intente de nuevo'
          })           
        }

        return response.json()
    }) 
    .then( data => {
        console.log('Realizando registro...');
        console.log(data);

        if(data.jwt){
          // guardo en LocalStorage 
          localStorage.setItem('jwt', JSON.stringify(data.jwt))
          Swal.fire({
            icon: 'success',
            title: '¡Registro exitoso!',
            text: 'Puede iniciar sesión.'
          })   

          // redireccionamos al login
          window.setTimeout(() => {
              navigate('/')
          }, 1000)
        }
        
    })
    .catch( err => {
        console.log("ERROR: "+ err);
    })
  };

  /* ------------- VALIDAMOS LOS CAMPOS ---------------- */
  function validarForm(){
    const hasErrorName = values.name.value.length > 0 ? false : true;
    setValues((prevState) => ({...prevState, name:{...values.name,error:hasErrorName}}));

    const hasErrorSurname = values.surname.value.length > 0 ? false : true;
    setValues((prevState) => ({...prevState, surname:{...values.surname,error:hasErrorSurname}}));

    const hasErrorEmail = !emailRegexp.test(values.email.value);
    setValues((prevState) => ({...prevState, email:{...values.email,error:hasErrorEmail}}));
    
    const hasErrorPass = values.password.value.length > 6 ? false : true;
    setValues((prevState) => ({ ...prevState, password:{...values.password,error:hasErrorPass}}));

    const hasErrorConfirmPass = values.confirmPass.value === values.password.value ? false : true;
    setValues((prevState) => ({ ...prevState, confirmPass:{...values.confirmPass,error:hasErrorConfirmPass}}));

    if(hasErrorName || hasErrorSurname || hasErrorEmail || hasErrorPass || hasErrorConfirmPass){
      return false
    } else {
      return true
    }
  }

   /* ------------- MANEJO DE ERRORES EN EL FRONT --------------- */
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
      <div className={style.btnClose}>
        <Link to="/"><button className={btnStyle.myBtn}><MdOutlineClose color='var(--secondary)' fontSize="2rem" /></button></Link>
      </div>

      <div className={style.registerContainer}>
        <form className={`${style.loginForm} marginB2`} id="login-form" onSubmit={handleSubmit}>
          <h2 className={style.title}>Crear cuenta</h2>
          <div className={`${style.formInputs} ${style.formRegister} marginB1`}>
            <div className='row row-cols-2 g-2'>
              <div className={`${style.items}`}>
                <label htmlFor="name">Nombre</label>
                <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  className={`form-control ${style.inputRegister}`} 
                  value={values.name.value} 
                  onChange={handleChange} 
                  aria-invalid={values.name.error} 
                  onClick={() => {
                    if(values.name.error){
                      clearErrors('errorName')
                    }
                  }}
                />                
              </div>
              <div className={`${style.items}`}>
                <label htmlFor="surname">Apellido</label>
                <input 
                  id="surname" 
                  name="surname" 
                  type="text" 
                  className={`form-control ${style.inputRegister}`} 
                  value={values.surname.value} 
                  onChange={handleChange} 
                  aria-invalid={values.surname.error} 
                  onClick={() => {
                    if(values.surname.error){
                      clearErrors('errorSurname')
                    }
                  }}
                />
                <p id="errorSurname" className={style.error} style={{ display: values.name.error || values.surname.error ? showErrors('errorSurname') : "none" }}>Los campos no pueden estar vacíos</p>
              </div>
            </div>
            <div className={`mt-3 ${style.items}`}>
              <label htmlFor="email">Correo electrónico</label>
              <input 
                id="email" 
                name="email" 
                type="text" 
                className={`form-control ${style.inputRegister}`} 
                value={values.email.value} 
                onChange={handleChange} 
                aria-invalid={values.email.error} 
                onClick={() => {
                  if(values.email.error){
                    clearErrors('errorEmail')
                  }
                }}
              />
              <p id="errorEmail" className={style.error} style={{ display: values.email.error ? showErrors('errorEmail') : "none" }}>Por favor, ingrese una dirección de correo válida</p>
            </div>
            <div className={`mt-3 ${style.items}`}>
              <label htmlFor="password">Contraseña</label>
              <input 
                id="password" 
                name="password" 
                type="password" 
                className={`form-control ${style.inputRegister}`} 
                value={values.password.value} 
                onChange={handleChange} 
                aria-invalid={values.password.error} 
                onClick={() => {
                  if(values.password.error){
                    clearErrors('errorPass')
                  }
                }}
              />
              <p id="errorPass" className={style.error} style={{ display: values.password.error ? showErrors('errorPass') : "none" }}>Por favor, ingrese una contraseña válida</p>
            </div>
            <div className={`mt-3 ${style.items}`}>
              <label htmlFor="confirm-password">Confirmar contraseña</label>
              <input 
                id="confirm-password" 
                name="confirmPass" 
                type="password" 
                className={`form-control ${style.inputRegister}`} 
                value={values.confirmPass.value} 
                onChange={handleChange} 
                aria-invalid={values.confirmPass.error} 
                onClick={() => {
                  if(values.password.error){
                    clearErrors('errorConfirmPass')
                  }
                }}
              />
              <p id="errorConfirmPass" className={style.error} style={{ display: values.confirmPass.error ? showErrors('errorConfirmPass') : "none" }}>Las contraseñas no coinciden</p>
            </div>
          </div>
          <CustomButton content={"Registrarme"} styleType={'highlight'} others='mb-2'/>
          <p className='marginT1'>¿Ya tienes una cuenta? <Link to='/login'>Iniciar sesión</Link></p>
        </form>
      </div>
    </>
  );
}

export default Register;