import * as H from 'history';

export interface Location extends H.Location<H.History.PoorMansUnknown> {}
export interface History extends H.History<H.LocationState> {}
