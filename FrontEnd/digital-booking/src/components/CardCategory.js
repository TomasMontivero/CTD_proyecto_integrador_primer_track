import style from '../assets/css/cardCategory.module.css'

export default function CardCategory({ id, name, img, amountAvailable, filterProducts }) {

  return (
    <div id={id} onClick={ filterProducts }>
      <div className={style.card}>
        <img alt="" src={img} />
        <div className={style.cardBody}>
          <div className={`pt-3 ${style.cardText}`}>
            <h3>
              {name}
            </h3>
            <p>{amountAvailable} {name}</p>
          </div>
        </div>
      </div>
    </div>
  )

}