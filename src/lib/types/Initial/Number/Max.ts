export type Max =
	| number
	| {
			value: number;
			onOver: (value: number) => number;
	  };
