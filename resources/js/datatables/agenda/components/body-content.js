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
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                    <div className="row-hour">
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                        <div className="quarter_hour"></div>
                    </div>
                </div>
                )
            })
        }
        return(
            <div className="time-grid-item">
                {element}
                <div className="reservation-card"></div>
            </div>
        )

    }
}
