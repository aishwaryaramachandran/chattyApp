import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Aisha"},
      messages: []
    }
    this.addMessage = this.addMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  } //end of the constructor

  currentName(){
    return this.state.currentUser.name || 'anonymous'
  }

  addMessage(content){
    let newMessage = {
      type: "postMessage",
      username: this.currentName(),
      content
    };
    this.socket.send(JSON.stringify(newMessage)); // add method to avoid rep
  }

  changeUsername(name){
    console.log("[App changeUsername] Name changed:", name);
    let newMessage = {
      type: "postNotification",
      content: `${this.currentName()} changed their name to ${name}`
    }
    this.socket.send(JSON.stringify(newMessage));
    this.setState({
      currentUser:{name}
    })
  }

  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:3001/');

    this.socket.addEventListener('open' , (event) => {
      console.log('things and stuff');

    });

    this.socket.addEventListener('message', (event) => {
      const newMessage = JSON.parse(event.data);
      switch(newMessage.type){

        case "incomingMessage":
        case "incomingNotification":
          const newMessages = this.state.messages.concat(newMessage);
          this.setState({
            messages: newMessages
          });
          break;

        default:
          console.log("Unrecognized message type")

      }
    });
  }

  render() {
    return (
      <div>
        <ChatBar currentUser={this.state.currentUser.name} changeUsername={this.changeUsername} addMessage={this.addMessage}/>
        <MessageList messages= {this.state.messages}/>
        <Navbar />
      </div>
    );
  }
} //end of class


export default App;