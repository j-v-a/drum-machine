import React from 'react';

import initialState from '../helpers/initialState';

import DrumpadSet from './DrumpadSet';
import Controls from './Controls';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.playClip = this.playClip.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.togglePadStyle = this.togglePadStyle.bind(this);
  }
  playClip(key) {
    const padElement = document.getElementById(key);
    const pad = this.state.drumpad.find(pad => pad.key === key);
    padElement.currentTime = 0;
    padElement.play();
    this.togglePadStyle(key);
    setTimeout(() => this.togglePadStyle(key), 200);
    this.updateDisplay(pad.description);
  }
  handleClick(key, event) {
    this.playClip(key);
  }
  handleKeyDown(event) {
    const pad = this.state.drumpad.find(pad => pad.keyCode === event.keyCode);
    pad ? this.playClip(pad.key) : null;
  }
  togglePadStyle(key) {
    const pad = this.state.drumpad.find(pad => pad.key === key);
    const index = this.state.drumpad.indexOf(pad);
    const newState = JSON.parse(JSON.stringify(this.state));

    pad.padStyle.backgroundColor === '#222224'
      ? (newState.drumpad[index].padStyle.backgroundColor = '#DD2429')
      : (newState.drumpad[index].padStyle.backgroundColor = '#222224');

    this.setState(newState);
  }
  updateDisplay(text) {
    this.setState({
      display: text
    });
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }
  render() {
    return (
      <div id="drum-machine">
        <Controls display={this.state.display} />
        <DrumpadSet
          drumpad={this.state.drumpad}
          padStyle={this.state.padStyle}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

export default App;
