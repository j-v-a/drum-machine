import React from 'react';

const Pad = props => {
  return (
    <div
      className="drum-pad"
      id={'drum-pad-' + props.pad.key}
      style={props.pad.padStyle}
      onClick={event => props.handleClick(props.pad.key, event)}
    >
      {props.pad.key}
      <audio src={props.pad.clip} className="clip" id={props.pad.key} />
    </div>
  );
};

export default Pad;
