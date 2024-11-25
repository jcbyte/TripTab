import React, { createContext, ReactNode, useContext, useState } from "react";
import { getStyles } from "../styles";

export interface GivenTheme {
	primary: string;
	success: string;
	danger: string;
	element: string;
	element2: string;
	background: string;
}

const lightTheme: GivenTheme = {
	primary: "#7a6fe1",
	success: "#b2e0a1",
	danger: "#e14f4f",
	element: "#f9f9f9",
	element2: "#e9e9e9",
	background: "#fff",
};

export interface ThemeColour {
	colour: string;
	text: string;
}

export type Theme = {
	[K in keyof GivenTheme]: ThemeColour;
};

const DEFAULT: Theme = {
	primary: { colour: "#7a6fe1", text: "#fff" },
	success: { colour: "#b2e0a1", text: "#fff" },
	danger: { colour: "#e14f4f", text: "#fff" },
	element: { colour: "#f9f9f9", text: "#fff" },
	element2: { colour: "#e9e9e9", text: "#fff" },
	background: { colour: "#fff", text: "#fff" },
};

const ThemeContext = createContext<{
	theme: Theme;
	setTheme: (theme: GivenTheme) => void;
	styles: any; // todo type
}>({
	theme: DEFAULT,
	setTheme: () => {},
	styles: {},
});

// todo initial load

export function ThemeProvider({ children }: { children?: ReactNode }) {
	const [theme, setTheme] = useState<Theme>(DEFAULT);
	const [styles, setStyles] = useState<any>(getStyles(DEFAULT)); // todo type

	// todo type
	function updateTheme(givenTheme: GivenTheme) {
		// todo calculate Theme
		// setTheme(theme);
		// setStyles(getStyles(themeColours));
	}

	return (
		<ThemeContext.Provider value={{ theme: theme, setTheme: updateTheme, styles: styles }}>
			{children}
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	return useContext(ThemeContext);
};
