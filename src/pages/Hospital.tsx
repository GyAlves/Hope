import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';

import mapMarkerImg from '../assets/target.svg';

import '../styles/pages/hospital.css';
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const hopeMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

interface Hospital {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  open_hours: string;
  open_to_visitations: boolean;
  images: Array<{
    id: string;
    url: string;
  }>
}


interface HospitalParams{
  id: string;
}

export default function Hospital() {
  const params = useParams<HospitalParams>();

  const [hospital, setHospital] = useState<Hospital>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
      api.get(`/hospitals/${params.id}`).then(response => {
          setHospital(response.data)
      })
  },[params.id])

  if(!hospital){
    return <p>Buscando detalhes...</p>
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={hospital.images[activeImageIndex].url} alt={hospital.name}/>

          <div className="images">
            {hospital.images.map((image, index) => {
              return(
                <button 
                  key={image.id} 
                  className={activeImageIndex === index ? 'active': ''} 
                  type="button"
                  onClick={(() => {
                    setActiveImageIndex(index);
                  })}
                >
                  <img src={image.url} alt={hospital.name} />
                </button>
              )
            })}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{hospital.name}</h1>
            <p>{hospital.about}</p>

            <div className="map-container">
              <Map 
                center={[hospital.latitude,hospital.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                <Marker interactive={false} icon={hopeMapIcon} position={[hospital.latitude,hospital.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.latitude},${hospital.longitude}`}>
                Ver endereço no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para envio</h2>
            <p>{hospital.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {hospital.open_hours}
              </div>
              {hospital.open_to_visitations ?(
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Estamos abertos <br />
                  para visitação
                </div>
              )  : (
                <div className="open-on-weekends not-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não estamos abertos  <br />
                  para visitação
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}