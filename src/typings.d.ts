/**
 * Default CSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */

import * as H from 'history';
interface SvgrComponent
	extends React.StatelessComponent<React.SVGAttributes<SVGElement>> {}

declare module '*.svg' {
	const svgUrl: string;
	const svgComponent: SvgrComponent;
	export default svgUrl;
	export { svgComponent as ReactComponent };
}

export interface Options {
	sort: 'alphabet';
	sortOrder: 'asc' | 'desc';
}

export interface Location extends H.Location<H.History.PoorMansUnknown> {}
export interface History extends H.History<H.LocationState> {}
