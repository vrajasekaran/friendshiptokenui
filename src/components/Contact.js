import React from "react";
import PropTypes from "prop-types";
import { ContractData, ContractForm } from "drizzle-react-components";
import "./Contact.css"
import {Button, Icon,CollapsibleItem} from 'react-materialize'
import axios from "axios";


function Contact(props){
    function hire(){
    var data = {"customerTokenAddress":props.customerTokenAddress, "agentTokenAddress":props.ethAddress};  
    console.log(data) ;
        axios
        .post("http://localhost:55552/api/customers/hire", data) //https://jsonplaceholder.typicode.com/users
        .then(response => {
          console.log(response);
          alert('Hired!');
        })
        .catch(error=> console.log(error))
    }
    

    return (
       
    <div>
        <div>HelloTrust Score: <b>{props.helloTrustScore}</b></div> 
        <div>ETH Address: {props.ethAddress}</div>
        <div>
        <strong>Balance</strong>:{" "}
        <ContractData
                contract="HelloToken"
                method="balanceOf"
                methodArgs={[props.ethAddress]}
              />
               
        </div>
        <div>
            <ContractForm
              contract="HelloToken"
              method="transfer"
              labels={[props.ethAddress, "Amount to Send"]}
            />
          </div>
        <button className="square" onClick={() => hire() }>
                Hire Me
        </button>
    </div>
    );
}

Contact.propTypes= {
    name: PropTypes.string.isRequired
};
export default Contact;