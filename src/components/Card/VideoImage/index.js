import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoImage(props) {
  return (
    <div className="video-content">
      <ReactPlayer url={props.src} controls={true} width={"100%"}  height={"100%"}/>
    </div>
  )
}
