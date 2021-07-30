
import React from 'react'
import Waveform from './Waveform'
import "./style.css";
export default function AudioImage(props) {
  return (
    <>
      <img alt="" src={props.src} className={`w-full h-80 relative ${!props.isCss?"video-content":""}`} />
        <div className="absolute bottom-8 w-full">
          <Waveform audioURL={props.audioPath} onClick={props.onClick}/>
        </div>
      </>
  )
}

// import React, { useState } from 'react';
// import Wavesurfer from 'react-wavesurfer';

// function MyWaveform() {
//   const [position, setPosition] = useState(0);
//   const [muted, setMuted] = useState(false);

//   const handlePositionChange = (position) => { setPosition(0) };
//   const onReadyHandler = () => console.log('done loading!');

//   return (
//     <Wavesurfer
//       src="assets/audio/RT43.mp3"
//       pos={position}
//       onPosChange={handlePositionChange}
//       onReady={onReadyHandler}
//       playing={false}
//       muted={muted}
//     />
//   );
// }

// export default MyWaveform;