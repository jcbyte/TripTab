import React from "react";
import ThemedApp from "./ThemedApp";
import { ThemeProvider } from "./hooks/Theme";
import { themes } from "./styles";

// todo save records + settings

export default function App() {
	return (
		<ThemeProvider initialTheme={themes.light}>
			<ThemedApp />
		</ThemeProvider>
	);
}
