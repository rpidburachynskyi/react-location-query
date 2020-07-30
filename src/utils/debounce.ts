export function debounce<F extends (...params: any[]) => void>(fn: F) {
	let timeoutID: number | null = null;
	return function (this: any, ...args: any[]) {
		if (timeoutID) clearTimeout(timeoutID);
		timeoutID = window.setTimeout(() => fn.apply(this, args), 0);
	} as F;
}

export default debounce;
