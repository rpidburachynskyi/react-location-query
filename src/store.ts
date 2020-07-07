import { History } from './types';

let history: History;

export const setHistory = (h: History): History => (history = h);
export const getHistory = () => history;

export const getLocation = () => history.location;
