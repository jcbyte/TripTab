import React, { createContext, ReactNode, useContext, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Theme, ThemeColour, useTheme } from "./Theme";

export interface AlertConfig {
	text: string;
	type: "success" | "danger";
}

const AlertContext = createContext<{
	openAlert: (config: AlertConfig, duration?: number) => void;
	closeAlert: () => void;
}>({
	openAlert: () => {},
	closeAlert: () => {},
});

export function AlertProvider({ children }: { children?: ReactNode }) {
	const { theme, styles } = useTheme();
	const myStyles = getMyStyles(theme);

	const colourMap: Record<AlertConfig["type"], ThemeColour> = {
		success: theme.success,
		danger: theme.danger,
	};

	const [open, setOpen] = useState<boolean>(false);
	const [config, setConfig] = useState<AlertConfig>({ text: "Alert", type: "success" });
	const closeRef = useRef<NodeJS.Timeout>();

	function openAlert(config: AlertConfig, duration: number = 3000) {
		setConfig(config);
		setOpen(true);

		clearTimeout(closeRef.current);
		closeRef.current = setTimeout(() => {
			setOpen(false);
		}, duration);
	}

	function closeAlert() {
		clearTimeout(closeRef.current);
		setOpen(false);
	}

	return (
		<AlertContext.Provider value={{ openAlert: openAlert, closeAlert: closeAlert }}>
			{children}

			{open && (
				<TouchableOpacity
					activeOpacity={0.85}
					style={{ ...myStyles.box, backgroundColor: colourMap[config.type].colour }}
					onPress={closeAlert}
				>
					<Text style={{ flex: 1, color: colourMap[config.type].text }}>{config.text}</Text>
				</TouchableOpacity>
			)}
		</AlertContext.Provider>
	);
}

export const useAlert = () => {
	return useContext(AlertContext);
};

const getMyStyles = (theme: Theme) =>
	StyleSheet.create({
		box: {
			position: "absolute",
			margin: 10,
			padding: 20,
			borderRadius: 8,
			display: "flex",
			flexDirection: "row",
		},
	});
