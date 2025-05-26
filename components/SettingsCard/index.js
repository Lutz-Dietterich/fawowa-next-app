import { useState } from "react";
import styled from "styled-components";

import SetpointDisplay from "../../components/SetpointDisplay";
import GaugeButton from "../../components/buttons/GaugeButton";
import TempButton from "../../components/buttons/TempButton";
import HumButton from "../../components/buttons/HumButton";

export default function SettingsCard({ type }) {
    const [mode, setMode] = useState(type); // "temp" oder "hum"
    const valueTemp = 25;
    const valueHum = 60;

    const isTemp = mode === "temp";
    const isHum = mode === "hum";

    return (
        <StyledContainer>
            <StyledH2>{isTemp ? "Temperatur" : "Luftfeuchigkeit"}</StyledH2>
            <SetpointDisplay isTemp={isTemp ? 1 : 0} value={isTemp ? valueTemp : valueHum} />
            <StyledGaugeButtonContainer>
                <GaugeButton text="-" />
                <GaugeButton text="+" />
            </StyledGaugeButtonContainer>
            <TempButton tempOn={isTemp} onToggle={() => setMode("temp")} />
            <HumButton humOn={isHum} onToggle={() => setMode("hum")} />
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
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

const StyledGaugeButtonContainer = styled.div`
display: flex;
justify-content: space-between;
margin-top: 15px;
width: 65%;
`
