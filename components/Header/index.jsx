import React from "react";
import styled from "styled-components";

export default function Header() {
    return (
        <StyledHeader>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    width: 100%;
    height: 50px;
    color: black;
    display: flex;
    justify-content: center;
`;
