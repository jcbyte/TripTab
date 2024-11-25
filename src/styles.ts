import { StatusBar, StyleSheet } from "react-native";
import { GivenTheme, Theme } from "./hooks/Theme";

export const themes: { [s: string]: GivenTheme } = {
	light: {
		name: "Light",
		colours: {
			primary: "#7a6fe1",
			success: "#b2e0a1",
			danger: "#e14f4f",
			element: "#f9f9f9",
			background: "#ffffff",
			shaded: "#777777",
			disabled: "#cecece",
		},
		text: { light: "#ffffff", dark: "#000000" },
	},
	dark: {
		name: "Dark",
		colours: {
			primary: "#6258B4",
			success: "#8cb27d",
			danger: "#b43f3f",
			element: "#2e2e2e",
			background: "#181818",
			shaded: "#999999",
			disabled: "#7e7e7e",
		},
		text: { light: "#ffffff", dark: "#000000" },
	},
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
			borderColor: theme.shaded.colour,
			color: theme.background.text,
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
