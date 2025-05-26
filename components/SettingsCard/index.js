import { useState } from "react";
import styled from "styled-components";

import SetpointDisplay from "../../components/SetpointDisplay";
import GaugeButton from "../../components/buttons/GaugeButton";
import TempButton from "../../components/buttons/TempButton";
import HumButton from "../../components/buttons/HumButton";

export default function SettingsCard({ title, type }) {
    const [mode, setMode] = useState(type); // "temp" oder "hum"
    const value = 25;

    const isTemp = mode === "temp";
    const isHum = mode === "hum";

    return (
        <StyledContainer>
            <StyledH2>{isTemp ? "Temperatur" : "Luftfeuchigkeit"}</StyledH2>
            <SetpointDisplay isTemp={isTemp ? 1 : 0} value={value} />
            <GaugeButton text="-" />
            <GaugeButton text="+" />
            <TempButton tempOn={isTemp} onToggle={() => setMode("temp")} />
            <HumButton humOn={isHum} onToggle={() => setMode("hum")} />
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    width: 80vw;
    max-width: 400px;
    background-color: var(--color-card-background);
    border-radius: 10px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
`;

const StyledH2 = styled.h2`
padding-top: 30px;
    text-align: center;
    color: var(--color-text-light);
`;
