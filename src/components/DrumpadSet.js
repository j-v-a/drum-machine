import React from 'react';

import Pad from './Pad';

const DrumpadSet = props => {
  const padStyle = props.padStyle;
  const pads = props.drumpad.map(pad => {
    return <Pad pad={pad} key={pad.key} handleClick={props.handleClick} />;
  });
  return <div id="drum-pad-wrapper">{pads}</div>;
};

export default DrumpadSet;
