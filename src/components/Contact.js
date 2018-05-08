import React from "react";
import PropTypes from "prop-types";
import { ContractData, ContractForm } from "drizzle-react-components";
import "./Contact.css"
import {Button, Icon,CollapsibleItem} from 'react-materialize'
function Contact(props){
    return (
       
    <div>
        <div>HelloTrust Score: <b>{props.helloTrustScore}</b></div> 
        <div>ETH Address: {props.ethAddress}</div>
        <div>
        <strong>Balance</strong>:{" "}
        <ContractData
                contract="FriendshipToken"
                method="balanceOf"
                methodArgs={[props.ethAddress]}
              />
               
        </div>
    <div>
            <ContractForm
              contract="FriendshipToken"
              method="transfer"
              labels={[props.ethAddress, "Amount to Send"]}
            />
          </div>
         
    </div>
    );
}

Contact.propTypes= {
    name: PropTypes.string.isRequired
};
export default Contact;