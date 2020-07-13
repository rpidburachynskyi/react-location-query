export type Query = string;

export type QueryObjectItem = string | Array<string>;
export interface QueryObject {
	[x: string]: QueryObjectItem;
}

type AllowedQueryValues = string | number | boolean;

export type QueryValue = AllowedQueryValues | Array<AllowedQueryValues>;
export interface QueryValues {
	[x: string]: QueryValue;
}
