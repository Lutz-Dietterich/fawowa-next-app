import styled from "styled-components";

import SettingsCard from "../../components/SettingsCard";

export default function SettingsTemp() {
    const value = 25;
    return (
        <StyledContainer>
            <SettingsCard type={"temp"} />
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
