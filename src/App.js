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

    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.getRooms = this.getRooms.bind(this);

    this.state = {
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
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
      this.currentUser = currentUser
      this.getRooms ()
        .catch(err => {
          console.log(`Error removing leah from room 123: ${err}`)
        })
        
      
      
    })
    .catch(err => {
      console.log(`Error removing leah from room 123: ${err}`)
    })
  }

  getRooms () {
    this.currentUser.getJoinableRooms ()
        .then(joinableRooms => {
          this.setState ({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
          })
        })
  }

  subscribeToRoom (roomId) {
    this.setState ({ messages: [] });  
    this.currentUser.subscribeToRoomMultipart ({
      roomId: roomId,
      hooks: {
        onMessage: message => {
          this.setState ({
            messages: [...this.state.messages, message]
          });
        }
      }
    })
    .then(room => {
      this.setState({
        roomId: roomId
      })
      this.getRooms()
    })
    .catch(err => {
      console.log(`Error Subscribing to a Room: ${err}`)
    })
  }

  sendMessage (text) {
    this.currentUser.sendSimpleMessage ({
      text: text,
      roomId: this.state.roomId
    })
  }

  render() { 
    return ( 
      <div className="app">
        <RoomList 
          subscribeToRoom={this.subscribeToRoom} 
          rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
        <MessageList messages={this.state.messages}/>
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
     );
  }
}
 
export default App;
