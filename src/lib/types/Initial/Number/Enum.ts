export type Enum =
	| number[]
	| {
			array: number[];
			onNonEnum?: (value: number) => number;
	  };
