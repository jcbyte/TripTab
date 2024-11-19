import { StatusBar, StyleSheet } from "react-native";

console.log();

export const styles = StyleSheet.create({
	body: {
		marginTop: StatusBar.currentHeight,
		padding: 20,
	},
	button: {
		backgroundColor: "#7A6FE1",
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
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalContent: {
		padding: 20,
		backgroundColor: "white",
		borderRadius: 8,
	},
});
