import React from 'react';
import ReactDom from 'react-dom'; 

export class header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buildings: console.log(this.fetchData()),
        }
    }

    fetchData() {
        return fetch("https://jsonapi.org/").then(res => res.json());
    }

    render() {}

}