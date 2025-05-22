import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";

export default function Navigation() {
    const [active, setActive] = useState("home");

    return (
        <Nav>
            <NavList>
                <NavItem>
                    <NavButton onClick={() => setActive("settings")}>
                        <NavIcon
                            src={active === "settings" ? "/assets/icons/iconSettingsOn.svg" : "/assets/icons/iconSettings.svg"}
                            alt="settings icon"
                            width={32}
                            height={32}
                        />
                    </NavButton>
                </NavItem>
                <NavItem>
                    <NavButton onClick={() => setActive("home")}>
                        <NavIcon
                            src={active === "home" ? "/assets/icons/iconHomeOn.svg" : "/assets/icons/iconHome.svg"}
                            alt="home icon"
                            width={32}
                            height={32}
                        />
                    </NavButton>
                </NavItem>
                <NavItem>
                    <NavButton onClick={() => setActive("light")}>
                        <NavIcon
                            src={active === "light" ? "/assets/icons/iconLightOn.svg" : "/assets/icons/iconLight.svg"}
                            alt="light icon"
                            width={32}
                            height={32}
                        />
                    </NavButton>
                </NavItem>
            </NavList>
        </Nav>
    );
}

const Nav = styled.nav`
    width: 90%;
`;

const NavList = styled.ul`
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const NavItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;

    &:first-child {
        justify-content: flex-start;
    }

    &:last-child {
        justify-content: flex-end;
    }
`;

const NavButton = styled.button`
    display: flex;
    align-items: center;
    background-color: transparent;
    border: none;
    padding: 1rem;
    margin: 0;
`;

const NavIcon = styled(Image)`
    width: 2rem;
    height: 2rem;
`;
