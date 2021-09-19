import React from 'react';
import ReactDom from 'react-dom'; 
import { motion } from "framer-motion";
import Agenda from '../agenda';

export default class dropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuToggled : false,  
            title : this.props.titleName,    
            list : this.props.list,
            dateType: this.props.dateType,
        }
        this.toggleState = this.toggleState.bind(this);
        this.toggleActive = this.toggleActive.bind(this);
    }

    toggleState() {
        this.setState({menuToggled: this.state.menuToggled ? !this.state.menuToggled : true})

    }

    toggleActive (e) {
        if(typeof e.target.innerHTML !== "string") return;
        this.props.changeData(this.state.dateType, e.target.innerHTML);
    }

    render() {
        return(
            <div className="dropdown-menu-container d-flex flex-column justify-content-center align-items-center">   
                <div className="dropdown-first-child d-flex justify-content-around align-items-center">
                    <div className="dropdown-menu-title fs-5">{this.state.title}</div>
                    <div className="dropdown-icon" data-toggle="collapse" data-target={"#"+this.props.dataTarget} aria-controls="dropdown-list" aria-expanded="false" onClick={this.toggleState}>
                        <i className={ `fas fa-arrow-down transition-350ms ${this.state.menuToggled ? `rotate-180deg` : `rotate-0deg`}`}></i>
                    </div>
                </div>
                <div id="dropdown-list-container" className="dropdown-list-container">
                    <div id={this.props.dataTarget} className="dropdown-list bg-themeColor collapse position-absolute">
                        <div className="dropdown-items-wrapper">
                            {this.state.list.map((element, index) => {
                                return <div onClick={(e) => { this.toggleActive(e) }} className="list-item text-truncate text-center" key={`${element}.${index}`} onClick={this.toggleActive}>{element}</div>
                            })}
                        </div>
                    </div>  
                </div>
            </div>

        )
    }
}