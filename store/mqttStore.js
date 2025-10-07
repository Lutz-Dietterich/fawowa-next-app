import { create } from "zustand";
import mqtt from "mqtt";

export const useMqttStore = create((set, get) => ({
    // Connection State
    client: null,
    isConnected: false,
    connectionError: null,

    // Sensor Data
    temperature: null,
    humidity: null,
    lastUpdate: null,

    // Messages
    messages: [],
    messageCount: 0,

    // MQTT Connection
    connect: () => {
        const { client } = get();

        // Verhindere mehrfache Verbindungen
        if (client && client.connected) {
            console.log("Already connected to MQTT broker");
            return;
        }

        // MQTT Broker-Konfiguration
        const brokerUrl = "ws://192.168.1.170:9001"; // WebSocket Port!
        const options = {
            clientId: `mqtt_web_${Math.random().toString(16).substring(2, 8)}`,
            clean: true,
            connectTimeout: 4000,
            reconnectPeriod: 1000,
        };

        console.log("Connecting to MQTT broker...");
        const mqttClient = mqtt.connect(brokerUrl, options);

        // Connection Event
        mqttClient.on("connect", () => {
            console.log("Connected to MQTT broker");
            set({
                isConnected: true,
                connectionError: null,
                client: mqttClient,
            });

            // Subscribe to topics

            if (mqttClient && mqttClient.connected) {
                try {
                    mqttClient.subscribe("house/main", (err) => {
                        if (err) console.error("Subscribe error:", err);
                    });
                    mqttClient.subscribe("house/led/status", (err) => {
                        if (err) console.error("Subscribe error:", err);
                    });
                    mqttClient.subscribe("house/temperature", (err) => {
                        if (err) console.error("Subscribe error:", err);
                    });
                    mqttClient.subscribe("house/humidity", (err) => {
                        if (err) console.error("Subscribe error:", err);
                    });
                } catch (e) {
                    console.warn("Subscribe skipped, client disconnecting", e);
                }
            } else {
                console.warn("Client not connected, skipping subscribe");
            }
        });

        // Message Event
        mqttClient.on("message", (topic, payload) => {
            const message = payload.toString();
            const timestamp = new Date().toLocaleTimeString("de-DE");

            if (topic === "house/temperature") {
                const temperature = parseFloat(message);
                if (!isNaN(temperature)) set({ temperature, lastUpdate: timestamp });
            } else if (topic === "house/humidity") {
                const humidity = parseFloat(message);
                if (!isNaN(humidity)) set({ humidity, lastUpdate: timestamp });
            }

            // Alle Nachrichten speichern
            set((state) => ({
                messages: [{ id: Date.now(), topic, message, timestamp }, ...state.messages].slice(0, 50),
                messageCount: state.messageCount + 1,
            }));
        });

        // Error Event
        mqttClient.on("error", (error) => {
            console.error("MQTT Error:", error);
            set({
                connectionError: error.message,
                isConnected: false,
            });
        });

        // Disconnect Event
        mqttClient.on("close", () => {
            console.log("Disconnected from MQTT broker");
            set({ isConnected: false, client: null }); // alten Client entfernen
        });

        // Reconnect Event
        mqttClient.on("reconnect", () => {
            console.log("Reconnecting to MQTT broker...");
        });

        set({ client: mqttClient });
    },

    // Disconnect
    disconnect: () => {
        const { client } = get();
        if (client) {
            client.end();
            set({
                client: null,
                isConnected: false,
                temperature: null,
                humidity: null,
                lastUpdate: null,
            });
            console.log("MQTT client disconnected");
        }
    },

    // Publish Message
    publish: (topic, message) => {
        const { client, isConnected } = get();
        if (client && isConnected) {
            client.publish(topic, message, { qos: 0 }, (error) => {
                if (error) {
                    console.error("Publish error:", error);
                } else {
                    console.log(`Published to ${topic}: ${message}`);
                }
            });
        } else {
            console.error("Cannot publish: Not connected to MQTT broker");
        }
    },

    // Subscribe to additional topics
    subscribe: (topic) => {
        const { client, isConnected } = get();
        if (client && isConnected) {
            client.subscribe(topic, (err) => {
                if (err) {
                    console.error(`Subscribe error for ${topic}:`, err);
                } else {
                    console.log(`Subscribed to ${topic}`);
                }
            });
        }
    },

    // Unsubscribe from topics
    unsubscribe: (topic) => {
        const { client, isConnected } = get();
        if (client && isConnected) {
            client.unsubscribe(topic, (err) => {
                if (err) {
                    console.error(`Unsubscribe error for ${topic}:`, err);
                } else {
                    console.log(`Unsubscribed from ${topic}`);
                }
            });
        }
    },

    // Clear Messages
    clearMessages: () => {
        set({ messages: [], messageCount: 0 });
    },
}));
