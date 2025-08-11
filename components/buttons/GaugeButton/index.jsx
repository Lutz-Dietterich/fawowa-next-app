import styled from "styled-components";

export default function GaugeButton({ text, onClick }) {
    return (
        <>
            <StyledButton onClick={onClick}>{text}</StyledButton>
        </>
    );
}

const StyledButton = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 100%;
    background-image: var(--color-button);
    z-index: 1000;

    font-size: 2rem;
    color: var(--color-text-light);
    font-weight: bold;
`;
