import React from 'react';
import { useHistory } from "react-router-dom";
import { FiArrowLeft} from "react-icons/fi";

import mapMarkerImg from '../assets/target.svg';
import '../styles/components/sidebar.css';

export default function Sidebar(){
    const { goBack } = useHistory();

    return(
        <aside className="app-sidebar">
            <img src={mapMarkerImg} alt="Hope" />

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color="#FFF" />
                </button>
            </footer>
        </aside>
    )
}