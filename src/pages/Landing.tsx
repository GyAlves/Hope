import React from 'react';
import {Link} from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

import logoImg from '../assets/logo.svg';
import '../styles/pages/landing.css';

function Landing(){
    return (
        <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="Hope" />
        <main>
          <h1>
            Nesse momento de crise espalhe esperança
          </h1>
          <p>
            Envie presentes para crianças em situações hospitalares 
          </p>
        </main>
       <div className="location">
         <strong>Guarulhos</strong>
         <span>São Paulo</span>
       </div>

       <Link to="/app" className="enter-app"> 
        <FiArrowRight size={26} color="rgba(0,0,0,0.6)"/>
       </Link>
      </div>
    </div>
    )
}

export default Landing;