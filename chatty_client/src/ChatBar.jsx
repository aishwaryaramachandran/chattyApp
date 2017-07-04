import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);

    this.handleKeyPressMsg = this.handleKeyPressMsg.bind(this);
    this.handleKeyPressUser = this.handleKeyPressUser.bind(this);
    this.handleBlurEvent = this.handleBlurEvent.bind(this);
  }

  handleKeyPressMsg(event){
    if(event.key == 'Enter'){
      this.props.addMessage(event.target.value);
      event.target.value = '';
    }
  }

  handleKeyPressUser(event){
    if(event.key == 'Enter'){
      this.props.changeUsername(event.target.value);
    }
  }

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
