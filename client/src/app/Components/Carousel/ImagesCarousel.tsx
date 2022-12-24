import React from 'react'
import banner1 from './banner1.png'
import banner2 from './banner2.png'

function ImagesCarousel() {
  return (
    <>
     <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel"> 
    <div className="carousel-inner">
      <div className="carousel-item active" data-bs-interval="4000">
        <img src={banner1} className="d-block w-100" alt="..."/>
      </div>
      <div className="carousel-item" data-bs-interval="4000">
      <img src={banner2} className="d-block w-100" alt="..."/>
      </div>
      <div className="carousel-item" data-bs-interval="4000">
      <img src={banner1} className="d-block w-100" alt="..."/>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
    </>
  )
}

export default ImagesCarousel