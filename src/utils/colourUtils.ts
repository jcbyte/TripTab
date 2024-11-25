function hexToRgb(hex: string): [number, number, number] {
	let r = parseInt(hex.substring(1, 3), 16);
	let g = parseInt(hex.substring(3, 5), 16);
	let b = parseInt(hex.substring(5, 7), 16);
	return [r, g, b];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
	const toClampedByte = (component: number): number => Math.round(Math.min(Math.max(0, component), 255));
	const toHex = (component: number): string => toClampedByte(component).toString(16).padStart(2, "0");
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function getTextColor(backgroundColor: string): "light" | "dark" {
	let [r, g, b] = hexToRgb(backgroundColor);
	let yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? "dark" : "light";
}

export function adjustColour(colour: string, change: number): string {
	const lerp = (from: number, to: number, t: number): number => from + (to - from) * t;
	const adjustComponent = (original: number, t: number) => lerp(original, t >= 0 ? 255 : 0, Math.abs(t));
	let [r, g, b] = hexToRgb(colour);
	return rgbToHex([adjustComponent(r, change), adjustComponent(g, change), adjustComponent(b, change)]);
}
