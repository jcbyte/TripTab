import { Feather } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "../App";
import SelectSetting from "../components/SelectSetting";
import UserSettingsContext from "../contexts/userSettingsContext";
import { styles as globalStyles } from "../styles";
import Currency, { CurrencyInfo, currencyMap } from "../types/Currency";
import Distance, { DistanceInfo, distanceMap } from "../types/Distance";
import UserSettings from "../types/UserSettings";

export default function SettingsScreen({ navigation }: { navigation: NavigationProp<"Settings"> }) {
	const { userSettings, setUserSettings } = useContext(UserSettingsContext);

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
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		paddingHorizontal: 20,
		paddingTop: 10,
		flex: 1,
		backgroundColor: "white",
	},
});
