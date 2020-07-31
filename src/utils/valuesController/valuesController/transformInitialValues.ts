import { InitialExtendValue } from "../../../types/Initial/Initial";
import mutateValueToObjectValues from "./mutateValueToObjectValues";

const transformToInitialValue = (initialValue: InitialExtendValue) => {
	return mutateValueToObjectValues(initialValue);
};

export default transformToInitialValue;
