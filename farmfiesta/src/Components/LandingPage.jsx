import React from 'react'
import { Link } from "react-router-dom";
function LandingPage() {
  return (
    <div className='row' style={{margin:'0 5%',}}>
        <div className='col-lg-6'>
            <h1 className='fw-bold my-2 text-start' style={{fontSize:'48px', color:'#39C758'}}>Welcome to Farm Fresh Fiesta</h1>
            <p className='text-start' style={{fontSize:"24px",lineHeight:'40px'}}>Discover the freshest, locally-sourced produce and artisanal 
                goods at our vibrant farmer's market. We're your one-stop 
                destination for all things fresh and flavorful.
            </p>
            <Link to='/shop' className='btn btn-primary fw-semibold p-2 m-5' style={{background:'#39C758',border:'none', width:'40%'}}>Shop now</Link>
        </div>
        <div className="col-lg-6">
            <img src="https://cdn.pixabay.com/photo/2013/07/13/01/22/vegetables-155616_1280.png" alt="" 
            style={{width:'100%'}}/>
        </div>
    </div>
  )
}

export default LandingPage