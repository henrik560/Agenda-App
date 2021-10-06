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
        console.log(this.props.childElements)
    }

    render() {
        return(
            <div className="time-grid-item"></div>
        )

    }
}