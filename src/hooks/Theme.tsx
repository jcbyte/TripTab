import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getStyles, themes } from "../styles";
import { getTextColor } from "../utils";

export interface GivenTheme {
	name: string;
	colours: {
		primary: string;
		success: string;
		danger: string;
		element: string;
		element2: string;
		background: string;
		shaded: string;
	};
	text: {
		light: string;
		dark: string;
	};
}

export interface ThemeColour {
	colour: string;
	text: string;
}

export type Theme = {
	[K in keyof GivenTheme["colours"]]: ThemeColour;
} & { name: string };

const DEFAULT: Theme = {
	...Object.fromEntries(
		Object.entries({
			primary: "#7a6fe1",
			success: "#b2e0a1",
			danger: "#e14f4f",
			element: "#f9f9f9",
			element2: "#e9e9e9",
			background: "#ffffff",
			shaded: "#777777",
		}).map(([key, colour]: [string, string]) => [
			key as keyof GivenTheme["colours"],
			{ colour: colour, text: getTextColor(colour) == "light" ? "#ffffff" : "#000000" } as ThemeColour,
		])
	),
	name: "Default",
} as Theme;

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

	useEffect(() => {
		updateTheme(themes.dark);
	}, []);

	function updateTheme(givenTheme: GivenTheme) {
		let newTheme: Theme = {
			...Object.fromEntries(
				(Object.entries(givenTheme.colours) as [keyof GivenTheme["colours"], string][]).map(([key, colour]) => [
					key,
					{ colour: colour, text: givenTheme.text[getTextColor(colour)] } as ThemeColour,
				])
			),
			name: givenTheme.name,
		} as Theme;

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
