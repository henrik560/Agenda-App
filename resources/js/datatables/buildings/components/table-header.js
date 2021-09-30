import React from "react";

export default class overviewHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div id="table-head-row" className="d-flex flex-grow-1 justify-content-around align-items-center">
                {this.props.fieldNames && this.props.fieldNames.map((element, index) => {
                    return (
                            <div id="head-row" key={element} className="text-white d-flex flex-grow-1 flex-row justify-content-center align-items-center">
                                <span className="font-weight-bold">{element.charAt(0).toUpperCase() + element.slice(1)}</span>
                            </div>
                            )
                })}
            </div>
        )
    }
}