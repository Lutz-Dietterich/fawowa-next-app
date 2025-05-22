import React from 'react'
import styled from 'styled-components'

export default function Header() {
  return (
    <StyledHeader>
        <h1>Header</h1>
    </StyledHeader> 
  )
}


const StyledHeader = styled.header`
width: 100%;
height: 100px;
background-color: green;
color: black;
display: flex;
justify-content: center;
`
