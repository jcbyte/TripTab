import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Theme, useTheme } from "../hooks/Theme";
import SlideUpSelection, { Option } from "./SlideUpSelection";

export default function SelectSetting<T>({
	title,
	value,
	options,
	onSelect,
}: {
	title: string;
	value: string;
	options: Option<T>[];
	onSelect: (selected: Option<T>) => void;
}) {
	const { theme, styles } = useTheme();
	const myStyles = getMyStyles(theme);

	const [slideOpen, setSlideOpen] = useState(false);

	return (
		<>
			<TouchableOpacity style={myStyles.block} onPress={() => setSlideOpen(true)}>
				<View style={{ display: "flex", flexDirection: "column" }}>
					<Text style={{ ...myStyles.secondaryText }}>{title}</Text>
					<Text style={{ ...myStyles.text }}>{value}</Text>
				</View>
			</TouchableOpacity>

			<SlideUpSelection options={options} isOpen={slideOpen} close={() => setSlideOpen(false)} onSelect={onSelect} />
		</>
	);
}

const getMyStyles = (theme: Theme) =>
	StyleSheet.create({
		block: {
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
