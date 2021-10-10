import React from 'react';

export default class BodyContent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.childElements && this.props.childElements.length != 0) {
            var element = this.props.childElements.map((element, index) => {
                console.log(this.props.currentDate)
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
                    {/* TODO maak een object als probs per zaal dus : { zaal_id: 1, breedte: 100, reservations: [{ naam: bala.}]}
                    Dan loop je over het props object en pak je een reservation eruit, als een resarvation om 8 uur begint is margin-top 0px
                    om het kwartier is margin 8.75px dus half 9 is margin-top 17.5 en height is eind tijd - begin tijd / 4 (aantal kartieren) * 8.75 (margin)
                    dus 8 tot 10 is 2 uur / 4 is 8 * 8.75 = 70px hoogte of tijd / 15 (15 min in uir)  */}
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
