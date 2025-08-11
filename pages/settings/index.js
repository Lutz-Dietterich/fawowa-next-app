import styled from "styled-components";

import SettingsCard from "../../components/SettingsCard";

export default function Settings() {
    return (
        <StyledContainer>
            <SettingsCard />
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
