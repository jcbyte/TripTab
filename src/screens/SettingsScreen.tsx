import { Feather } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { NavigationProp } from "../App";
import SelectSetting from "../components/SelectSetting";
import UserSettingsContext from "../contexts/userSettingsContext";
import { styles as globalStyles } from "../styles";
import Currency, { CurrencyInfo, currencyMap } from "../types/Currency";
import UserSettings from "../types/UserSettings";

// todo back button
// todo settings
// todo export / import button

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
				value={currencyMap[userSettings.currency].name}
				options={(Object.entries(currencyMap) as [Currency, CurrencyInfo][]).map(([currency, { name }]) => {
					return { label: name, key: currency, value: currency };
				})}
				onSelect={(selected: Currency) => {
					setUserSettings((prev: UserSettings) => {
						return { ...prev, currency: selected };
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
