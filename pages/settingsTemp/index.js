import SetpointDisplay from "../../components/SetpointDisplay";

export default function SettingsTemp() {
    const value = 25;
    return (
        <div>
            <SetpointDisplay isTemp={0} value={value} />
        </div>
    );
}
