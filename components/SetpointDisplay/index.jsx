import styled from "styled-components";

export default function SetpointDisplay({ isTemp = false, value }) {
    // Minimalwert für den Regler
    const min = 0;
    // Maximalwert abhängig davon, ob Temperatur (35) oder Prozent (100)
    const max = isTemp ? 35 : 100;

    // Radius des Kreises in der SVG
    const radius = 120;
    // Gesamtlänge des Kreisumfangs für den Strich (strokeDasharray)
    const dasharray = 725;
    // Minimaler Offset des Strichs (Startposition für die Anzeige)
    const minOffset = 170;

    // Berechnung des aktuellen strokeDashoffset basierend auf value
    // Je höher der Wert, desto kleiner der Offset (mehr sichtbarer Strich)
    const calculateOffset = (val) => {
        return dasharray - (val / max) * (dasharray - minOffset);
    };

    return (
        <Container>
            <StyledValue>
                {value}
                <StyledSpan>{isTemp ? "°C" : "%"}</StyledSpan>
            </StyledValue>

            <SVG viewBox="0 0 300 300">
                {/* Hintergrundkreis, grauer Strich */}
                <circle
                    cx="150" // x-Koordinate des Mittelpunkts in SVG (Mitte bei 300x300 ViewBox)
                    cy="150" // y-Koordinate des Mittelpunkts
                    r={radius} // Radius des Kreises
                    fill="none" // Keine Füllung
                    stroke="rgba(11, 12, 13, 1)" // Farbe des Strichs
                    strokeWidth="12" // Strichbreite
                    strokeDasharray={dasharray} // Länge des Strichs für animierten Effekt
                    strokeDashoffset={minOffset} // Startoffset des Strichs
                    strokeLinecap="round" // Abrundung der Strichenden
                />
                <defs>
                    {/* Farbverlauf für den Vordergrund-Kreis */}
                    <linearGradient id="gradient" x1="0%" y1="70%" x2="100%" y2="80%">
                        <stop offset="0%" stopColor={isTemp ? "#e31616" : "rgba(91, 222, 70, 1)"} />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 1)" />
                    </linearGradient>
                    {/* Filter für den Leuchteffekt (Glow) */}
                    <filter id="glow">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12.5" result="blur" />
                        <feFlood floodColor="rgba(10, 137, 218, 1)" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* Vordergrund-Kreis mit Farbverlauf und Leuchteffekt, animiert */}
                <circle
                    cx="150"
                    cy="150"
                    r={radius}
                    fill="none"
                    stroke="url(#gradient)" // Verwendet den definierten Farbverlauf
                    filter="url(#glow)" // Leuchteffekt anwenden
                    strokeWidth="12"
                    strokeDasharray={dasharray}
                    strokeDashoffset={calculateOffset(value)} // Offset dynamisch nach Wert berechnet
                    strokeLinecap="round"
                />
            </SVG>
            <StyledScaleLabel>
                <StyledLabelValue>
                    {min} {isTemp ? "°C" : "%"}
                </StyledLabelValue>
                <StyledLabelValue>
                    {max} {isTemp ? "°C" : "%"}
                </StyledLabelValue>
            </StyledScaleLabel>
        </Container>
    );
}

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 300px;
    width: auto;
`;

const StyledValue = styled.span`
    position: absolute;
    top: 35%;
    font-size: 2rem;
    color: white;
`;

const StyledSpan = styled.span`
    font-size: 1rem;
`;

const SVG = styled.svg`
    width: 200px;
    height: 200px;
    margin-top: 3rem;
    overflow: visible;
    transform: rotate(139deg);
    z-index: 2;
`;

const StyledScaleLabel = styled.div`
    display: flex;
    width: 70vw;
    max-width: 260px;
    justify-content: space-between;
    margin-top: -40px;
`;

const StyledLabelValue = styled.span`
    color: aliceblue;
`;
