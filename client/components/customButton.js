import React from 'react'
import RaisedButton from 'material-ui/RaisedButton';

const textStyle = {
  textTransform: "none"
}

export const CustomButton = (props) => {
  return (
   <RaisedButton onClick={props.onClick} label={props.label} className="navButton" labelStyle={textStyle} />
  )
}
