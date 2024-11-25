import Currency, { currencyMap } from "./types/Currency";
import Distance, { distanceMap } from "./types/Distance";

export function normalisedMileageCost(milage: number, cost: number): number {
	return cost / milage;
}

export function mileageCost(endMilage: number, startMilage: number, cost: number): number {
	return normalisedMileageCost(endMilage - startMilage, cost);
}

export function formatMileageCost(mileageCost: number, currency: Currency, distance: Distance): string {
	return currencyMap[currency].symbol + mileageCost.toFixed(3) + "/" + distanceMap[distance].symbol;
}

export function formatCost(cost: number, currency: Currency): string {
	return currencyMap[currency].symbol + cost.toFixed(2);
}

export function getTextColor(backgroundColor: string): "light" | "dark" {
	var r = parseInt(backgroundColor.substring(1, 3), 16);
	var g = parseInt(backgroundColor.substring(3, 5), 16);
	var b = parseInt(backgroundColor.substring(5, 7), 16);
	var yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? "dark" : "light";
}
