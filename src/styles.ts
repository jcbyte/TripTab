import { StatusBar, StyleSheet } from "react-native";

export const colours = {
	primary: "#7a6fe1",
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
		color: "#fff",
	},
	blankButton: {
		...genericStyles.button,
		backgroundColor: "#f4f4f4",
	},
	blankButtonText: {
		...genericStyles.buttonText,
		color: "#000",
	},
	input: {
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
	},
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#0000007f",
	},
	modalContent: {
		padding: 20,
		backgroundColor: "white",
		borderRadius: 8,
	},
});
