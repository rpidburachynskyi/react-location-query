export type Min =
	| number
	| {
			value: number;
			onLess: (value: number) => number;
	  };
