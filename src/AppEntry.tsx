import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Text, useColorScheme, View } from "react-native";
import App from "./App";
import { ThemeProvider } from "./hooks/Theme";
import { themes } from "./styles";
import Record from "./types/Record";
import UserSettings from "./types/UserSettings";
import { retrieveRecords, retrieveUserSettings } from "./utils/storeUtils";

// todo icon

export default function AppEntry() {
	const scheme = useColorScheme();
	const [ready, setReady] = useState<boolean>(false);

	const loadedRecordsRef = useRef<Record[]>();
	const loadedUserSettingsRef = useRef<UserSettings>();

	useEffect(() => {
		const loadData = async () => {
			loadedRecordsRef.current = await retrieveRecords();
			loadedUserSettingsRef.current = await retrieveUserSettings().then((res: UserSettings) =>
				res.theme ? res : { ...res, theme: scheme === "dark" ? "dark" : "light" }
			);
			setReady(true);
		};
		loadData();
	}, []);

	return (
		<>
			{ready ? (
				<ThemeProvider initialTheme={themes[loadedUserSettingsRef.current!.theme!]}>
					<App retrievedRecords={loadedRecordsRef.current!} retrievedUserSettings={loadedUserSettingsRef.current!} />
				</ThemeProvider>
			) : (
				<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
					<ActivityIndicator size="large" />
					<Text>Loading</Text>
				</View>
			)}
		</>
	);
}
