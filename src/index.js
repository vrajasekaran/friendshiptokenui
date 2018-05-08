import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { DrizzleProvider } from 'drizzle-react'
import {Button, Icon} from 'react-materialize'

import FriendshipToken from './contracts/FriendshipToken.json'

console.log(FriendshipToken);

const options = {
    web3: {
        block: false,
        fallback: {
            type: "ws",
            url:  "ws://127.0.0.1:7545"
        }
    },
    contracts: [FriendshipToken],
    events: {}
};

ReactDOM.render(
<DrizzleProvider options={options} > 
    <App/>
</DrizzleProvider>,
     document.getElementById('root'));
registerServiceWorker();
