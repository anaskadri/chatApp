import React from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import NewRoomForm from './components/NewRoomForm';
import SendMessageForm from './components/SendMessageForm';
import './App.css';
//import Chatkit from '@pusher/chatkit-server';
import Chatkit from '@pusher/chatkit-client';

import { tokenUrl, instanceLocator } from './config';

class App extends React.Component {

  constructor (props) {
    super (props);
    this.state = {
      messages: []
    };
  }

  componentDidMount () {
    const tokenProvider = new Chatkit.TokenProvider ({
      url: tokenUrl
    });
    const chatManager = new Chatkit.ChatManager ({
      instanceLocator,
      userId: 'anas',
      tokenProvider
    }) 

    chatManager.connect()
    .then(currentUser => {
      currentUser.subscribeToRoomMultipart ({
        roomId: '19410291',
        hooks: {
          onMessage: message => {
            console.log("received message", message);
            this.setState ({
              messages: [...this.state.messages, message]
            });
          }
        },
        messageLimit: 10
      })
    })
  }

  render() { 
    console.log('q', this.state.messages);
    return ( 
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages}/>
        <SendMessageForm />
        <NewRoomForm />
      </div>
     );
  }
}
 
export default App;
