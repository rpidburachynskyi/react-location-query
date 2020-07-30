import { ObjectArrayNumber } from '../../../../types/Initial/Array';

const normalizeNumberArray = (
	array: string[],
	initialValue: ObjectArrayNumber
) => {
	let flag: 'parseAll' | 'setInitial' | null = null;

	const newArray = array.map((value) => {
		if (flag) return;

		if (isNaN(+value)) {
			if (initialValue.onParsedError) {
				flag = 'parseAll';
				return;
			}

			if (initialValue.onParsedItemError) {
				const newValue = initialValue.onParsedItemError(value);
				if (isNaN(newValue) || typeof newValue !== 'number') {
					throw new Error(
						`onParsedItemError returned '${newValue}' instread must returns number`
					);
				}

				return newValue;
			} else {
				flag = 'setInitial';
				return;
			}
		}

		return +value;
	});

	if (flag === 'parseAll') return initialValue.onParsedError!(array);
	if (flag === 'setInitial') return initialValue.initial;

	return newArray;
};

export default normalizeNumberArray;
