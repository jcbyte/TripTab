import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colours } from "../styles";
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
	onSelect: (selected: T) => void;
}) {
	const [slideOpen, setSlideOpen] = useState(false);

	return (
		<>
			<TouchableOpacity style={styles.block} onPress={() => setSlideOpen(true)}>
				<View style={{ display: "flex", flexDirection: "column" }}>
					<Text style={{ ...styles.secondaryText }}>{title}</Text>
					<Text style={{ ...styles.text }}>{value}</Text>
				</View>
			</TouchableOpacity>

			<SlideUpSelection options={options} isOpen={slideOpen} close={() => setSlideOpen(false)} onSelect={onSelect} />
		</>
	);
}

const styles = StyleSheet.create({
	block: {
		padding: 16,
		backgroundColor: colours.shaded,
		borderRadius: 8,
		marginBottom: 10,
	},
	text: {
		fontSize: 18,
	},
	secondaryText: {
		fontSize: 12,
		color: colours.shadedText,
	},
});
