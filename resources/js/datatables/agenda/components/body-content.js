import React from 'react';

export default class BodyContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="time-grid-item">
                {
                this.props.childElements && this.props.childElements.slice(1).map((element, index) => {
                    return (
                        element && element.width && <div key={index} className="grid-row" style={{width: element.width}}>
                            { element.reservations.map(reservation => {
                                if(reservation.date == this.props.currentDate && reservation.starttime < reservation.endtime) {
                                    var start = reservation.starttime.split(":")
                                    var end = reservation.endtime.split(":")
                                    var cardMarginTop = ((start[0] -8) * 35) + (Math.round(start[1] / 15) * 8.75) + 3;
                                    var cardHeight = ((((end[0] - start[0]) * 4) + ((Math.round(end[1]) - Math.round(start[1])) / 15)) * 8.75)  + 1
                                    if(cardHeight < 577) {
                                        return ( 
                                            <div className="reservation-card d-flex flex-column justify-content-around align-items-center" key={index} style={{marginLeft: 1,marginTop: cardMarginTop, width: element.width, backgroundColor: `rgb(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256})`, height: cardHeight}}>
                                                <span style={{fontSize: '0.6vw'}}>{reservation.title}</span>
                                                <span style={{fontSize: '0.6vw'}}>{reservation.starttime} - {reservation.endtime}</span>
                                            </div>
                                        )
                                    }
                                }
                            })}
                        </div>
                    )
                })
                }
            </div>
        )

    }
}
