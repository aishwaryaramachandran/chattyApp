import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import NavBar from './NavBar.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Aisha"},
      messages: []
    }
  }


handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      let newMessage = {username: this.state.currentUser.name, content: event.target.value};
      this.socket.send(JSON.stringify(newMessage));
      event.target.value = '';
    }
  }

updateUser = (event) => {
    let prevName = this.state.currentUser.name;
    let newName = event.target.value;
    this.setState({currentUser:{name: newName}})
  }


  componentDidMount() {
    this.socket = new WebSocket('ws://0.0.0.0:3001');

    this.socket.onopen = (event) => {
      console.log("Got a connection!");
    };

    this.socket.onmessage = (event) => {

      const data = JSON.parse(event.data);

      // switch(data.type) {
      // case "textMessage":
      //   let messages = this.state.messages.concat(data);
      //   let username = this.state.username;
      //   this.setState({
      //     username: username,
      //     messages: messages
      //   });
      //   // this will print the message out onto the console if incomingMessage
      //   break;
      // case "incomingNotification":
        let message = this.state.messages.concat(data);
        let name = this.state.username;
        this.setState({
          username: name,
          messages: message
        });
    }



    };


  render() {
    return (
      <div>
        <NavBar count = {this.state.count} />
        <MessageList messages={this.state.messages} />
        <ChatBar currentUser={this.state.currentUser.name} enter={this.handleKeyPress} leave={this.updateUser} />
      </div>
    );
  }
}
export default App;

// import React, {Component} from 'react';
// import ChatBar from './ChatBar.jsx';

// import MessageList from './MessageList.jsx';
// import Navbar from './Navbar.jsx';

// const uuidv1 = require('uuid/v1');


// class App extends Component {

//   constructor(props){
//     super(props);
//     this.state = {
//       currentUser: {name: "Aisha"},
//       messages: []
//     }
//     this.addMessage = this.addMessage.bind(this);
//   } //end of the constructor

//   addMessage(username, content,type){
//     let newMessage = {
//       type,
//       id: Date.now(),
//       username,
//       content
//     };
//     this.socket.send(JSON.stringify(newMessage));
//   }

//   componentDidMount() {

//     this.socket = new WebSocket('ws://localhost:3001/');

//     this.socket.addEventListener('open' , (event) => {
//       console.log('things and stuff');

//     });

//     this.socket.addEventListener('message', (event) => {
//       const newMessage = JSON.parse(event.data);
//       const newMessages = this.state.messages.concat(newMessage);
//        this.setState({
//       messages: newMessages
//       });
//     });
// }

//   render() {
//     return (
//       <div>
//         <ChatBar currentUser= {this.state.currentUser.name} addMessage= {this.addMessage}/>
//         <MessageList messages= {this.state.messages}/>
//         <Navbar />
//       </div>
//     );
//   }
// } //end of class


// export default App;