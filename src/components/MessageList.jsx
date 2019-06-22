import React, { Component } from 'react';

const DUMMY_DATA = [
    {
        senderId: 'anas',
        text: 'wassap'
    },
    {
        senderId: 'anas',
        text: 'wassap'
    },
    {
        senderId: 'anas',
        text: 'wassap'
    }
]

class MessageList extends Component {
    render() { 
        return ( 
            <div className="message-list">
                {this.props.messages.map((message, index) => {
                    return (
                        <div key={index} className="message">
                            <div className="message-username">{message.senderId}</div>
                            <div className="message-text">{message.text}</div>
                        </div>
                    )
                })}
            </div>
         );
    }
}
 
export default MessageList;