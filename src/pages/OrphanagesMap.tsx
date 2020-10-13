import React from 'react';
import {Link} from 'react-router-dom';
import {FiPlus} from 'react-icons/fi';
import {Map, TileLayer} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import target from '../assets/target.svg';
import '../styles/pages/orphanages-map.css';

function OrphanagesMap(){
    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={target} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Guarulhos</strong>
                    <span>São Paulo</span>
                </footer>
            </aside>
            <Map 
                center={[-23.4422272,-46.5272832,]}
                zoom={13}
                style={{width: '100%' ,height:'100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={26} color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap;