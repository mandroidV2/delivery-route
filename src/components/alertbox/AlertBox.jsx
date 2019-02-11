import React from "react";
import './AlertBox.css'

const AlertBox = (props) => {
    return (
        <div id="myModal" className="modal" 
            style={{display : props.show ? 'block' : 'none'}}>
            <div className="modal-content">
                <p>{props.alert}</p>
                <button onClick={() => props.onHideAlert()}>OK</button>
            </div>
        </div>
    );
};
export default AlertBox;