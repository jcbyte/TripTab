import Record from "./types/Record";

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

export function sortRecords(records: Record[]): void {
	records.sort((a: Record, b: Record) => b.milage - a.milage);
}

export function insertRecord(records: Record[], record: Record): void {
	const index = records.findIndex((existingRecord) => existingRecord.milage < record.milage);
	console.log(index);
	if (index === -1) {
		// If no smaller milage is found, append at the end
		records.push(record);
	} else {
		// Insert the record at the correct position
		records.splice(index, 0, record);
	}
}
