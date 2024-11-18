import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},
	box: {
		backgroundColor: "#3498db", // Blue background
		padding: 20,
		marginBottom: 20, // Space between box and list
		borderRadius: 10,
		alignItems: "center",
	},
	boxText: {
		color: "#fff",
		fontSize: 18,
		marginBottom: 10,
	},
	button: {
		backgroundColor: "#2ecc71", // Green button
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
	list: {
		marginTop: 20,
	},
	itemContainer: {
		padding: 15,
		backgroundColor: "#ecf0f1",
		marginBottom: 10,
		borderRadius: 8,
	},
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
	},
	modalContainer: {
		backgroundColor: "#fff",
		borderRadius: 10,
		padding: 20,
		margin: 20,
		alignItems: "center",
	},
	modalTitle: {
		fontSize: 24,
		marginBottom: 20,
		color: "#333",
	},
	input: {
		width: 250,
		height: 40,
		borderColor: "#ccc",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
		marginBottom: 15,
		backgroundColor: "#fff",
	},
	modalButtons: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
});
