import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";

import iconHum from "/public/assets/icons/iconHum.svg";
import iconHumOn from "/public/assets/icons/iconHumOn.svg";

export default function HumButton({ initialOn = true }) {
    const [isOn, setIsOn] = useState(initialOn);

    return (
        <StyledButton onClick={() => setIsOn(!isOn)}>
            <Image src={isOn ? iconHumOn : iconHum} alt="Temp Icon" width={32} height={32} priority />
        </StyledButton>
    );
}

const StyledButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;
