import { Feather } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "../App";
import SelectSetting from "../components/SelectSetting";
import Signature from "../components/Signature";
import { Option } from "../components/SlideUpSelection";
import UserSettingsContext from "../contexts/UserSettingsContext";
import { useAlert } from "../hooks/Alert";
import { GivenTheme, Theme, useTheme } from "../hooks/Theme";
import { ThemeName, themes } from "../styles";
import Currency, { CurrencyInfo, currencyMap } from "../types/Currency";
import Distance, { DistanceInfo, distanceMap } from "../types/Distance";
import Record, { rehydrateRecord, StrippedRecord, stripRecord } from "../types/Record";
import UserSettings from "../types/UserSettings";

export default function SettingsScreen({
	navigation,
	records,
	replaceRecords,
}: {
	navigation: NavigationProp<"Settings">;
	records: Record[];
	replaceRecords: (records: Record[]) => void;
}) {
	const { theme, styles, setTheme } = useTheme();
	const myStyles = getMyStyles(theme);

	const { userSettings, setUserSettings } = useContext(UserSettingsContext);
	const { openAlert } = useAlert();

	async function importRecords() {
		try {
			let result: DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync({
				type: "application/json",
				copyToCacheDirectory: true,
				multiple: false,
			});

			if (result.canceled) {
				return;
			}

			let fileUri: string = result.assets[0].uri;
			let fileContent: string = await FileSystem.readAsStringAsync(fileUri);
			let strippedRecords: StrippedRecord[] = JSON.parse(fileContent) as StrippedRecord[];

			let newRecords: Record[] = strippedRecords.map((strippedRecord) => rehydrateRecord(strippedRecord));
			replaceRecords(newRecords);

			openAlert({ text: "Imported Records", type: "success" });
		} catch (e) {
			openAlert({ text: `Failed Record Import${e instanceof Error && `: ${e.message}`}`, type: "danger" });
		}
	}

	async function exportRecords() {
		try {
			let filename: string = `triptab-${Date.now().toString()}.json`;
			let fileUri: string = FileSystem.documentDirectory + filename;

			let strippedRecords: StrippedRecord[] = records.map((record: Record) => stripRecord(record));
			let fileContent: string = JSON.stringify(strippedRecords);

			await FileSystem.writeAsStringAsync(fileUri, fileContent);
			await Sharing.shareAsync(fileUri);

			openAlert({ text: "Exported Records", type: "success" });
		} catch (e) {
			openAlert({ text: `Failed Record Export${e instanceof Error && `: ${e.message}`}`, type: "danger" });
		}
	}

	return (
		<>
			<View style={{ ...myStyles.body, display: "flex", flexDirection: "column", gap: 10 }}>
				<View style={{ display: "flex", flexDirection: "row" }}>
					{/* Back Button */}
					<TouchableOpacity activeOpacity={0.6} style={styles.blankButton} onPress={navigation.goBack}>
						<Feather name="chevron-left" color={styles.blankButtonText.color} size={18} />
					</TouchableOpacity>
				</View>

				{/* Theme Selection */}
				<SelectSetting
					title="Theme"
					value={theme.name}
					options={(Object.entries(themes) as [ThemeName, GivenTheme][]).map(([key, theme]) => {
						return { label: theme.name, key: key, value: theme };
					})}
					onSelect={({ value: selected, key: themeName }: Option<GivenTheme>) => {
						setUserSettings((prev: UserSettings) => {
							return { ...prev, theme: themeName as ThemeName };
						});
						setTheme(selected);
					}}
				/>

				{/* Currency Selection */}
				<SelectSetting
					title="Currency"
					value={currencyMap[userSettings.currency].name.plural}
					options={(Object.entries(currencyMap) as [Currency, CurrencyInfo][]).map(([currency, { name }]) => {
						return { label: name.plural, key: currency, value: currency };
					})}
					onSelect={({ value: selected }: Option<Currency>) => {
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
					onSelect={({ value: selected }: Option<Distance>) => {
						setUserSettings((prev: UserSettings) => {
							return { ...prev, distance: selected };
						});
					}}
				/>

				{/* Import/Export */}
				<View style={{ display: "flex", flexDirection: "row", gap: 10, height: 60 }}>
					<TouchableOpacity activeOpacity={0.6} style={{ ...styles.blankButton, flex: 1 }} onPress={importRecords}>
						<Feather name="download" color={styles.blankButtonText.color} size={18} style={{ marginRight: 5 }} />
						<Text style={styles.blankButtonText}>Import</Text>
					</TouchableOpacity>
					<TouchableOpacity activeOpacity={0.6} style={{ ...styles.blankButton, flex: 1 }} onPress={exportRecords}>
						<Feather name="upload" color={styles.blankButtonText.color} size={18} style={{ marginRight: 5 }} />
						<Text style={styles.blankButtonText}>Export</Text>
					</TouchableOpacity>
				</View>
			</View>

			<Signature />
		</>
	);
}

const getMyStyles = (theme: Theme) =>
	StyleSheet.create({
		body: {
			paddingHorizontal: 20,
			paddingTop: 10,
			flex: 1,
			backgroundColor: theme.background.colour,
		},
	});
