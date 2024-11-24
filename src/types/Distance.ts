type Distance = "miles" | "kilometers";
export default Distance;

export interface DistanceInfo {
	symbol: string;
	name: { singular: string; plural: string };
}

export const distanceMap: Record<Distance, DistanceInfo> = {
	miles: { symbol: "mi", name: { singular: "Mile", plural: "Miles" } },
	kilometers: { symbol: "km", name: { singular: "Kilometer", plural: "Kilometers" } },
};
