import { Feather } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "../App";
import SelectSetting from "../components/SelectSetting";
import UserSettingsContext from "../contexts/UserSettingsContext";
import { colours, styles as globalStyles } from "../styles";
import Currency, { CurrencyInfo, currencyMap } from "../types/Currency";
import Distance, { DistanceInfo, distanceMap } from "../types/Distance";
import Record from "../types/Record";
import UserSettings from "../types/UserSettings";

export default function SettingsScreen({
	navigation,
	records,
}: {
	navigation: NavigationProp<"Settings">;
	records: Record[];
}) {
	const { userSettings, setUserSettings } = useContext(UserSettingsContext);

	async function exportRecords() {
		let filename = `triptab-${Date.now().toString()}.json`;
		let fileUri = FileSystem.documentDirectory + filename;

		let strippedRecords = records.map(({ id: _, ...rest }: Record) => rest);
		let fileContent = JSON.stringify(strippedRecords);

		await FileSystem.writeAsStringAsync(fileUri, fileContent);
		await Sharing.shareAsync(fileUri);
	}

	return (
		<View style={{ ...styles.body, display: "flex", flexDirection: "column", gap: 10 }}>
			<View style={{ display: "flex", flexDirection: "row" }}>
				{/* Back Button */}
				<TouchableOpacity activeOpacity={0.6} style={globalStyles.blankButton} onPress={navigation.goBack}>
					<Feather name="chevron-left" color={globalStyles.blankButtonText.color} size={18} />
				</TouchableOpacity>
			</View>

			{/* Currency Selection */}
			<SelectSetting
				title="Currency"
				value={currencyMap[userSettings.currency].name.plural}
				options={(Object.entries(currencyMap) as [Currency, CurrencyInfo][]).map(([currency, { name }]) => {
					return { label: name.plural, key: currency, value: currency };
				})}
				onSelect={(selected: Currency) => {
					setUserSettings((prev: UserSettings) => {
						return { ...prev, currency: selected };
					});
				}}
			/>

			{/* Distance Units Selection */}
			<SelectSetting
				title="Distance Units"
				value={distanceMap[userSettings.distance].name.plural}
				options={(Object.entries(distanceMap) as [Distance, DistanceInfo][]).map(([distance, { name }]) => {
					return { label: name.plural, key: distance, value: distance };
				})}
				onSelect={(selected: Distance) => {
					setUserSettings((prev: UserSettings) => {
						return { ...prev, distance: selected };
					});
				}}
			/>

			{/* Import/Export */}
			<View style={{ display: "flex", flexDirection: "row", gap: 10, height: 60 }}>
				<TouchableOpacity activeOpacity={0.6} style={{ ...globalStyles.blankButton, flex: 1 }} onPress={() => {}}>
					<Feather name="download" color={globalStyles.blankButtonText.color} size={18} style={{ marginRight: 5 }} />
					<Text>Import</Text>
				</TouchableOpacity>
				<TouchableOpacity activeOpacity={0.6} style={{ ...globalStyles.blankButton, flex: 1 }} onPress={exportRecords}>
					<Feather name="upload" color={globalStyles.blankButtonText.color} size={18} style={{ marginRight: 5 }} />
					<Text>Export</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		paddingHorizontal: 20,
		paddingTop: 10,
		flex: 1,
		backgroundColor: colours.light,
	},
});
