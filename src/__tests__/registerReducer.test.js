import {registerReducer, initialState as reducerInitialState} from "../services/reducers/registerReducer";
import {
    makeRegisterRequest,
    registerRequestWasSuccessful,
    registerRequestWasUnSuccessful
} from "../services/actions/register";

describe('register reducer', () => {
    it('should return initial state', () => {
        expect(
            registerReducer(undefined, {})
        ).toEqual(reducerInitialState);
    });

    it('should start registration request', () => {
        expect(
            registerReducer(undefined, makeRegisterRequest())
        ).toEqual({
            ...reducerInitialState,
            isLoading: true,
        });
    });

    it('should set error with failed registration', () => {
        expect(
            registerReducer(undefined, registerRequestWasUnSuccessful('Ошибка'))
        ).toEqual({
           ...reducerInitialState,
           error: 'Ошибка'
        });
    });

    it('should reset loading with successful registration', () => {
        const initialState = {
            ...reducerInitialState,
            isLoading: true,
        }

        expect(
            registerReducer(initialState, registerRequestWasSuccessful())
        ).toEqual({
            ...initialState,
            isLoading: false,
        });
    });
});