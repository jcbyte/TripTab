import React, { useEffect, useState } from "react";

import { DefaultTheme, NavigationContainer, ParamListBase, RouteProp } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SafeAreaView, View } from "react-native";
import "react-native-get-random-values";
import UserSettingsContext from "./contexts/UserSettingsContext";
import { AlertProvider } from "./hooks/Alert";
import useCachedRecords from "./hooks/CachedRecordsHook";
import { useTheme } from "./hooks/Theme";
import AppScreen from "./screens/AppScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Record from "./types/Record";
import UserSettings from "./types/UserSettings";
import { saveRecords, saveUserSettings } from "./utils/storeUtils";

type RootStackParamList = {
	App: undefined;
	Settings: undefined;
};

export type NavigationProp<RouteName extends keyof RootStackParamList> = NativeStackNavigationProp<
	RootStackParamList,
	RouteName
>;

interface ScreenProps<RouteName extends keyof RootStackParamList> {
	route: RouteProp<ParamListBase, RouteName>;
	navigation: NavigationProp<RouteName>;
}

export default function App({
	retrievedRecords,
	retrievedUserSettings,
}: {
	retrievedRecords: Record[];
	retrievedUserSettings: UserSettings;
}) {
	const { theme, styles } = useTheme();

	// List of records
	const { records, cachedRecordTransitions, updateRecord, removeRecord, replaceRecords } =
		useCachedRecords(retrievedRecords);

	// User settings
	const [userSettings, setUserSettings] = useState<UserSettings>(retrievedUserSettings);

	useEffect(() => {
		saveRecords(records);
	}, [records]);

	useEffect(() => {
		saveUserSettings(userSettings);
	}, [userSettings]);

	// Navigation stack
	const Stack = createNativeStackNavigator();

	return (
		<UserSettingsContext.Provider value={{ userSettings: userSettings, setUserSettings: setUserSettings }}>
			<SafeAreaView style={styles.body}>
				<View style={{ position: "relative", flex: 1 }}>
					<AlertProvider>
						<NavigationContainer
							theme={{ ...DefaultTheme, colors: { ...DefaultTheme.colors, background: theme.background.colour } }}
						>
							<Stack.Navigator initialRouteName="App" screenOptions={{ headerShown: false }}>
								<Stack.Screen name="App">
									{(props: ScreenProps<"App">) => (
										<AppScreen
											{...props}
											cachedRecordTransitions={cachedRecordTransitions}
											records={records}
											updateRecord={updateRecord}
											removeRecord={removeRecord}
										/>
									)}
								</Stack.Screen>
								<Stack.Screen name="Settings">
									{(props: ScreenProps<"Settings">) => (
										<SettingsScreen {...props} records={records} replaceRecords={replaceRecords} />
									)}
								</Stack.Screen>
							</Stack.Navigator>
						</NavigationContainer>
					</AlertProvider>
				</View>
			</SafeAreaView>
		</UserSettingsContext.Provider>
	);
}
