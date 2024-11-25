import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserSettingsContext from "../contexts/UserSettingsContext";
import { CachedRecordTransition } from "../hooks/CachedRecordsHook";
import { Theme, useTheme } from "../hooks/Theme";
import { distanceMap } from "../types/Distance";
import { formatMileageCost } from "../utils/formatUtils";

export default function MileageBox({
	cachedRecordTransitions,
	openModal,
}: {
	cachedRecordTransitions: CachedRecordTransition[];
	openModal: () => void;
}) {
	const { theme, styles } = useTheme();
	const myStyles = getMyStyles(theme);

	const { userSettings } = useContext(UserSettingsContext);

	function calculateCost(): number {
		// Get the number of records to scan through, making sure we don't go over the array
		let recordsNo: number =
			userSettings.calculateRecordsNo === "all"
				? cachedRecordTransitions.length
				: Math.min(userSettings.calculateRecordsNo, cachedRecordTransitions.length);

		// If no records then return 0, else we will get zero division error
		if (recordsNo === 0) {
			return 0;
		}

		let sum: number = 0;
		let recordCount: number = 0;

		// Calculate the average of all non-null elements
		for (let i = 0; i < recordsNo; i++) {
			let transition: CachedRecordTransition = cachedRecordTransitions[i];
			if (transition) {
				sum += transition.cost;
				recordCount += 1;
			}
		}

		return sum / recordCount;
	}

	return (
		<View style={myStyles.box}>
			<Text style={myStyles.titleText}>Cost per {distanceMap[userSettings.distance].name.singular}</Text>
			<View style={{ display: "flex", flexDirection: "row" }}>
				<Text style={{ ...myStyles.mileageText, flex: 1 }}>
					{formatMileageCost(calculateCost(), userSettings.currency, userSettings.distance)}
				</Text>
				<TouchableOpacity activeOpacity={0.6} style={styles.primaryButton} onPress={openModal}>
					<Text style={styles.primaryButtonText}>New Record</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const getMyStyles = (theme: Theme) =>
	StyleSheet.create({
		box: {
			padding: 16,
			backgroundColor: theme.element.colour,
			borderRadius: 8,
			shadowColor: "#000",
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 1,
		},
		titleText: {
			fontSize: 24,
			fontWeight: "semibold",
			textAlign: "left",
			color: theme.element.text,
		},
		mileageText: {
			fontSize: 28,
			fontWeight: "bold",
			textAlign: "left",
			color: theme.element.text,
		},
	});
