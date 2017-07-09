import React, {Component} from 'react';
class Notification extends Component {
// the purpose of this file is to pass a notification message when
// a user has changed their name before they send a new message
  render() {
    return (
    <div className="message system">
      {this.props.message.content}
    </div>
    );
  }
}
export default Notification;