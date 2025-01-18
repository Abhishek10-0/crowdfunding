import React from 'react'
import { useParams } from 'react-router'
function About() {
    let {name} = useParams();
  return (

    <div>about: param : {name}</div>
  )
}

export default About