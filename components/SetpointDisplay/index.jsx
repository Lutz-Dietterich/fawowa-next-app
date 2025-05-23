// components/SetpointController.jsx

import { useState, useEffect } from "react";
import styled from "styled-components";

export default function SetpointController({ isTemp = true }) {
    const min = 0;
    const max = isTemp ? 35 : 60;
    const [value, setValue] = useState(20); // Startwert
    const radius = 120;
    const dasharray = 725;
    const minOffset = 170;

    const calculateOffset = (val) => {
        return dasharray - (val / max) * (dasharray - minOffset);
    };

    const handleMinus = () => {
        if (value > min) {
            setValue(value - 1);
        }
    };

    const handlePlus = () => {
        if (value < max) {
            setValue(value + 1);
        }
    };

    return (
        <Container>
            <Controls>
                <Button onClick={handleMinus}>-</Button>
                <Input type="number" readOnly value={value} />
                <Button onClick={handlePlus}>+</Button>
            </Controls>

            <Svg viewBox="0 0 300 300">
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="rgba(11, 12, 13, 1)"
                    strokeWidth="12"
                    strokeDasharray={dasharray}
                    strokeDashoffset={minOffset}
                    strokeLinecap="round"
                    
                />
                <defs>
                    <linearGradient id="gradient" x1="25%" y1="25%" x2="50%" y2="50%">
                        <stop offset="0%" stopColor="rgba(91, 222, 70, 1)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12.5" result="blur" />
                        <feFlood floodColor="rgba(10, 137, 218, 1)" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="url(#gradient)"
                    filter="url(#glow)"
                    strokeWidth="12"
                    strokeDasharray={dasharray}
                    strokeDashoffset={calculateOffset(value)}
                    strokeLinecap="round"
                />
            </Svg>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 300px;
    width: auto;
`;

const Controls = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
`;

const Button = styled.button`
    padding: 0.5rem 1rem;
    font-size: 1.5rem;
    cursor: pointer;
`;

const Input = styled.input`
    width: 60px;
    text-align: center;
    font-size: 1.2rem;
`;

const Svg = styled.svg`
    width: 100px;
    height: 100px;
    overflow: visible;
`;
