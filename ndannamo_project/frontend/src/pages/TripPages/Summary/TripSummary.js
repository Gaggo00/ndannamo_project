import React, {useState} from 'react';
import {useLocation} from 'react-router-dom';
import InternalMenu from "../InternalMenu";
import "./TripSummary.css";
import edit_icon from "../../../static/svg/icons/edit_icon.svg";
import partecipants_icon from "../../../static/svg/icons/partecipants_icon.svg";

import partecipant_icon from "../../../static/svg/icons/partecipant_icon.svg";
import navigator_icon from "../../../static/svg/icons/navigator_arrow_icon.svg";
import globe from "../../../static/globe.png";
import DateUtilities from "../../../utils/DateUtilities";
import DateSummary from './DateSummary';

export default function TripSummary() {
    const location = useLocation();
    const tripInfo = location.state?.trip; // Recupera il tripInfo dallo stato
    const profileInfo = location.state?.profile; // Recupera il tripInfo dallo stato

    return (
        <div className="trip-info">
            <InternalMenu />
            <div className="trip-content">
                <div className="trip-top">
                    <span>
                        <strong>{tripInfo.title}</strong> {DateUtilities.yyyymmdd_To_ddmm(tripInfo.startDate,"-","/")} - {DateUtilities.yyyymmdd_To_ddmm(tripInfo.endDate,"-","/")}
                    </span>
                </div>
                <div className="trip-details">
                    <div className="sezione1">
                        <div className="header-section" id="section1">
                            <div className="icon-label">
                                <img src={partecipants_icon} alt="partecipant_icon"/>
                                <p>Participants</p>
                            </div>
                            <img id="edit" src={edit_icon} alt="edit_icon"/>
                        </div>
                        <div className="partecipants-section">
                            <div className="partecipants">
                                {tripInfo.list_participants.map((participant, index) => (
                                    <div className="partecipant" key={index}>
                                        {<img src={partecipant_icon} alt="partecipant_icon"/>}
                                        {participant !== profileInfo.nickname && <p>{participant}</p>}
                                        {participant === profileInfo.nickname && <p>you</p>}
                                    </div>
                                ))}
                            </div>
                            <button>+</button>
                        </div>
                    </div>
                    <div className="other-section">
                        <div className="mini-section" id="mini1">
                            <div className="header-section" id="section2">
                                <div className="icon-label">
                                    <img src={navigator_icon} alt="navigator_icon"/>
                                    <p>Destinations</p>
                                </div>
                                <img id="edit" src={edit_icon} alt="edit_icon"/>
                            </div>
                            <div className="internal-section">
                                <img src={globe} alt="globe"/>
                                <div className="list-destination">
                                    {tripInfo.locations.map((location, index) => (
                                            <p>{location}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <DateSummary/> 
                    </div>
                </div>
            </div>
        </div>
    );
}
