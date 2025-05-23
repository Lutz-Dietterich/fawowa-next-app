import styled from "styled-components";

import SetpointDisplay from "../../components/SetpointDisplay";
import GaugeButton from "../../components/buttons/GaugeButton";
import TempButton from "../../components/buttons/TempButton";
import HumButton from "../../components/buttons/HumButton";

export default function SettingsCard() {
    const value = 25;
    return (
        <StyledContainer>
            <h2>hallo</h2>
            <SetpointDisplay isTemp={1} value={value} />
            <GaugeButton text={"-"} />
            <GaugeButton text={"+"} />
            <TempButton initialOn={0} />
            <HumButton initialOn={1} />
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    width: 80vw;
    background-color: var(--color-card-background);
    border-radius: 10px;
    box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.5);
`;
