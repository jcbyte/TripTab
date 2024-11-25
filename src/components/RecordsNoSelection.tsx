import React, { useContext, useState } from "react";

import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import UserSettingsContext from "../contexts/UserSettingsContext";
import { useTheme } from "../hooks/Theme";
import RecordNo from "../types/RecordNo";
import UserSettings from "../types/UserSettings";
import SlideUpSelection, { Option } from "./SlideUpSelection";

const options: Option<RecordNo>[] = [
	{ label: "10", key: "10", value: 10 },
	{ label: "50", key: "50", value: 50 },
	{ label: "100", key: "100", value: 100 },
	{ label: "All", key: "all", value: "all" },
];

export default function RecordsNoSelection() {
	const { styles } = useTheme();

	const { userSettings, setUserSettings } = useContext(UserSettingsContext);

	const [slideOpen, setSlideOpen] = useState(false);

	return (
		<>
			<TouchableOpacity activeOpacity={0.6} style={styles.blankButton} onPress={() => setSlideOpen(true)}>
				<Feather name="chevron-down" color={styles.blankButtonText.color} size={18} />
				<Text style={styles.blankButtonText}>
					{userSettings.calculateRecordsNo === "all" ? "All" : userSettings.calculateRecordsNo.toString()}
				</Text>
			</TouchableOpacity>

			<SlideUpSelection
				title="Calculate from Previous Records"
				options={options}
				isOpen={slideOpen}
				close={() => setSlideOpen(false)}
				onSelect={({ value: selectedItem }: Option<RecordNo>) => {
					setUserSettings((prev: UserSettings) => {
						return { ...prev, calculateRecordsNo: selectedItem };
					});
				}}
			/>
		</>
	);
}
