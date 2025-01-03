import {React, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import TripService from '../services/TripService';

import MultiStepForm from "../components/TripCreationForm/MultiStepForm";
import TripSideBarPreview from "../components/TripSideBarPreview";
import TripPreview from '../components/TripPreview'

import "../styles/Main.css";
import '../components/TripCreationForm/TripCreation.css';
import banner from "../static/svg/trips-banner.svg"
import arrowDown from "../static/icons/arrow-down.svg"


function Main() {

    const navigate = useNavigate();

    const [upcomingTripsAll, setUpcomingTripsAll] = useState([]);
    const [pastTripsAll, setPastTripsAll] = useState([]);

    const [upcomingTrips, setupcomingTrips] = useState([]);
    const [pastTrips, setPastTrips] = useState([]);

    const [showingUpcomingTrips, setShowingUpcomingTrips] = useState(true);
    const [showingPastTrips, setShowingPastTrips] = useState(true);
    

    useEffect(() => {
        fetchTripsInfo();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleOverlayClick = (e) => {
        // Verifica se l'utente ha cliccato sull'overlay e non sul contenuto del modal
        if (e.target.className === "modal-overlay") {
            closeModal();
        }
    };

    const fetchTripsInfo = async () => {
        try {
            const token = localStorage.getItem('token'); // Recuperiamo il token da localStorage
            if (!token) {
                navigate("/login");
            }

            // Chiamata al servizio per ottenere le informazioni del profilo
            const response = await TripService.getTrips(token);

            if (response) {
                var _upcomingTrips = [];
                var _pastTrips = [];
                const today = Date.now();
                //console.log("today: " + today.toString())
                
                for (const trip of response) {

                    const endDate = Date.parse(trip.endDate)
                    //console.log("end: " + endDate.toString())

                    // e' "past" quando la sua endDate e' prima di oggi, quindi minore
                    if (endDate < today) {
                        _pastTrips.push(trip);
                    }
                    else {
                        _upcomingTrips.push(trip);
                    }
                }

                // li salvo qua perche' gli altri array li modifico quando cerco
                setUpcomingTripsAll([..._upcomingTrips]);
                setPastTripsAll([..._pastTrips]);

                setupcomingTrips([..._upcomingTrips]);
                setPastTrips([..._pastTrips]);
                
            } else {
                console.error('Invalid response data');
            }
        } catch (error) {
            console.error('Error fetching trips information:', error);
        }
    };


    // Per gestire la ricerca
    const handleSearch = async (event) => {
        const value = event.target.value;
        //setSearchTerm(value);

        // resetta le trip se il campo e' vuoto
        if (!value) {
            setupcomingTrips(upcomingTripsAll);
            setPastTrips(pastTripsAll);
        }

        // se c'e' almeno un carattere
        else {
            const filteredUpcomingTrips = upcomingTripsAll.filter(
                (trip) => checkTripForSearch(trip, value.toLowerCase())
            );
            const filteredPastTrips = pastTripsAll.filter(
                (trip) => checkTripForSearch(trip, value.toLowerCase())
            );
            setupcomingTrips(filteredUpcomingTrips);
            setPastTrips(filteredPastTrips);
        }
    };

    const checkTripForSearch = (trip, searchTerm) => {

        // controllo se il titolo contiene searchTerm
        if (trip.title.toLowerCase().includes(searchTerm))
            return true;

        // controllo se una delle destinazioni contiene searchTerm
        const destinations = trip.locations.filter(location => (location.toLowerCase()).includes(searchTerm));
        if (destinations.length > 0)
            return true;

        return false;
    }



    // Per aprire/chiudere la sezione upcoming trips
    const toggleUpcomingTrips = () => {
        setShowingUpcomingTrips(!showingUpcomingTrips);
        document.getElementById("upcomingCheckbox").checked = !document.getElementById("upcomingCheckbox").checked;
    };
    // Per aprire/chiudere la sezione past trips
    const togglePastTrips = () => {
        setShowingPastTrips(!showingPastTrips);
        document.getElementById("pastCheckbox").checked = !document.getElementById("pastCheckbox").checked;
    };




    return (
        <div className="main">
            <div className="sidebar">
                <button onClick={openModal}>+ Create a trip</button>
                <div className="trip-list">
                    <h2>Upcoming trips</h2>
                    {upcomingTrips.map((trip, index) =>
                        <TripSideBarPreview key={index} trip={trip} reloadProfile={null}></TripSideBarPreview>
                    )}
                    <h2>Past Trips</h2>
                    {pastTrips.map((trip, index) =>
                        <TripSideBarPreview key={index} trip={trip} reloadProfile={null}></TripSideBarPreview>
                    )}
                </div>
            </div>
            <div className="content">
                {/* BARRA DI RICERCA */}
                <div className="search-bar">
                    <i className="bi bi-search"></i>
                    <input type="text" placeholder="Search a trip by title or destination" onChange={handleSearch}/>
                </div>
                {/*<div className="header"></div>*}
                {/* BANNER */}
                <div id='banner'>
                    <img id="bannerImg" src={banner}></img>
                </div>

                {/* UPCOMING TRIPS */}
                <div id='upcomingTrips'>
                    <button className="trips-top-row" onClick={toggleUpcomingTrips}>
                        <input type="checkbox" id="upcomingCheckbox"/>
                        <img id="upcoming-arrow-down" className="arrow-icon" src={arrowDown} alt="arrow-down"></img>
                        <h2>Upcoming trips</h2>
                    </button>
                    {showingUpcomingTrips &&
                        <div className='tripPreviewBlocksContainer'>
                            {upcomingTrips.map((trip, index) =>
                                <TripPreview key={index} trip={trip} reloadProfile={null}></TripPreview>
                            )}
                        </div>
                    }
                </div>
                {/* PAST TRIPS */}
                <div id='pastTrips'>
                    <button className="trips-top-row" onClick={togglePastTrips}>
                        <input type="checkbox" id="pastCheckbox"/>
                        <img id="past-arrow-down" className="arrow-icon" src={arrowDown} alt="arrow-down"></img>
                        <h2>Past trips</h2>
                    </button>
                    {showingPastTrips &&
                        <div className='tripPreviewBlocksContainer'>
                            {
                            // TEMPORANEO per test, poi andra' cambiato "upcomingTrips" con "pastTrips"
                            pastTrips.map((trip, index) =>
                                <TripPreview key={index} trip={trip} reloadProfile={null}></TripPreview>
                            )}
                                {// se ci sono meno di 4 elementi, aggiungi elementi trasparenti fino ad arrivare a 4 cosi' la riga viene fatta bene
                                 (pastTrips.length < 4) && <div className='transparent-tripBlock'></div>}
                                {(pastTrips.length < 3) && <div className='transparent-tripBlock'></div>}
                                {(pastTrips.length < 2) && <div className='transparent-tripBlock'></div>}
                        </div>
                    }
                </div>
            </div>
            {isModalOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="trip-box">
                        <MultiStepForm/>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Main;
