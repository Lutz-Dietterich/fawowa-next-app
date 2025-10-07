import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { useMqttStore } from "../../store/mqttStore";

export default function Main() {
    // Zustand Store Selectors
    const { temperature, humidity, connect, disconnect } = useMqttStore();

    const [now, setNow] = useState(null);

    // Connect on mount, disconnect on unmount
    useEffect(() => {
        connect();

        return () => {
            disconnect();
        };
    }, [connect, disconnect]);

    useEffect(() => {
        setNow(new Date());
        const timer = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!now) return null; // oder ein Platzhalter während SSR

    const timeString = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const dateString = now.toLocaleDateString("de-DE", {
        weekday: "long",
        day: "numeric",
        month: "long",
    });

    return (
        <StyledMain>
            <StyledHomeCard>
                <StyledHomeCardHeader>
                    <StyledHomeCardHeaderTime>{timeString}</StyledHomeCardHeaderTime>
                    <StyledHomeCardHeaderDate>{dateString}</StyledHomeCardHeaderDate>
                </StyledHomeCardHeader>

                <StyledHomeCardMonitoring>
                    <StyledMonitoringArea>
                        <StyledMonitoringText>IN</StyledMonitoringText>
                        <StyledMonitoringMessure>
                            <span>{temperature !== null ? `${temperature.toFixed(1)}` : "--"}</span>
                            <img src="/assets/icons/iconTempLight.svg" alt="C°" />
                        </StyledMonitoringMessure>
                        <StyledMonitoringMessure>
                            <span>{humidity !== null ? `${humidity.toFixed(1)} %` : "--"}</span>
                            <img src="/assets/icons/iconHumLight.svg" alt="rel" />
                        </StyledMonitoringMessure>
                    </StyledMonitoringArea>

                    <StyledHomeCardMonitoringStatus>
                        <StyledVentMotionIcon src="/assets/icons/icon-vent-status.svg" alt="Vent Status" />
                        <StyledHomeCardMonitoringStatusIcon src="/assets/icons/iconAutoON.svg" alt="Automatic Status" />
                        <StyledHomeCardMonitoringStatusIcon src="/assets/icons/iconClock.svg" alt="TimeProgramm Status" />
                    </StyledHomeCardMonitoringStatus>

                    <StyledMonitoringArea>
                        <StyledMonitoringText>OUT</StyledMonitoringText>
                        <StyledMonitoringMessure>
                            <span>12</span>
                            <img src="/assets/icons/iconTempLight.svg" alt="C°" />
                        </StyledMonitoringMessure>
                        <StyledMonitoringMessure>
                            <span>60%</span>
                            <img src="/assets/icons/iconHumLight.svg" alt="rel" />
                        </StyledMonitoringMessure>
                    </StyledMonitoringArea>
                </StyledHomeCardMonitoring>
            </StyledHomeCard>
        </StyledMain>
    );
}

const StyledMain = styled.main`
    width: 100%;
    height: 65vh;
    box-shadow: none;
    display: flex;
    justify-content: center;
`;

const StyledHomeCard = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: none;
    width: 100%;
    max-width: 600px;
    margin-top: 10%;
`;

const StyledHomeCardHeader = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
`;

const StyledHomeCardHeaderTime = styled.p`
    font-size: 4rem;
    font-weight: 700;
    color: var(--color-text-light);
    letter-spacing: 3.67px;
    margin: 0;
`;

const StyledHomeCardHeaderDate = styled.p`
    font-size: 20px;
    font-weight: 400;
    color: var(--color-text-light, #fff);
    margin: 0;
`;

const StyledHomeCardMonitoring = styled.section`
    display: flex;
    align-items: center;
    font-size: 2rem;
    font-weight: 300;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 1);
    flex-direction: column;
    color: var(--color-text-light);
`;

const StyledMonitoringArea = styled.section`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

const StyledMonitoringText = styled.p`
    margin: 0;
`;

const StyledMonitoringMessure = styled.div`
    display: flex;
    align-items: center;
    gap: 0.6rem;
`;

const StyledHomeCardMonitoringStatus = styled.section`
    display: flex;
    gap: 2.5rem;
    margin: 1.3rem 0;
`;

const ventMotionSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledVentMotionIcon = styled.img`
    pointer-events: none;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${ventMotionSpin} infinite 17s linear;
    }

    width: 100%;
`;

const StyledHomeCardMonitoringStatusIcon = styled.img`
    width: 100%;
`;
