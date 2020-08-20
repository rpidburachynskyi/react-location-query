export type Integer =
	| boolean
	| {
			onFloat?: (value: number) => number;
	  };
