import { useState } from "react";
import styled from "styled-components";

import SetpointDisplay from "../SetpointDisplay";
import GaugeButton from "../buttons/GaugeButton";
import TempButton from "../buttons/TempButton";
import HumButton from "../buttons/HumButton";

export default function SettingsCard({ type = "temp" }) {
    const [mode, setMode] = useState(type); // "temp" oder "hum"
    const [valueTemp, setValueTemp] = useState(25);
    const [valueHum, setValueHum] = useState(60);
    /*const valueTemp = 25;*/
    /*const valueHum = 60;*/

    const isTemp = mode === "temp";
    const isHum = mode === "hum";

    return (
        <StyledContainer>
            <StyledH2>{isTemp ? "Temperatur" : "Luftfeuchigkeit"}</StyledH2>
            <SetpointDisplay isTemp={isTemp ? 1 : 0} value={isTemp ? valueTemp : valueHum} />
            <StyledGaugeButtonContainer>
                <GaugeButton
                    text="-"
                    onClick={
                        isTemp
                            ? () => {
                                  if (valueTemp > 0) setValueTemp(valueTemp - 1);
                              }
                            : () => {
                                  if (valueHum > 0) setValueHum(valueHum - 1);
                              }
                    }
                />
                <GaugeButton
                    text="+"
                    onClick={
                        isTemp
                            ? () => {
                                  if (valueTemp < 35) setValueTemp(valueTemp + 1);
                              }
                            : () => {
                                  if (valueHum < 100) setValueHum(valueHum + 1);
                              }
                    }
                />
            </StyledGaugeButtonContainer>
            <StyledSwitchButtonContainer>
                <StyledTempHumButtonContainer>
                    <TempButton tempOn={isTemp} onToggle={() => setMode("temp")} />
                    <HumButton humOn={isHum} onToggle={() => setMode("hum")} />
                </StyledTempHumButtonContainer>
            </StyledSwitchButtonContainer>
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
`;

const StyledSwitchButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin-top: 35px;
    margin-bottom: 15px;
`;

const StyledTempHumButtonContainer = styled.div`
    display: flex;
    gap: 15px;
`;
