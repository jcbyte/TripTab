import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import UserSettingsContext from "../contexts/UserSettingsContext";
import { CachedRecordTransition } from "../hooks/CachedRecordsHook";
import { Theme, useTheme } from "../hooks/Theme";
import { distanceMap } from "../types/Distance";
import Record from "../types/Record";
import { formatCost, formatMileageCost } from "../utils/formatUtils";

export default function ListItem({
	item,
	cachedTransition,
	openModal,
}: {
	item: Record;
	cachedTransition: CachedRecordTransition;
	openModal: () => void;
}) {
	const { theme, styles } = useTheme();
	const myStyles = getMyStyles(theme);

	const { userSettings } = useContext(UserSettingsContext);

	return (
		<TouchableOpacity style={myStyles.item} onPress={openModal}>
			<View style={{ display: "flex", flexDirection: "column" }}>
				<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					{item.type === "record" && (
						<Text style={myStyles.text}>
							{cachedTransition!.miles +
								" " +
								distanceMap[userSettings.distance].name[cachedTransition!.miles > 1 ? "plural" : "singular"]}
						</Text>
					)}
					{item.type === "record" && <Text style={myStyles.text}>{formatCost(item.cost, userSettings.currency)}</Text>}
				</View>
				<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
					<Text style={myStyles.secondaryText}>{item.mileage}</Text>
					{item.type === "record" && (
						<Text style={myStyles.secondaryText}>
							{formatMileageCost(cachedTransition!.cost, userSettings.currency, userSettings.distance)}
						</Text>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
}

const getMyStyles = (theme: Theme) =>
	StyleSheet.create({
		item: {
			padding: 16,
			backgroundColor: theme.element.colour,
			borderRadius: 8,
			marginBottom: 10,
		},
		text: {
			fontSize: 18,
			color: theme.element.text,
		},
		secondaryText: {
			fontSize: 12,
			color: theme.shaded.colour,
		},
	});
