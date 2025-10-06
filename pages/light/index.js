import React, { useState, useEffect } from "react";
import mqtt from "mqtt";
import styled from "styled-components";

export default function About() {
    const [isConnected, setIsConnected] = useState(false);
    const [messages, setMessages] = useState([]);
    const [messageCount, setMessageCount] = useState(0);
    const [client, setClient] = useState(null);

    // NEU: States für Sensor-Daten
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);
    const [lastUpdate, setLastUpdate] = useState(null);

    useEffect(() => {
        let mqttClient = null;
        let isConnecting = false;

        const connectMQTT = () => {
            if (isConnecting || mqttClient) return;

            isConnecting = true;

            // MQTT-Client konfigurieren (ändere IP zu deiner Pi-IP)
            mqttClient = mqtt.connect("ws://192.168.1.170:9001", {
                clientId: "react_about_page_" + Math.random().toString(16).substr(2, 8),
                keepalive: 60,
                clean: true,
                connectTimeout: 4000,
                reconnectPeriod: 1000,
            });

            mqttClient.on("connect", () => {
                console.log("MQTT verbunden!");
                setIsConnected(true);
                isConnecting = false; 

                // Subscribe mit kleiner Verzögerung um sicherzugehen
                setTimeout(() => {
                    if (mqttClient && mqttClient.connected) {
                        // Subscribe zu allen Topics
                        mqttClient.subscribe("house/main", (err) => {
                            if (!err) console.log("Subscribed: house/main");
                        });

                        // NEU: Subscribe zu Sensor-Topics
                        mqttClient.subscribe("house/temperature", (err) => {
                            if (!err) console.log("Subscribed: house/temperature");
                        });

                        mqttClient.subscribe("house/humidity", (err) => {
                            if (!err) console.log("Subscribed: house/humidity");
                        });

                        mqttClient.subscribe("house/led/control", (err) => {
                            if (!err) console.log("Subscribed: house/led/control");
                        });
                    }
                }, 100);
            });

            mqttClient.on("disconnect", () => {
                console.log("MQTT getrennt");
                setIsConnected(false);
                isConnecting = false;
            });

            mqttClient.on("reconnect", () => {
                console.log("MQTT reconnecting...");
            });

            mqttClient.on("message", (topic, payload) => {
                const message = payload.toString();

                // NEU: Sensor-Daten verarbeiten
                if (topic === "house/temperature") {
                    setTemperature(parseFloat(message));
                    setLastUpdate(new Date().toLocaleTimeString());
                    console.log("Temperatur empfangen:", message);
                } else if (topic === "house/humidity") {
                    setHumidity(parseFloat(message));
                    setLastUpdate(new Date().toLocaleTimeString());
                    console.log("Luftfeuchtigkeit empfangen:", message);
                } else {
                    // Andere Nachrichten wie bisher
                    const newMessage = {
                        id: Date.now(),
                        topic: topic,
                        message: message,
                        timestamp: new Date().toLocaleTimeString(),
                    };

                    setMessageCount((prev) => prev + 1);
                    setMessages((prev) => [newMessage, ...prev.slice(0, 19)]);
                }
            });

            mqttClient.on("error", (error) => {
                console.error("MQTT Fehler:", error);
                setIsConnected(false);
                isConnecting = false;
            });

            setClient(mqttClient);
        };

        connectMQTT();

        return () => {
            if (mqttClient) {
                mqttClient.removeAllListeners();
                if (mqttClient.connected) {
                    mqttClient.end(true);
                }
                mqttClient = null;
            }
        };
    }, []);

    const controlLED = (state) => {
        if (client && client.connected) {
            client.publish("house/led/control", state, (err) => {
                if (err) {
                    console.error("Publish Fehler:", err);
                } else {
                    console.log(`LED ${state} gesendet`);
                }
            });
        } else {
            console.warn("MQTT Client nicht verbunden");
        }
    };

    return (
        <Container>
            <Title>About - ESP8266 MQTT Dashboard</Title>

            {/* Connection Status */}
            <StatusBadge connected={isConnected}>
                <StatusDot connected={isConnected} />
                {isConnected ? "Mit MQTT-Broker verbunden" : "Nicht verbunden"}
            </StatusBadge>

            {/* NEU: Sensor-Daten Anzeige */}
            <SensorGrid>
                <SensorCard>
                    <SensorIcon>🌡️</SensorIcon>
                    <SensorLabel>Temperatur</SensorLabel>
                    <SensorValue>{temperature !== null ? `${temperature.toFixed(1)} °C` : "--"}</SensorValue>
                    {lastUpdate && <SensorTime>Aktualisiert: {lastUpdate}</SensorTime>}
                </SensorCard>

                <SensorCard>
                    <SensorIcon>💧</SensorIcon>
                    <SensorLabel>Luftfeuchtigkeit</SensorLabel>
                    <SensorValue>{humidity !== null ? `${humidity.toFixed(1)} %` : "--"}</SensorValue>
                    {lastUpdate && <SensorTime>Aktualisiert: {lastUpdate}</SensorTime>}
                </SensorCard>
            </SensorGrid>

            {/* ESP8266 Info */}
            <InfoCard>
                <InfoTitle>ESP8266 Wemos D1 Mini Status</InfoTitle>
                <InfoText>
                    <strong>MQTT Topic:</strong> house/main
                </InfoText>
                <InfoText>
                    <strong>Broker IP:</strong> 192.168.1.170:1883
                </InfoText>
                <InfoText>
                    <strong>Client ID:</strong> ESP8266Client
                </InfoText>
                <InfoText>
                    <strong>Status:</strong> {isConnected ? "Aktiv - sendet Nachrichten" : "Warte auf Verbindung..."}
                </InfoText>
            </InfoCard>

            {/* LED Controls */}
            <LEDControls>
                <LEDTitle>ESP8266 LED Steuerung</LEDTitle>
                <ButtonGroup>
                    <OnButton onClick={() => controlLED("ON")} disabled={!isConnected}>
                        LED Ein
                    </OnButton>
                    <OffButton onClick={() => controlLED("OFF")} disabled={!isConnected}>
                        LED Aus
                    </OffButton>
                </ButtonGroup>
            </LEDControls>

            {/* Message Counter */}
            <MessageCount>Empfangene Nachrichten: {messageCount}</MessageCount>

            {/* Live Messages */}
            <MessagesCard>
                <MessagesTitle>Live ESP8266 Nachrichten</MessagesTitle>
                {messages.length === 0 ? (
                    <InfoText>Warte auf Nachrichten vom ESP8266...</InfoText>
                ) : (
                    <MessagesList>
                        {messages.map((msg) => (
                            <MessageItem key={msg.id}>
                                <MessageHeader>
                                    <MessageTopic>{msg.topic}</MessageTopic>
                                    <MessageTime>{msg.timestamp}</MessageTime>
                                </MessageHeader>
                                <MessageContent>{msg.message}</MessageContent>
                            </MessageItem>
                        ))}
                    </MessagesList>
                )}
            </MessagesCard>
        </Container>
    );
}

// Styled Components
const Container = styled.div`
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #1a202c;
`;

const StatusBadge = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 0.5rem 1rem;
    border-radius: 9999px;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 2rem;
    background-color: ${(props) => (props.connected ? "#c6f6d5" : "#fed7d7")};
    color: ${(props) => (props.connected ? "#2f855a" : "#c53030")};
`;

const StatusDot = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 0.5rem;
    background-color: ${(props) => (props.connected ? "#38a169" : "#e53e3e")};
`;

// NEU: Styled Components für Sensor-Anzeige
const SensorGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
`;

const SensorCard = styled.div`
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.5) 0%, rgba(118, 75, 162, 0.5) 100%);
    border-radius: 1rem;
    padding: 2rem;
    color: white;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const SensorIcon = styled.div`
    font-size: 3rem;
    margin-bottom: 0.5rem;
`;

const SensorLabel = styled.div`
    font-size: 0.875rem;
    opacity: 0.9;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const SensorValue = styled.div`
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const SensorTime = styled.div`
    font-size: 0.75rem;
    opacity: 0.8;
`;

const InfoCard = styled.div`
    background-color: #f7fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
`;

const InfoTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1rem;
`;

const InfoText = styled.p`
    color: #4a5568;
    margin-bottom: 0.5rem;
`;

const MessagesCard = styled.div`
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    padding: 1.5rem;
`;

const MessagesTitle = styled.h2`
    font-size: 1.25rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1rem;
`;

const MessagesList = styled.div`
    max-height: 400px;
    overflow-y: auto;
`;

const MessageItem = styled.div`
    background-color: #f7fafc;
    border-radius: 0.375rem;
    padding: 1rem;
    margin-bottom: 0.5rem;
    font-size: 0.875rem;
`;

const MessageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const MessageTopic = styled.span`
    font-weight: 500;
    color: #3182ce;
`;

const MessageTime = styled.span`
    color: #718096;
    font-size: 0.75rem;
`;

const MessageContent = styled.div`
    color: #2d3748;
`;

const MessageCount = styled.div`
    background-color: #edf2f7;
    border-radius: 0.375rem;
    padding: 0.75rem;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 500;
    color: #4a5568;
`;

const LEDControls = styled.div`
    background-color: #fff5f5;
    border: 1px solid #feb2b2;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
`;

const LEDTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
`;

const Button = styled.button`
    padding: 0.75rem 1.5rem;
    border-radius: 0.375rem;
    font-weight: 500;
    border: none;
    cursor: pointer;
    transition: background-color 0.2s;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const OnButton = styled(Button)`
    background-color: #48bb78;
    color: white;

    &:hover:not(:disabled) {
        background-color: #38a169;
    }
`;

const OffButton = styled(Button)`
    background-color: #f56565;
    color: white;

    &:hover:not(:disabled) {
        background-color: #e53e3e;
    }
`;
