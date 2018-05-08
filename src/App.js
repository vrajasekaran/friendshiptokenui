import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { drizzleConnect } from "drizzle-react";
import { ContractData, ContractForm } from "drizzle-react-components";

import axios from "axios";

import ContactList from "./components/ContactList"

class App extends Component {
  // default state
  state = {
    contacts:[]
  };

  componentDidMount(){
    axios
    .get("http://localhost:55552/api/agent") //https://jsonplaceholder.typicode.com/users
    .then(response => {
      console.log(response);
      const newContacts = response.data.map(c=> {
        return {
          id: c.id,
          name: c.name,
          ethAddress: c.ethAddress,
          telegramId: c.telegramId,
          helloTrustScore: c.helloTrustScore
        };
      })

      this.state.contacts = newContacts;

      console.log(newContacts);
      // const newState = Object.assign({}, this.state, {
      //   contacts:newContacts,
      //   accounts: this.state.accounts,
      //   drizzleStatus: this.state.drizzleStatus,
      //   FriendshipToken: this.state.contracts.FriendshipToken
      // });

      // console.log(newContacts);
      // console.log(this.state.contacts);
      // this.setState(newState);
    })
    .catch(error=> console.log(error));
  };

  render() {
    const { drizzleStatus, accounts } = this.props;
    console.log(this.props);
    console.log(drizzleStatus);
    console.log(this.state.contacts);
    if (drizzleStatus.initialized) {
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">HelloNet Marketplace</h1>
            {/* <p>
              <strong>Total Supply</strong>:{" "}
              <ContractData
                contract="FriendshipToken"
                method="totalSupply"
                methodArgs={[{ from: accounts[0] }]}
              />{" "}
              <ContractData
                contract="FriendshipToken"
                method="symbol"
                hideIndicator
              />
            </p> */}
            <span>
            <strong>  Welcome, SMB Customer!</strong>

            </span>
            <span>
              !!                 HelloToken Balance:{" "}
              <ContractData
                contract="FriendshipToken"
                method="balanceOf"
                methodArgs={[accounts[0]]}
              />
            </span>
            
          </header>
          {/* <div className="App-intro">
            <ContractForm
              contract="FriendshipToken"
              method="transfer"
              labels={["To Address", "Amount to Send"]}
            />
          </div> */}
       

          <ContactList contacts={this.state.contacts} />
        </div>
      );
    }

    return <div>Not initialized
      {/* <ContactList contacts={this.state.contacts} /> */}
    </div>;
  }
}



const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    FriendshipToken: state.contracts.FriendshipToken,
    web3: state.web3,
    contacts: state.contacts
  };
};

const AppContainer = drizzleConnect(App, mapStateToProps);
export default AppContainer;