import { StatusBar, StyleSheet } from "react-native";

export const colours = {
	primary: "#7a6fe1",
	switchTrackPrimary: "#e1d8f1",
};

export const styles = StyleSheet.create({
	body: {
		marginTop: StatusBar.currentHeight,
		padding: 20,
	},
	button: {
		backgroundColor: colours.primary,
		borderRadius: 8,
		paddingVertical: 8,
		paddingHorizontal: 12,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontSize: 14,
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
