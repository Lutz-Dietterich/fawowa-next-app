import React from "react";
import styled from "styled-components";

export default function Header() {
    return (
        <StyledHeader>
            <h1>Header</h1>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    width: 100%;
    height: 100px;
    background-color: rgba(0, 128, 0, 0.2);
    color: black;
    display: flex;
    justify-content: center;
`;
