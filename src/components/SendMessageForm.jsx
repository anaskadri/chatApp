import React, { Component } from 'react';

class SendMessageForm extends Component {
    render() { 
        return ( 
            <form classNamesend-message-form>
                <input 
                    placeholder="sendMessageForm"
                    type="text" />
            </form>
         );
    }
}
 
export default SendMessageForm;