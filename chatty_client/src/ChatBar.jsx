import React, {Component} from 'react';

// this class handles chat bar features
class ChatBar extends Component {
  constructor(props){
    super(props);

    this.handleKeyPressMsg = this.handleKeyPressMsg.bind(this);
    this.handleKeyPressUser = this.handleKeyPressUser.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);
  }

  // this function will allow a user to submit a message on enter
  handleKeyPressMsg(event){
    if(event.key == 'Enter'){
      this.props.addMessage(event.target.value);
      event.target.value = '';
    }
  }
// this function will allow the user to change their username on enter
  handleKeyPressUser(event){
    if(event.key == 'Enter'){
      this.props.changeUsername(event.target.value);
    }
  }
// this function will allow a change in username on a blur event
// this is intended to improve the user experience
  handleBlurEvent(event){
    this.props.changeUsername(event.target.value);
  }

  render() {
    return (
    <footer className="chatbar">
      <input
      className="chatbar-username"
      placeholder="Your Name (Optional)"
      defaultValue={this.props.currentUser}
      onKeyPress={this.handleKeyPressUser}
      onBlur = {this.handleBlurEvent}
      />
      <input
      className="chatbar-message"
      placeholder="Type a message and hit ENTER"
      onKeyPress={this.handleKeyPressMsg}
      />
    </footer>
    )
  }
}
export default ChatBar;
