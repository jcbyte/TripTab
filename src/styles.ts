import { StatusBar, StyleSheet } from "react-native";
import { Theme } from "./hooks/Theme";

export const colours = {
	primary: "#7a6fe1",
	danger: "#e14f4f",
	success: "#b2e0a1",
	light: "#fff",
	shaded: "#f9f9f9",
	shadedDark: "#e9e9e9",
	dark: "#000",
	textLight: "#fff",
	shadedText: "#777",
	textDark: "#000",
	switchTrackPrimary: "#e1d8f1",
};

const genericStyles = StyleSheet.create({
	button: {
		display: "flex",
		flexDirection: "row",
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 14,
	},
	input: {
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
	},
	modalBackground: {
		flex: 1,
		backgroundColor: "#0000007f",
	},
	modalContent: {
		padding: 20,
		borderRadius: 8,
	},
});

export const getStyles = (theme: Theme) =>
	StyleSheet.create({
		body: {
			paddingTop: StatusBar.currentHeight ?? 10,
			flex: 1,
		},
		primaryButton: {
			...genericStyles.button,
			backgroundColor: theme.primary.colour,
		},
		primaryButtonText: {
			...genericStyles.buttonText,
			color: theme.primary.text,
		},
		dangerButton: {
			...genericStyles.button,
			backgroundColor: theme.danger.colour,
		},
		dangerButtonText: {
			...genericStyles.buttonText,
			color: theme.danger.text,
		},
		blankButton: {
			...genericStyles.button,
			backgroundColor: theme.element.colour,
		},
		blankButtonText: {
			...genericStyles.buttonText,
			color: theme.element.text,
		},
		blankInput: {
			...genericStyles.input,
			borderColor: "#ccc", // todo
		},
		centerModalBackground: {
			...genericStyles.modalBackground,
			justifyContent: "center",
			alignItems: "center",
		},
		centerModalContent: {
			...genericStyles.modalContent,
			backgroundColor: theme.background.colour,
		},
		bottomModalBackground: {
			...genericStyles.modalBackground,
			justifyContent: "flex-end",
		},
		bottomModalContent: {
			...genericStyles.modalContent,
			backgroundColor: theme.background.colour,
		},
	});
