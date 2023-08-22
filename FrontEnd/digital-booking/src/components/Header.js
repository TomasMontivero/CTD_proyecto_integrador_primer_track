import logo from '../assets/img/logo.png'
import logoMobile from '../assets/img/logo-mobile.png'
import iconFb from '../assets/img/icons/icon-facebook-secondary.svg'
import iconTw from '../assets/img/icons/icon-twitter-secondary.svg'
import iconIg from '../assets/img/icons/icon-ig-secondary.svg'
import iconLinkedIn from '../assets/img/icons/icon-linkedin-secondary.svg'
import divider from '../assets/img/icons/line-yellow.svg'
import colors from '../assets/css/colors.module.css'
import style from '../assets/css/header.module.css'
import btnStyle from '../assets/css/button.module.css'
import mainStyle from '../index.css'
import CustomButton from './CustomButton'
import { useContext, useEffect, useState } from 'react'
import { UserContext, useWidthContext } from '../context'
import { isMobile } from '../App'
import { UserLoggedContext } from '../context'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {FiMenu} from 'react-icons/fi'
import { MdOutlineClose } from "react-icons/md";
import Button from 'react-bootstrap/Button';

export default function Header(){
  const [ user, ] = useContext(UserContext);
  const widthSize = useWidthContext()
  const [ userFullName, setUserFullName ] = useState('Emely Mack')
  const [ isLogged, setIsLogged ] = useContext(UserLoggedContext)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(()=>{
    if(localStorage.jwt){
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [])

  useEffect(() =>{

  }, [localStorage])

  const handleLogout = () => {
    localStorage.clear()
    window.location.href = '/'
    setIsLogged(false)
  }

  const renderUserMenu = () =>{
    return (
      <div className={style.navContainerLogged}>
        <div className='d-flex flex-column flex-sm-row align-items-end align-items-sm-start me-2 me-sm-0'>
          {localStorage.role === 'admin' ? 
          <div className='d-none d-md-flex align-self-center me-2'>
            <Link to='administration'>
              <Button variant='light' className='fw-600' style={{color: 'var(--font-color)', fontSize: '18px'}}>Administración</Button> 
              <img src={divider} />
            </Link>
          </div>
          : null}
          <CustomButton styleType="button" content={<div className={style.initialAvatar}>{localStorage.name && localStorage.surname ? `${localStorage.name.slice(0,1)}${localStorage.surname.slice(0,1)}` : ''}</div>} />
          <span className={'fw-600 mt-2 mt-sm-0'} style={{color: 'var(--font-color)', fontSize: '20px'}}>
            Hola,<br/> <span className={style.userNameHeader}>{localStorage.name && localStorage.surname ? `${localStorage.name} ${localStorage.surname}` : ''}</span>
          </span>
        </div>
        <div style={{display: !isMobile(widthSize) ? "block" : "none"}}>
          <CustomButton content={'X'} others={btnStyle.logoutBtn} clickAction={() => handleLogout()} />
        </div>
      </div>
    )
  }

  const renderNavMobile = () => {
    return(
      <>
        <Link to={"/"}>
          <div className={style.logoContainer}>
            <img src={logoMobile} className={style.logoMobile} alt="Digital Booking" />
          </div>
        </Link>
      
        <div className={style.navContainer}>
          <a href="#sidenav" className={`${style.myBtn} ${style.open}`}><FiMenu fontSize="3rem"/></a>
            <div className={style.sidenav} id="sidenav">
              <ul style={{fontSize: '18px'}}>
                <div id='navHeader' className={style.navHeader}>
                  <a href="#!" className={`${style.btnClose} p-2`} style={{alignSelf: 'flex-start'}}>
                    <button className={btnStyle.myBtn}><MdOutlineClose color='#fff' fontSize="2.3rem" /></button>
                  </a>
                  { !isLogged ? <h4>MENÚ</h4> : renderUserMenu() }
                </div>
                <li className={style.item}>
                  <Link to='/' onClick={() => {window.open("#!","_self")}}>Inicio</Link>
                </li>
                { !isLogged ? 
                  <>
                  <li className={style.divider}></li>
                  <li className={style.item} style={{ display: location.pathname !== '/register' ? "block" : "none" }}>
                    <Link to='register' onClick={() => {window.open("#!","_self")}}>Crear cuenta</Link>
                  </li>
                  <li className={style.divider}></li>
                  <li className={style.item} style={{ display: location.pathname !== '/login' ? "block" : "none" }}>
                    <Link to='login' onClick={() => {window.open("#!","_self")}}>Iniciar sesión</Link>
                  </li>
                  </> : 
                  <>
                  <li className={style.divider}></li>
                  {localStorage.role === 'admin' ? 
                  <li className={style.item}>
                    <Link to='/administration' onClick={() => {window.open("#!","_self")}}>Administración</Link>
                  </li> : null}
                  
                  </>
                  }
                
                <li className={style.divider}></li>
              </ul>
              {isLogged ? 
              <div className='me-3'>
                <p style={{fontSize: '20px'}}>¿Deseas <Button onClick={() => handleLogout()} className='p-0 pb-1' style={{color: 'var(--primary)', backgroundColor: 'transparent', border: 'none', fontWeight: 700, fontSize: 'inherit'}}>cerrar sesión</Button>?</p>
                <p className={style.divider}></p>
              </div> : null
              }

              <div className={`me-2 p-3 ${style.rrssContainer}`}>
                <img src={iconFb} alt="Facebook" className='me-3' />
                <img src={iconLinkedIn} alt="LinkedIn" className='me-3'/>
                <img src={iconTw} alt="Twitter" className='me-3' />
                <img src={iconIg} alt="Instagram" />
              </div>
            </div>
          <a href="#!" className={`${style.sidenavOverlay}`}></a>
          {/* <CustomButton onClick={() =>{setSideNavRender(!sideNavRender)}} content={<FiMenu fontSize="3rem"/>}></CustomButton> */}
        </div>
      </>
    )
  }

  const renderNavDesktop = () => {
    return (
      <>
        <Link to={"/"} className='text-decoration-none'>
          <div className={style.logoContainer}>
            <img src={logo} alt="Digital Booking" />
            <div>
              <span><i>Sentite como en tu hogar</i></span>
            </div>
          </div>
        </Link>

        { isLogged ? renderUserMenu() :
          <div className={style.navContainer}>
            <div className={style.btnContainer}>
              <Link to="/register" style={{ display: ((location.pathname !== '/register') && !isMobile(widthSize)) ? "block" : "none" }}>
                <CustomButton content={"Crear cuenta"} styleType={'primary'} others={btnStyle.btnHeader} />
              </Link>

              <Link to="/login" style={{ display: (!isMobile(widthSize) && (location.pathname !== '/login')) ? "block" : "none" }}>
                <CustomButton content={"Iniciar sesión"} styleType={'primary'} others={btnStyle.btnHeader} />
              </Link>
            </div>
          </div> }
      </>
    )
  }


  return (
    <div className={style.header}>
      {isMobile(widthSize) ? renderNavMobile() : renderNavDesktop() }
    </div>
  )
}