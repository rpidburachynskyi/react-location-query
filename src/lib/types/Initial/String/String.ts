import { InitialObject } from '../Initial';
import { Enum } from './Enum';

export interface InitialObjectString extends InitialObject {
	type: 'string';
	initial: string;
	enum?: Enum;
	validate?: (value: string) => string;
}

type ObjectString = InitialObjectString;

export default ObjectString;
