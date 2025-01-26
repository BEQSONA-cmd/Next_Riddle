import { useState, useEffect } from "react";

const Map_Options = ({ settings, handleChange }: { settings: any; handleChange: (key: string, value: any) => void }) => 
{
    return (
        <>
            {/* FOV */}
            <div className="flex flex-col">
                <label htmlFor="FOV" className="font-semibold mb-2">Field of View (FOV)</label>
                <input
                    type="range"
                    id="FOV"
                    min="30"
                    max="120"
                    step="1"
                    value={settings.FOV}
                    onChange={(e) => handleChange("FOV", parseInt(e.target.value))}
                    className="slider"
                />
                <span className="text-lg mt-2">Current: {settings.FOV}°</span>
            </div>

            {/* Pixel Size */}
            <div className="flex flex-col">
                <label htmlFor="pixel_size" className="font-semibold mb-2">Pixel Size</label>
                <input
                    type="range"
                    id="pixel_size"
                    min="2"
                    max="20"
                    step="1"
                    value={settings.pixel_size}
                    onChange={(e) => handleChange("pixel_size", parseInt(e.target.value))}
                    className="slider"
                />
                <span className="text-lg mt-2">Current: {settings.pixel_size}px</span>
            </div>

            {/* MODE */}
            <div className="flex flex-col">
                <label htmlFor="MODE" className="font-semibold mb-2">2D Mode</label>
                <button
                    onClick={() => handleChange("MODE", settings.MODE === 0 ? 1 : 0)}
                    className={`px-8 py-4 text-white font-semibold rounded-lg shadow-md ${
                        settings.MODE === 1 ? "bg-green-500 hover:bg-green-600 transform hover:scale-105 transition duration-300" :
                         "bg-red-500 hover:bg-red-600 transform hover:scale-105 transition duration-300"
                    }`}
                >
                    {settings.MODE === 1 ? "ON" : "OFF"}
                </button>
            </div>

            {/* Darkness */}
            <div className="flex flex-col">
                <label htmlFor="darkness" className="font-semibold mb-2">Darkness</label>
                <button
                    onClick={() => handleChange("darkness", settings.darkness === 0 ? 1 : 0)}
                    className={`px-8 py-4 text-white font-semibold rounded-lg shadow-md ${
                        settings.darkness === 1 ? "bg-green-500 hover:bg-green-600 transform hover:scale-105 transition duration-300" :
                         "bg-red-500 hover:bg-red-600 transform hover:scale-105 transition duration-300"
                    }`}
                >
                    {settings.darkness === 1 ? "ON" : "OFF"}
                </button>
            </div>
        </>
    );
}

const Settings = ({ onSettingsSave }: { onSettingsSave: (settings: any) => void }) => {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        setSettings({
            FOV: 90,
            pixel_size: 6,
            MODE: 0,
            darkness: 0,
            WIDTH: 800,
            HEIGHT: 600,
        });
    }, []);

    const handleChange = (key: string, value: any) => {
        setSettings((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleToggle = (key: string) => {
        setSettings((prev: any) => ({ ...prev, [key]: prev[key] === 0 ? 1 : 0 }));
    };

    const handleSave = () => {
        const updatedSettings = {
            ...settings,
            FOV: (settings.FOV * Math.PI) / 180,
        };
        onSettingsSave(updatedSettings);
    };

    if (!settings) return <p>Loading settings...</p>;

    return (
        <div className="p-8 bg-gray-800 rounded-lg shadow-md text-white">
            <h2 className="text-4xl font-bold mb-8 text-center">Settings</h2>
            <div className="grid grid-cols-2 gap-8 text-2xl">
                < Map_Options settings={settings} handleChange={handleChange} />
            </div>
            <div className="flex flex-col mt-4 text-2xl">
                <label htmlFor="resolution" className="text-center font-semibold mb-4">Resolution</label>
                <select
                    id="resolution"
                    value={`${settings.WIDTH}x${settings.HEIGHT}`}
                    onChange={(e) => {
                        const [width, height] = e.target.value.split('x').map(Number);
                        handleChange("WIDTH", width);
                        handleChange("HEIGHT", height);
                    }}
                    className="px-4 py-2 bg-gray-700 text-white rounded-md"
                >
                    <option value="800x600">800x600</option>
                    <option value="1280x720">1280x720</option>
                    <option value="1920x1080">1920x1080</option>
                </select>
            </div>

            <div className="flex justify-center mt-8 text-2xl">
                <button
                    onClick={handleSave}
                    className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transform hover:scale-105 transition duration-300"
                >
                    Start Game
                </button>
        </div>
        </div>
    );
};

export { Settings };