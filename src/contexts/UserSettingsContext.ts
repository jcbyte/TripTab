import React, { createContext } from "react";
import UserSettings, { DEFAULT as DEFAULT_USER_SETTINGS } from "../types/UserSettings";

const UserSettingsContext = createContext<{
	userSettings: UserSettings;
	setUserSettings: React.Dispatch<React.SetStateAction<UserSettings>>;
}>({
	userSettings: DEFAULT_USER_SETTINGS,
	setUserSettings: () => {},
});
export default UserSettingsContext;
