import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "react-native-get-random-values";
import useCachedRecords from "./hooks/useCachedRecords";
import AppScreen from "./screens/AppScreen";
import SettingsScreen from "./screens/SettingsScreen";

// todo settings page miles/km, currency
// todo settings page export, import
// todo dark theme
// todo save

export type RecordNo = "all" | number;

export default function App() {
	// List of records
	const { records, cachedRecordTransitions, updateRecord, removeRecord } = useCachedRecords([
		{ id: uuidv4(), type: "record", mileage: 65531, cost: 38.97 },
		{ id: uuidv4(), type: "record", mileage: 65286, cost: 14.5 },
		{ id: uuidv4(), type: "record", mileage: 65187, cost: 28.96 },
		{ id: uuidv4(), type: "record", mileage: 65003, cost: 38.42 },
		{ id: uuidv4(), type: "record", mileage: 64774, cost: 37.6 },
		{ id: uuidv4(), type: "record", mileage: 64414, cost: 12.41 },
		{ id: uuidv4(), type: "record", mileage: 64333, cost: 36.18 },
		{ id: uuidv4(), type: "record", mileage: 64062, cost: 16.55 },
		{ id: uuidv4(), type: "record", mileage: 63913, cost: 14.99 },
		{ id: uuidv4(), type: "record", mileage: 63783, cost: 18.27 },
		{ id: uuidv4(), type: "record", mileage: 63662, cost: 40.52 },
		{ id: uuidv4(), type: "record", mileage: 63321, cost: 29.5 },
		{ id: uuidv4(), type: "record", mileage: 63103, cost: 24.5 },
		{ id: uuidv4(), type: "record", mileage: 62929, cost: 39.83 },
		{ id: uuidv4(), type: "record", mileage: 62634, cost: 52.19 },
		{ id: uuidv4(), type: "record", mileage: 62205, cost: 47 },
		{ id: uuidv4(), type: "mileage", mileage: 61880 },
		{ id: uuidv4(), type: "record", mileage: 61119, cost: 47.39 },
		{ id: uuidv4(), type: "record", mileage: 60792, cost: 40.74 },
		{ id: uuidv4(), type: "mileage", mileage: 60449 },
	]);

	const [calculateRecordsNo, setCalculateRecordsNo] = useState<RecordNo>("all");

	const Stack = createNativeStackNavigator();

	return (
		<>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="App" screenOptions={{ headerShown: false }}>
					<Stack.Screen
						name="App"
						component={(
							props: any // todo work out type
						) => (
							<AppScreen
								{...props}
								calculateRecordsNo={calculateRecordsNo}
								setCalculateRecordsNo={setCalculateRecordsNo}
								cachedRecordTransitions={cachedRecordTransitions}
								records={records}
								updateRecord={updateRecord}
								removeRecord={removeRecord}
							/>
						)}
					/>
					<Stack.Screen
						name="Settings"
						component={(
							props: any // todo work out type
						) => <SettingsScreen {...props} />}
					/>
				</Stack.Navigator>
			</NavigationContainer>

			{/* <Main
					calculateRecordsNo={calculateRecordsNo}
					setCalculateRecordsNo={setCalculateRecordsNo}
					cachedRecordTransitions={cachedRecordTransitions}
					records={records}
					updateRecord={updateRecord}
					removeRecord={removeRecord}
				/> */}
		</>
	);
}
