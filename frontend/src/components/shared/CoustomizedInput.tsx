import { TextField } from '@mui/material'
// import React from 'react'

type Props = {
    name:string
    type: string
    label:string
}

const CoustomizedInput = (props:Props) => {
  return (
        <TextField margin='normal' InputLabelProps={{style:{color:"white"}}} name={props.name} label={ props.label} type={props.type} inputProps={{style:{width:"400px",borderRadius:"10px", fontSize:"20px",color:"white"}}}/>
    )
}

export default CoustomizedInput;