import style from '../assets/css/banner.module.css'
import CustomButton from './CustomButton';
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { useEffect } from 'react';
import iLocation from '../assets/img/icons/location-dot-solid.svg'
import iconLocationPrimary from '../assets/img/icons/location-dot-primary.svg'
import { getProducts, getLocations } from '../services/api';

export default function SearchBanner({ filterByLocation, filterProducts, date, setDate }) {
  // const [date, setDate] = useState();
  const [ inputRange, setInputRange ] = useState("Check in - Check out")
  const [ inputLocation, setInputLocation ] = useState("¿A dónde vamos?")
  const [ locations, setLocations ] = useState([])
  const [showCalendar, setShowCalendar] = useState(false);

  const setDateInput = () =>{
    const dateFrom = date[0].toLocaleDateString()
    const dateTo = date[1].toLocaleDateString()
    const datesRange = `${dateFrom} - ${dateTo}`
    return datesRange;
  }

  useEffect(() =>{
    if(date){
      setInputRange(setDateInput())
    }
    // getProducts()
    // .then((res)=>{console.log(res.data)})
    setShowCalendar(false);
  }, [date])

  useEffect(() => {
    getLocations()
    .then((res) => {
      setLocations(res.data);
    })
  }, []);

  return (
    <div className={style.bannerContainer}>
      <div className={style.bannerTitle}>
        <h1 className={style.bannerTitle}>Encontrá las mejores ofertas en hoteles</h1>
        <p>Buscá los mejores hoteles en los destinos más mágicos...</p>
      </div>
      <div className='container'>
        <form className={`row row-cols-1 row-cols-lg-3 ${style.bannerForm}`}>
          <div className='col-12 col-lg-4 d-flex justify-content-center d-lg-block'>
          <Dropdown>
            <Dropdown.Toggle id="inputLocation" name="inputLocation" className={`d-flex justify-content-between align-items-center ${style.location} ${style.bannerInputs}`}>
              <span><img src={ iLocation } width={20} className='me-1' alt=''/> { inputLocation }</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className={style.dropdownMenu}>
              {locations.map((location) => {
                return (
                  <div id={location.id} key={location.id} onClick={ filterByLocation }>
                    <Dropdown.Item className={`d-flex align-items-center ${style.dropdownItem}`} onClick={() => setInputLocation(`${location.name}, ${location.country}`) }>
                      <img src={iconLocationPrimary} width={25} height={25} className='me-3' alt=''/>
                      <div className='d-flex flex-column' style={{fontSize: 15}} >
                        <span className='fw-bold'>{location.name}</span>
                        <span>{location.country}</span>
                      </div>
                    </Dropdown.Item>
                    <hr className='my-2' />
                  </div>
                )
              })}
            </Dropdown.Menu>
          </Dropdown>
          </div>
          <div className='col-12 col-lg-4 mt-2 mt-lg-0'>
            <input
              value={inputRange}
              onChange={setInputRange}
              onClick={() => setShowCalendar(!showCalendar)}
              className={`${style.dates} ${style.bannerInputs}`}
              readOnly="readonly"
            />
            <Calendar
              className={`calendar ${showCalendar ? "" : "hide"}`}
              value={date}
              onChange={setDate}
              selectRange={true}
              minDate={new Date()}
            />

          </div>
          <div className='col-12 col-lg-3 d-flex justify-content-center'>
            <CustomButton styleType="highlight" content={"Buscar"} others={`${style.btnSubmit}`} name="submit" clickAction={filterProducts} />
          </div>
        </form>
      </div>
    </div>
  )
}
