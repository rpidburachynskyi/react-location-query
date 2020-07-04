type Values = string | boolean;

type DefaultValueField =
	| Values
	| {
			type: 'string' | 'boolean';
			default?: Values;
			hideIfDefault?: boolean;
	  };

interface DefaultValues {
	[path: string]: DefaultValueField;
}
