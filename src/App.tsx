import React from "react";
import { useColorScheme } from "react-native";
import ThemedApp from "./ThemedApp";
import { ThemeProvider } from "./hooks/Theme";
import { themes } from "./styles";

// todo save records + settings
// todo save theme to settings
// todo readme

export default function App() {
	const scheme = useColorScheme();

	return (
		<ThemeProvider initialTheme={scheme === "dark" ? themes.dark : themes.light}>
			<ThemedApp />
		</ThemeProvider>
	);
}
