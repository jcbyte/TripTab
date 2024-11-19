export function normalisedMileageCost(milage: number, cost: number): number {
	return cost / milage;
}

export function mileageCost(endMilage: number, startMilage: number, cost: number): number {
	return normalisedMileageCost(endMilage - startMilage, cost);
}

export function formatMileageCost(mileageCost: number): string {
	return mileageCost.toFixed(3) + "/mi";
}

export function formatCost(cost: number): string {
	return "£" + cost.toFixed(2);
}
