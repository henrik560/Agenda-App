import React from 'react';

export default class TablePageSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var element = null;
        if(!this.props.searchError) {
            element = this.props.buildings.map((element,index) => {
                index++
                const first = (this.props.currentPage + 4) > this.props.buildings.length ? this.props.buildings.length - 4 <= 1 ? 1 : this.props.buildings.length - 4 : this.props.currentPage
                const last = (this.props.currentPage + 4) > this.props.buildings.length ? this.props.buildings.length : this.props.currentPage + 4
                if(index >= first && index <= last) {
                    if(index == this.props.currentPage) {
                        return <div id="border-white" key={index} onClick={(e) => this.props.setCurrentPage(index)} className="text-white">{index}</div>
                    }else if(index == last) {
                        return <div id="selectable-page" key={this.props.buildings.length} onClick={(e) => this.props.setCurrentPage(this.props.buildings.length)} >{this.props.buildings.length}</div>
                    }else if(index + 1 == last && (this.props.currentPage + 4) < this.props.buildings.length) {
                        return <div key={index} id="not-selectable">..</div>
                    }else {
                        return <div id="selectable-page" key={index} onClick={(e) => this.props.setCurrentPage(index)}>{index}</div>
                    }
                }
            })
        }
        
        return(
            <div id="container" className="d-flex gap-2 flex-row w-100 justify-content-around align-items-center text-white">
            <div id="to-start" onClick={(e) => this.props.setCurrentPage(this.props.currentPage <= 1 ? 1 : this.props.currentPage - 1)}>
                <i className="fas fa-angle-left"></i>
            </div>
            {element ? element : <div id="selectable-page" key="1" >1</div>}
            <div id="to-end" onClick={(e) => this.props.setCurrentPage(this.props.currentPage <= this.props.buildings.length - 1 ? this.props.currentPage + 1 : this.props.buildings.length )}>
                <i className="fas fa-angle-right"></i>
            </div>
        </div>
        )
    }
}