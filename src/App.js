import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { drizzleConnect } from "drizzle-react";
import { ContractData, ContractForm } from "drizzle-react-components";

import axios from "axios";

import ContactList from "./components/ContactList"
import { setWeb3Instance } from './blockChainService'

class App extends Component {
  // default state
  state = {
    contacts:[],
    tokenUser:{},
    hiredAgents:[]
  };

  componentDidMount(){
    var accountAddress; 
    const { drizzleStatus, accounts } = this.props;

    console.log('drizz');
    console.log(accounts[0]);
    setWeb3Instance()
    .then(() => {
      accountAddress = accounts[0];
      console.log('inside');
      console.log(this.state.accounts);
    axios
    .get("http://localhost:55552/api/agents/available/"+ accountAddress) //https://jsonplaceholder.typicode.com/users
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
      this.setState( {contacts: newContacts});
      // this.state.contacts = newContacts;

      console.log(newContacts);
    
      // const newState = Object.assign({}, this.state, {
      //   contacts:newContacts,
      //   accounts: this.state.accounts,
      //   drizzleStatus: this.state.drizzleStatus,
      //   HelloToken: this.state.contracts.HelloToken
      // });

      // console.log(newContacts);
      // console.log(this.state.contacts);
      // this.setState(newState);
    })
    .catch(error=> console.log(error))
  })};

  render() {
    const { drizzleStatus, accounts } = this.props;
    console.log(this.props);
    console.log(drizzleStatus);
    console.log(this.state.contacts);
    if (drizzleStatus.initialized) {
      return (
        axios
        .get("http://localhost:55552/api/TokenUsers/"+ accounts[0]) //https://jsonplaceholder.typicode.com/users
        .then(response => {
          console.log(response);
          const newTokenUser = {
            id: response.data.tokenUserId,
            userRole: response.data.userRole             
          };
          
          this.setState( {tokenUser: newTokenUser});
          // this.state.tokenUser = newTokenUser;
          console.log('after');
          console.log(this.state.tokenUser);
        })
        .catch(error=> console.log(error)),


        axios
        .get("http://localhost:55552/api/agents/available/"+ accounts[0]) //https://jsonplaceholder.typicode.com/users
        .then(response => {
          console.log(response);
          const newContacts = response.data.map(c=> {
            return {
              id: c.agentId,
              name: c.name,
              ethAddress: c.tokenAddress,
              telegramId: c.telegramId,
              helloTrustScore: c.helloTrustScore,
              customerTokenAddress: accounts[0]
            };
          })
          this.setState( {contacts: newContacts});
          // this.state.contacts = newContacts;
          console.log('after');
          console.log(this.state.contacts);
        })
        .catch(error=> console.log(error)),
      
        axios
        .get("http://localhost:55552/api/agents/Hired/"+ accounts[0]) //https://jsonplaceholder.typicode.com/users
        .then(response => {
          console.log(response);
          const newHiredAgents = response.data.map(c=> {
            return {
              id: c.agentId,
              name: c.name,
              ethAddress: c.tokenAddress,
              telegramId: c.telegramId,
              helloTrustScore: c.helloTrustScore,
              customerTokenAddress: accounts[0]
            };
          })
          this.setState( {hiredAgents: newHiredAgents});
          // this.state.hiredAgents = newHiredAgents;
          console.log('after');
          console.log(this.state.hiredAgents);
        })
        .catch(error=> console.log(error)),


        <div className="App">
          <header className="App-header">
            <h1 className="App-title">HelloNet Marketplace</h1>
            {/* <p>
              <strong>Total Supply</strong>:{" "}
              <ContractData
                contract="HelloToken"
                method="totalSupply"
                methodArgs={[{ from: accounts[0] }]}
              />{" "}
              <ContractData
                contract="HelloToken"
                method="symbol"
                hideIndicator
              />
            </p> */}
            <span>
            <strong>  Welcome, {this.state.tokenUser.id} of Role {this.state.tokenUser.userRole}</strong>

            </span>
            <span>
              !!                 HelloToken Balance:{" "}
              <ContractData
                contract="HelloToken"
                method="balanceOf"
                methodArgs={[accounts[0]]}
              />
            </span>
            
          </header>
          {/* <div className="App-intro">
            <ContractForm
              contract="HelloToken"
              method="transfer"
              labels={["To Address", "Amount to Send"]}
            />
          </div> */}
          
          <ContactList contacts={this.state.hiredAgents} title={"Current Enrolled Agents"}/>

          <ContactList contacts={this.state.contacts} title={"New Agents Available"}/>
          
        </div>
      );
    }

    return <div>Signin Using Metamask!
      {/* <ContactList contacts={this.state.contacts} /> */}
    </div>;
  }
}



const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    drizzleStatus: state.drizzleStatus,
    HelloToken: state.contracts.HelloToken,
    web3: state.web3
    // contacts: state.contacts,
    // tokenUser: state.tokenUser,
    // customer: state.customer,
    // hiredAgents: state.hiredAgents
  };
};

const AppContainer = drizzleConnect(App, mapStateToProps);
export default AppContainer;