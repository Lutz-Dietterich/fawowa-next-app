import React from 'react'
import styled from 'styled-components'

export default function Main() {
  return (
    <StyledMain>
        <h2>Main</h2>
    </StyledMain> 
  )
}


const StyledMain = styled.main`
width: 100%;
height: 100px;
background-color: Red;
color: white;
display: flex;
justify-content: center;
`
