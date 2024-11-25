import Currency, { currencyMap } from "../types/Currency";
import Distance, { distanceMap } from "../types/Distance";

export function formatMileageCost(mileageCost: number, currency: Currency, distance: Distance): string {
	return currencyMap[currency].symbol + mileageCost.toFixed(3) + "/" + distanceMap[distance].symbol;
}

export function formatCost(cost: number, currency: Currency): string {
	return currencyMap[currency].symbol + cost.toFixed(2);
}
