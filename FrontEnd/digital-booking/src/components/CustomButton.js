import style from '../assets/css/button.module.css'

export default function CustomButton({ content, styleType, others, clickAction }){
  const buttonClass = `${style[styleType]} ${style.myBtn} ${others}`;

  return (
    <button className={buttonClass} onClick={clickAction}>{content}</button>
  )
}