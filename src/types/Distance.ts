type Distance = "miles" | "kilometers";
export default Distance;

interface DistanceInfo {
	symbol: string;
	name: string;
}

export const distanceMap: Record<Distance, DistanceInfo> = {
	miles: { symbol: "mi", name: "Miles" },
	kilometers: { symbol: "km", name: "Kilometers" },
};
