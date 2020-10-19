import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import Leaflet from 'leaflet';
import api from '../services/api';

import 'leaflet/dist/leaflet.css';

import target from '../assets/target.svg';
import '../styles/pages/hospitals-map.css';

const mapIcon = Leaflet.icon({
    iconUrl: target,

    iconSize: [58,68],
    iconAnchor: [29,68],
    popupAnchor: [170,2]
})

interface Hospital {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

function HospitalsMap(){
    const [hospitals, setHospitals] = useState<Hospital[]>([]);

    useEffect(() => {
        api.get('/hospitals').then(response => {
            setHospitals(response.data)
        })
    },[])

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={target} alt="Hope"/>

                    <h2>Escolha um hospital no mapa</h2>
                    <p>Muitas crianças estão esperando a sua surpresa :)</p>
                </header>
                <footer>
                    <strong>Guarulhos</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>
            {/* -23.4422272,-46.5272832,13z */}
            <Map 
                center={[-23.4422272,-46.5272832]}
                zoom={13}
                style={{width: '100%' ,height:'100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

               {hospitals.map((hospital) => {
                   return(
                    <Marker key={hospital.id} icon={mapIcon} position={[hospital.latitude,hospital.longitude]}>
                        <Popup 
                        closeButton={false} 
                        minWidth={240} 
                        maxWidth={240}
                        className="map-popup"
                        >
                            {hospital.name}
                            <Link to={`/hospitals/${hospital.id}`}>
                                <FiArrowRight size={26} color="#FFF" />
                            </Link>
                        </Popup>
                    </Marker>
                   )
               })}
            </Map>

            <Link to="/hospitals/create" className="create-orphanage">
                <FiPlus size={26} color="#FFF" />
            </Link>
        </div>
    )
}

export default HospitalsMap;