import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: this.props.username,
      content: ''
    }

  this.handleKeyPress = this.handleKeyPress.bind(this);
  this.messageChange = this.messageChange.bind(this);
  this.userNew = this.userNew.bind(this);
  }



  userNew = (event) => {
    console
    this.setState({
      user: event.target.value
    });
  }


  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.props.addMessage(this.state.user, this.state.content);

      this.setState({
        content: ''
      })
    }
  }

  messageChange = (event) => {
    console.log(event.target.value);
    this.setState({
      content: event.target.value
    });

  }

  render() {
    return (
    <footer className="chatbar">
      <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} onChange= {this.userNew}/>
      <input className="chatbar-message" placeholder="Type a message and hit ENTER"  onKeyPress={this.handleKeyPress} onChange={this.messageChange} value={this.state.content}/>
    </footer>
    )
  }
}
export default ChatBar;
