import { StatusBar, StyleSheet } from "react-native";

export const colours = {
	primary: "#7a6fe1",
	light: "#fff",
	shaded: "#f9f9f9",
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
		marginTop: StatusBar.currentHeight,
		padding: 20,
	},
	primaryButton: {
		...genericStyles.button,
		backgroundColor: colours.primary,
	},
	primaryButtonText: {
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
