// this file displays the message or a notification based on the incoming
//type of information
import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx'
class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <div className="message">
        <ul>
          {
            this.props.messages.map((result) => {
              if(result.type === "incomingMessage"){
              return <Message key={result.id} message={result}/>
            }
            else {
              return <Notification key={result.id} message={result}/>
            }
            })
          }
          </ul>
        </div>
      </main>
    );
  }
}
export default MessageList;
