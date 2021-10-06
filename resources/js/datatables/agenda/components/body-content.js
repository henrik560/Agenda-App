import React from 'react';

export default class BodyContent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log('mount')
        console.log(this.props.childElements)
    }

    componentDidUpdate() {
        console.log('update')
        this.props.childElements.map((e) => {
            console.log(e)
        })
    }

    render() {
        if(this.props.childElements && this.props.childElements.length != 0) {
            var element = this.props.childElements.map((element, index) => {
                return (
                <div key={index} className="grid-row" style={{width: element}}>
                    <div className="reservation-card"></div>
                    {/* TODO maak een object als probs per zaal dus : { zaal_id: 1, breedte: 100, reservations: [{ naam: bala.}]}
                    Dan loop je over het props object en pak je een reservation eruit, als een resarvation om 8 uur begint is margin-top 0px
                    om het kwartier is margin 8.75px dus half 9 is margin-top 17.5 en height is eind tijd - begin tijd / 4 (aantal kartieren) * 8.75 (margin)
                    dus 8 tot 10 is 2 uur / 4 is 8 * 8.75 = 70px hoogte  */}
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
