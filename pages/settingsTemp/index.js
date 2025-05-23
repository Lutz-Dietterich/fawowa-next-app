import SetpointDisplay from "../../components/SetpointDisplay";
import GaugeButton from "../../components/buttons/GaugeButton";
import TempButton from "../../components/buttons/TempButton";

export default function SettingsTemp() {
    const value = 25;
    return (
        <div>
            <SetpointDisplay isTemp={0} value={value} />
            <GaugeButton text={"-"} />
            <GaugeButton text={"+"} />
            <TempButton on={1} />
        </div>
    );
}
