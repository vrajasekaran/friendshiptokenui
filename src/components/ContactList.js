import React from "react";
import Contact from "./Contact";
import {Button, Icon,Collapsible,CollapsibleItem} from 'react-materialize'

function ContactList(props) {
    console.log(props);
    return  (
        <div>

            <p><b>{props.title}</b></p>
            <Collapsible accordion >
            {
                props.contacts.map(
                    c=> <CollapsibleItem header={c.name} icon='filter_drama'>
                        <Contact key={c.id} name={c.name} ethAddress={c.ethAddress} helloTrustScore={c.helloTrustScore} 
                            customerTokenAddress={c.customerTokenAddress}/>
                        </CollapsibleItem>
                    )
            }
            </Collapsible>

        </div>
    );
}

export default ContactList;