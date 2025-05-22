import React from 'react'
import styled from 'styled-components'

export default function Footer() {
  return (
    <StyledFooter>
        <h2>Footer</h2>
    </StyledFooter> 
  )
}


const StyledFooter = styled.footer`
width: 100%;
height: 100px;
background-color: black;
color: white;
display: flex;
justify-content: center;
`
