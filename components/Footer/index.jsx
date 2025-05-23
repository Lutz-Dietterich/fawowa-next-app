import styled from "styled-components";
import Navigation from "../Navigation";

export default function Footer() {
    return (
        <StyledFooter>
            <Navigation />
        </StyledFooter>
    );
}

const StyledFooter = styled.footer`
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
`;
