import React, { createContext, ReactNode, useContext, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colours } from "../styles";

export interface AlertConfig {
	text: string;
	type: "success" | "danger" | "info";
}

const colourMap: Record<AlertConfig["type"], { box: string; text: string }> = {
	success: { box: colours.success, text: colours.textDark },
	danger: { box: colours.danger, text: colours.textDark },
	info: { box: colours.shadedDark, text: colours.textDark },
};

const AlertContext = createContext<{
	openAlert: (config: AlertConfig, duration?: number) => void;
	closeAlert: () => void;
}>({
	openAlert: () => {},
	closeAlert: () => {},
});

export function AlertProvider({ children }: { children?: ReactNode }) {
	const [open, setOpen] = useState<boolean>(false);
	const [config, setConfig] = useState<AlertConfig>({ text: "Alert", type: "info" });
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
					style={{ ...styles.box, backgroundColor: colourMap[config.type].box }}
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

const styles = StyleSheet.create({
	box: {
		position: "absolute",
		margin: 10,
		padding: 20,
		borderRadius: 8,
		display: "flex",
		flexDirection: "row",
	},
});
