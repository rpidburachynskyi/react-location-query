import { InitialObject } from '../Initial';
import { Integer } from './Integer';
import { Enum } from './Enum';
import { Min } from './Min';
import { Max } from './Max';

interface InitialObjectNumber extends InitialObject {
	type: 'number';
	initial: number;
	onParsedError?: (errorValue: string) => number;
	validate?: (value: number) => number;

	integer?: Integer;

	enum?: Enum;

	min?: Min;
	max?: Max;
}

type ObjectNumber = InitialObjectNumber;
export default ObjectNumber;
