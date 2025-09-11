import styled from "styled-components";
import { useState } from "react";
import Image from "next/image";

import iconTemp from "/public/assets/icons/iconTemp.svg";
import iconTempOn from "/public/assets/icons/iconTempOn.svg";

export default function HumButton({ tempOn, onToggle }) {
    return (
        <StyledButton onClick={onToggle}>
            <Image
                src={tempOn ? iconTempOn : iconTemp}
                alt="Hum Icon"
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
