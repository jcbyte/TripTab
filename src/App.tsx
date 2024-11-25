import React from "react";
import ThemedApp from "./ThemedApp";
import { ThemeProvider } from "./hooks/Theme";

export default function App() {
	return (
		<ThemeProvider>
			<ThemedApp />
		</ThemeProvider>
	);
}
