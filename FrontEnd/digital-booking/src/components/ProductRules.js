import style from '../assets/css/productDetail.module.css'

export const ProductRules = () => {
  return (
    <>
      <h2 className="px-4 fw-semibold">Qué tenés que saber</h2>
      <hr style={{border: '1px solid var(--primary)', backgroundColor: 'var(--primary)', opacity: 1}} />
      <div className={`px-4 mt-4`}>
        <div className={`row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ${style.detailPolitics}`}>
          <div className="col-auto">
            <h4>Normas del alojamiento</h4>
            <ul>
              <li className="mt-3">Check-in: 13:00</li>
              <li className="mt-3">Check-out: 10:00</li>
              <li className="mt-3">No está permitido fumar dentro del establecimiento</li>
            </ul>
          </div>
          <div className="col-auto">
            <h4>Salud y seguridad</h4>
            <ul>
              <li className="mt-3">Se aplican las pautas de distanciamiento social y demás normas relacionadas con el coronavirus</li>
              <li className="mt-3">Detector de humo</li>
              <li className="mt-3">Depósito de seguridad</li>
            </ul>
          </div>
          <div className="col-auto">
            <h4>Política de cancelación</h4>
            <ul>
              <li className="mt-3">Las condiciones de cancelación y de pago por adelantado pueden variar según el tipo de alojamiento. Introduce las <b>fechas de tu estancia</b> y consulta las condiciones de la habitación seleccionada.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}