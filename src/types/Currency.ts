type Currency = "GBP" | "USD" | "EUR";
export default Currency;

export interface CurrencyInfo {
	symbol: string;
	name: { singular: string; plural: string };
}

export const currencyMap: Record<Currency, CurrencyInfo> = {
	GBP: { symbol: "£", name: { singular: "British Pound", plural: "British Pounds" } },
	EUR: { symbol: "€", name: { singular: "Euro", plural: "Euros" } },
	USD: { symbol: "$", name: { singular: "US Dollar", plural: "US Dollars" } },
};
