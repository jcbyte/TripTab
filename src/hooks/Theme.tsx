import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { getStyles } from "../styles";
import { getTextColor } from "../utils/colourUtils";

export interface GivenTheme {
	name: string;
	colours: {
		primary: string;
		success: string;
		danger: string;
		element: string;
		background: string;
		shaded: string;
		disabled: string;
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
			background: "#ffffff",
			shaded: "#777777",
			disabled: "#cecece",
		}).map(([key, colour]: [string, string]) => [
			key as keyof GivenTheme["colours"],
			{ colour: colour, text: getTextColor(colour) == "light" ? "#ffffff" : "#000000" } as ThemeColour,
		])
	),
	name: "Default",
} as Theme;

type Styles = ReturnType<typeof getStyles>;

const ThemeContext = createContext<{
	theme: Theme;
	setTheme: (theme: GivenTheme) => void;
	styles: Styles;
}>({
	theme: DEFAULT,
	setTheme: () => {},
	styles: getStyles(DEFAULT),
});

export function ThemeProvider({ children, initialTheme }: { children?: ReactNode; initialTheme?: GivenTheme }) {
	const [theme, setTheme] = useState<Theme>(DEFAULT);
	const [styles, setStyles] = useState<Styles>(getStyles(DEFAULT));

	useEffect(() => {
		if (initialTheme) {
			updateTheme(initialTheme);
		}
	}, [initialTheme]);

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

			<StatusBar
				barStyle={getTextColor(theme.background.colour) === "light" ? "light-content" : "dark-content"}
				translucent={true}
				backgroundColor={theme.background.colour}
			/>
		</ThemeContext.Provider>
	);
}

export const useTheme = () => {
	return useContext(ThemeContext);
};
