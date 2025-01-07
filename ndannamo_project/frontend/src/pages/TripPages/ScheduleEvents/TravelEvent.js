
import "./ScheduleEvents.css";


export default function TravelEvent({travel}) {

    return (
        <div className="event-block travel">
            <div className="event-block-left">
                <div className="info-left bold big">{travel.startTime}</div>
                <i className="bi bi-airplane-engines h1"></i>
                <div className="info-left bold">{travel.place.split(",")[0]}</div>
            </div>
            <div className="event-block-right">
                <div className="travel-name event-block-title">
                    Travel to {travel.destination.split(",")[0]}
                </div>
                <div className="address spaced">
                    <i className="bi bi-geo-alt icon-with-margin"></i>{travel.address}
                </div>
            </div>
        </div>
    );

}