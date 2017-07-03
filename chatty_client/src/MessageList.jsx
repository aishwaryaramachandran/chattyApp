
import React, {Component} from 'react';
import Message from './Message.jsx';
class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        <div className="message">
        <ul>
          {
            this.props.messages.map((result, index) => {
              return <Message key={index} message={result}/>
            })
          }
          </ul>
        </div>
      </main>
    );
  }
}
export default MessageList;
