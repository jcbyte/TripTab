import { StatusBar, StyleSheet } from "react-native";

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
		backgroundColor: colours.light,
		borderRadius: 8,
	},
});

export const styles = StyleSheet.create({
	body: {
		paddingTop: StatusBar.currentHeight ?? 10,
		flex: 1,
	},
	primaryButton: {
		...genericStyles.button,
		backgroundColor: colours.primary,
	},
	primaryButtonText: {
		...genericStyles.buttonText,
		color: colours.textLight,
	},
	dangerButton: {
		...genericStyles.button,
		backgroundColor: colours.danger,
	},
	dangerButtonText: {
		...genericStyles.buttonText,
		color: colours.textLight,
	},
	blankButton: {
		...genericStyles.button,
		backgroundColor: colours.shaded,
	},
	blankButtonText: {
		...genericStyles.buttonText,
		color: colours.textDark,
	},
	blankInput: {
		...genericStyles.input,
		borderColor: "#ccc",
	},
	centerModalBackground: {
		...genericStyles.modalBackground,
		justifyContent: "center",
		alignItems: "center",
	},
	centerModalContent: {
		...genericStyles.modalContent,
	},
	bottomModalBackground: {
		...genericStyles.modalBackground,
		justifyContent: "flex-end",
	},
	bottomModalContent: {
		...genericStyles.modalContent,
	},
});
