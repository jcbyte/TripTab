import AsyncStorage from "@react-native-async-storage/async-storage";
import Record from "../types/Record";
import UserSettings, { DEFAULT as DEFAULT_USER_SETTINGS } from "../types/UserSettings";

const keyMappings = {
	records: "records",
	userSettings: "userSettings",
};

export async function retrieveRecords(): Promise<Record[]> {
	return AsyncStorage.getItem(keyMappings.records).then((res) => (res ? (JSON.parse(res) as Record[]) : []));
}

export async function saveRecords(records: Record[]): Promise<void> {
	return AsyncStorage.setItem(keyMappings.records, JSON.stringify(records));
}

export async function retrieveUserSettings(): Promise<UserSettings> {
	return AsyncStorage.getItem(keyMappings.userSettings).then((res) =>
		res ? (JSON.parse(res) as UserSettings) : DEFAULT_USER_SETTINGS
	);
}

export async function saveUserSettings(userSettings: UserSettings): Promise<void> {
	console.log(userSettings);
	return AsyncStorage.setItem(keyMappings.userSettings, JSON.stringify(userSettings));
}
