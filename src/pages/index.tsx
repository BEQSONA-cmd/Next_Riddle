import { useState } from "react";
import Game from "@/components/Game";
import { Settings } from "@/components/Settings";

export default function Home() {
    const [settings, setSettings] = useState<any>(null);

    const handleSettingsSave = (newSettings: any) => {
        setSettings(newSettings);
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white">
            {!settings ? (
                <Settings onSettingsSave={handleSettingsSave} />
            ) : (
                <main className="flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-4 text-white">Game</h1>
                    <Game settings={settings} />
                </main>
            )}
        </div>
    );
}
