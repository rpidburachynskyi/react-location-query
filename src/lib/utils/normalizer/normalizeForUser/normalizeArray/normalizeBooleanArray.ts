import { ObjectArrayBoolean } from '../../../../types/Initial/Array';

const normalizeBooleanArray = (
	array: string[],
	initialValue: ObjectArrayBoolean
) => {
	let flag: 'parseAll' | 'setInitial' | null = null;

	const newArray = array.map((value) => {
		if (flag) return;

		if (value !== 'true' && value !== 'false') {
			if (initialValue.onParsedError) {
				flag = 'parseAll';
				return;
			}

			if (initialValue.onParsedItemError) {
				const newValue = initialValue.onParsedItemError(value);
				if (typeof newValue !== 'boolean') {
					throw new Error(
						`onParsedItemError returned '${newValue}' instread must returns boolean`
					);
				}

				return newValue;
			} else {
				flag = 'setInitial';
				return;
			}
		}

		return value === 'true';
	});
	if (flag === 'parseAll') return initialValue.onParsedError!(array);
	if (flag === 'setInitial') return initialValue.initial;

	return newArray;
};

export default normalizeBooleanArray;
