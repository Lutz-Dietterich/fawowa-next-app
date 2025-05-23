import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";

import iconTemp from "/public/assets/icons/iconTemp.svg";
import iconTempOn from "/public/assets/icons/iconTempOn.svg";

export default function TempButton({ initialOn = true }) {
    const [isOn, setIsOn] = useState(initialOn);

    return (
        <StyledButton onClick={() => setIsOn(!isOn)}>
            <Image
                src={isOn ? iconTempOn : iconTemp}
                alt="Temp Icon"
                width={32}
                height={32}
                priority
            />
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
