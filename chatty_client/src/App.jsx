import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';

import MessageList from './MessageList.jsx';
import Navbar from './Navbar.jsx';

// the default name in the app is set using the constructor
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Aisha"},
      messages: [],
      userCount: []
    }
    this.addMessage = this.addMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  } //end of the constructor

  // this function allows the user to send a
  //message without a username
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

  //This function will send a notif message when the user changes their name
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

    // this event listener deal with incoming messages, notifications
    // and changes in the users online
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
        case "userCountChanged":
          this.setState({
             userCount: newMessage.userCount
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
        <Navbar userCount={this.state.userCount}/>
      </div>
    );
  }
} //end of class


export default App;