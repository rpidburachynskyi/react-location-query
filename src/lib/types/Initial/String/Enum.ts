export type Enum =
	| string[]
	| {
			array: string[];
			onNonEnum?: (value: string) => string;
	  };
