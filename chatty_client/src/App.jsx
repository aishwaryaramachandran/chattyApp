import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

const uuidv1 = require('uuid/v1');


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Aisha"},
      messages: []
    }
    this.addMessage = this.addMessage.bind(this);
  } //end of the constructor

  addMessage(username, content,type){
    let newMessage = {
      type,
      id: Date.now(),
      username,
      content
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:3001/');

    this.socket.addEventListener('open' , (event) => {
      console.log('things and stuff');

    });

    this.socket.addEventListener('message', (event) => {
      const newMessage = JSON.parse(event.data);
      const newMessages = this.state.messages.concat(newMessage);
       this.setState({
      messages: newMessages
      });
    });
}

  render() {
    return (
      <div>
        <ChatBar currentUser= {this.state.currentUser.name} addMessage= {this.addMessage}/>
        <MessageList messages= {this.state.messages}/>
        <Navbar />
      </div>
    );
  }
} //end of class


export default App;