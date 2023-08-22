import style from '../assets/css/footer.module.css';
import logo_fb from '../assets/img/icons/icon_facebook.png'
import logo_linkedin from '../assets/img/icons/icon_linkedin.png'
import logo_twitter from '../assets/img/icons/icon_twitter.png'
import logo_ig from '../assets/img/icons/icon_instagram.png'
import logo from '../assets/img/logo.png'

export default function Footer(){
  return (
    <div className={style.footer}>
      <div className={style.copyright}>
        <span>© 2021 Digital Booking</span>
      </div>
      <div className={style.mediaContainer}>
        <a href=""><img src={logo_fb} alt="Link Facebook" /></a>
        <a href=""><img src={logo_linkedin} alt="Link LinkedIn" /></a>
        <a href=""><img src={logo_twitter} alt="Link Twitter" /></a>
        <a href=""><img src={logo_ig} alt="Link Instagram" /></a>
      </div>
    </div>
  )
}