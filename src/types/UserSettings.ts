import { ThemeName } from "../styles";
import Currency from "./Currency";
import Distance from "./Distance";
import RecordNo from "./RecordNo";

export default interface UserSettings {
	theme: ThemeName | null;
	calculateRecordsNo: RecordNo;
	currency: Currency;
	distance: Distance;
}

export const DEFAULT: UserSettings = { theme: null, calculateRecordsNo: "all", currency: "GBP", distance: "miles" };
