import React from 'react';

export default class BodyContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.childElements && this.props.childElements.length != 0) {
            var element = this.props.childElements.map((element, index) => {
                return (
                <div key={index} className="grid-row" style={{width: element.width}}>
                    { element.reservations.map(reservation => {
                        if(reservation.date == this.props.currentDate) {
                            var start = reservation.starttime.split(":")
                            var end = reservation.endtime.split(":")
                            var cardMarginTop = ((start[0] -8) * 35) + (Math.round(start[1] / 15) * 8.75);
                            var cardHeight = (((end[0] -8) * 4) + (Math.round(end[1] / 15)) - ((start[0]-8) * 4) + (Math.round(start[1] / 15))) * 8.75
                            return ( 
                                <div className="reservation-card d-flex flex-column justify-content-around align-items-center" key={index} style={{marginLeft: 1,marginTop: cardMarginTop, width: element.width, backgroundColor: `rgb(${Math.random() * 256},${Math.random() * 256},${Math.random() * 256})`, height: cardHeight}}>
                                    <span>{reservation.title}</span>
                                    <span style={{fontSize: '0.75vw'}}>{reservation.starttime} - {reservation.endtime}</span>
                                </div>
                            )
                        }
                    })}
                </div>
                )
            })
        }
        return(
            <div className="time-grid-item">
                {element}
            </div>
        )

    }
}
