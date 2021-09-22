import React from 'react';

export default class TableContent extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        var buildingsElement
            if(this.props.buildings) {
                buildingsElement = this.props.buildings.map((element, index) => {
                    return (
                        <div id="table-body-row" key={index} className="transition-250ms d-flex flex-grow-1 justify-content-around align-items-center">
                        <div id="body-row" className="body-row-id text-white d-flex justify-content-center align-items-center">{element.id}</div>
                        <div id="body-row" className="body-row-name text-white d-flex justify-content-center align-items-center">{element.name}</div>
                        <div id="body-row" className="body-row-hex text-white d-flex justify-content-center align-items-center">{`#${element.color_hex}`}</div>
                        <div id="body-row" className="body-row-added text-white d-flex justify-content-center align-items-center">{element.created_at.split("T")[0]}</div>
                        <div id="body-row" className="body-row-edited text-white d-flex justify-content-center align-items-center">
                            <div className="d-flex gap-2">
                                <i className="fas fa-edit"></i>
                                <i className="far fa-trash-alt"></i>
                            </div>
                        </div>
                    </div>)
                })
            }
        return(buildingsElement ? buildingsElement : "loading...")
    }
}