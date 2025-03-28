import {React, useState} from 'react';
import TripsList from './TripsList/TripsList';
import './LateralMenu.css'
import '../../styles/button.css';
import { BsArrowLeftSquare, BsX, BsList} from "react-icons/bs";

function LateralMenu({trips_list}) {

    const [trip, setTrip] = useState(NaN);
    const [selected, setSelected] = useState(NaN)
    const [closed, setClosed] = useState(false)
    var upcoming_list = []
    var current_list = []
    var past_list = []

    const changeSelected = (newValue) => {
        if (newValue !== selected) {
          if (selected) {
            selected.setClick(false);
          }
          setSelected(newValue);
          if (newValue)
            setTrip(newValue.trip_id)
        }
    };

    trips_list.map((trip) => {
        var status = trip.getStatus()
        if (status === 0)
            upcoming_list.push(trip)
        else if (status === 1)
            current_list.push(trip)
        else if (status === 2)
            past_list.push(trip)
    })


    if (!closed) {
        return (
            <aside className='menu-container'>
                <div className='back-icon-container'><BsList size={25} className="close-button" onClick={() => setClosed(!closed)}/></div>
                <button className="button-new-trip">Create new trip</button>
                <TripsList trip_list={upcoming_list} title={"Upcoming Trips"} selection={changeSelected}></TripsList>
                <TripsList trip_list={past_list} title={"Past Trips"} colors={['#E9E9E9']} selection={changeSelected}></TripsList>
            </aside>
        );
    }
}

export default LateralMenu;
