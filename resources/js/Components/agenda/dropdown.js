import React from 'react';
import ReactDom from 'react-dom'; 

export default class dropDown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuToggled : false,  
            title : this.props.titleName,    
            list : this.props.list
        }
        this.toggleState = this.toggleState.bind(this);
    }

    toggleState() {
        this.setState({menuToggled: this.state.menuToggled ? !this.state.menuToggled : true})

    }

    toggleActive() {
        //TODO edit setstate key to active list item
        this.setState({menuToggled: this.state.menuToggled ? !this.state.menuToggled : true})
    }

    render() {
        return(
            <div className="dropdown-menu-container">
                <div className="dropdown-header">
                    <div className="dropdown-menu-title">{this.state.title}</div>
                    <div className="dropdown-icon" data-toggle="collapse" data-target="#dropdown-list" aria-controls="dropdown-list" aria-expanded="false" onClick={this.toggleState}>
                        { this.state.menuToggled ? <i className="fas fa-arrow-down"></i> : <i className="fas fa-arrow-up"></i> }
                    </div>
                </div>
                <div id="dropdown-list-container" className="dropdown-list-container">
                    <div id="dropdown-list" className="dropdown-list collapse">
                        {this.state.list.map((element) => {
                            return <div className="list-item" key={element['name']} onClick={this.toggleActive}>{element['name']}</div>
                        })}
                    </div>
                </div>
            </div>

        )
    }
}