import React from 'react';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			drumpad: [{
        key: "Q",
        keyCode: 81,
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
        description: "Heater 1",
        padStyle: {        
          backgroundColor: '#222224'
        }
      }, {
        key: "W",
        keyCode: 87,
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
        description: "Heater 2",
        padStyle: {        
          backgroundColor: '#222224'
        }
      }, {
        key: "E",
        keyCode: 69,
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
        description: "Heater 3",
        padStyle: {        
          backgroundColor: '#222224'
        }
      }, {
        key: "A",
        keyCode: 65,
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
        description: "Heater 4",
        padStyle: {        
          backgroundColor: '#222224'
        }
      }, {
        key: "S",
        keyCode: 83,
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
        description: "Heater 6",
        padStyle: {        
          backgroundColor: '#222224'
        }
      }, {
        key: "D",
        keyCode: 68,
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
        description: "Open Hihat",
        padStyle: {        
          backgroundColor: '#222224'
        }
      }, {
        key: "Z",
        keyCode: 90,
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
        description: "Kick 'n Hat",
        padStyle: {        
          backgroundColor: '#222224'
        }
      }, {
        key: "X",
        keyCode: 88,
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
        description: "Kick",
        padStyle: {        
          backgroundColor: '#222224'
        }
      }, {
        key: "C",
        keyCode: 67,
        clip: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
        description: "Closed Hihat",
        padStyle: {        
          backgroundColor: '#222224'
        }
      }],
      display: "Drums please!",      
		};
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
    const newState = JSON.parse(JSON.stringify(this.state))
    
    pad.padStyle.backgroundColor === '#222224' ?
      newState.drumpad[index].padStyle.backgroundColor = '#DD2429' : 
      newState.drumpad[index].padStyle.backgroundColor = '#222224';
    
    this.setState(newState);
  }
  updateDisplay(text) {
    this.setState({
      display: text
    })
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
        <Controls display={this.state.display}/>
        <DrumpadSet drumpad={this.state.drumpad}
                    padStyle={this.state.padStyle} 
                    handleClick={this.handleClick}/>                 
      </div>
    )
  }
}

const DrumpadSet = (props) => {  
  const padStyle = props.padStyle
  const pads = props.drumpad.map( pad => {
    return <Pad pad={pad}
                key={pad.key}
                handleClick={props.handleClick}/>
  });
  return (
    <div id="drum-pad-wrapper">
      { pads }
    </div>
  )  
}

const Pad = (props) => {
  return <div className="drum-pad" 
              id={"drum-pad-" + props.pad.key}
              style={props.pad.padStyle}
              onClick={(event) => props.handleClick(props.pad.key, event)}>
            {props.pad.key}
            <audio src={props.pad.clip}
                   className="clip"
                   id={props.pad.key}>
            </audio>
         </div>
}

const Controls = (props) => {
return (
    <div id="controls-wrapper">
      <div id="display">
      {props.display}
      </div>
    </div>
  )  
}

export default App;

