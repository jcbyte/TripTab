import React, { createContext, ReactNode, useContext, useState } from "react";
import { getStyles } from "../styles";

export interface GivenTheme {
	colours: {
		primary: string;
		success: string;
		danger: string;
		element: string;
		element2: string;
		background: string;
	};
	text: {
		light: string;
		dark: string;
	};
}

const lightTheme: GivenTheme = {
	colours: {
		primary: "#7a6fe1",
		success: "#b2e0a1",
		danger: "#e14f4f",
		element: "#f9f9f9",
		element2: "#e9e9e9",
		background: "#ffffff",
	},
	text: { light: "#ffffff", dark: "#000000" },
};

export interface ThemeColour {
	colour: string;
	text: string;
}

export type Theme = {
	[K in keyof GivenTheme["colours"]]: ThemeColour;
};

const DEFAULT: Theme = {
	background: { colour: "#fff", text: "#ffffff" },
	danger: { colour: "#e14f4f", text: "#ffffff" },
	element: { colour: "#f9f9f9", text: "#000000" },
	element2: { colour: "#e9e9e9", text: "#000000" },
	primary: { colour: "#7a6fe1", text: "#ffffff" },
	success: { colour: "#b2e0a1", text: "#000000" },
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

	function getTextColor(backgroundColor: string): "light" | "dark" {
		var r = parseInt(backgroundColor.substring(1, 3), 16);
		var g = parseInt(backgroundColor.substring(3, 5), 16);
		var b = parseInt(backgroundColor.substring(5, 7), 16);
		var yiq = (r * 299 + g * 587 + b * 114) / 1000;
		return yiq >= 128 ? "dark" : "light";
	}

	function updateTheme(givenTheme: GivenTheme) {
		let newTheme: Theme = Object.fromEntries(
			Object.entries(givenTheme.colours).map(([key, colour]: [string, string]) => [
				key as keyof GivenTheme["colours"],
				{ colour: colour, text: givenTheme.text[getTextColor(colour)] } as ThemeColour,
			])
		) as Theme;

		console.log(newTheme);

		setTheme(newTheme);
		setStyles(getStyles(newTheme));
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
