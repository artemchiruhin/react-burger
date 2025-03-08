import {authReducer, initialState as reducerInitialState} from "../services/reducers/authReducer";
import {authWasSuccessful, authWasUnSuccessful, makeAuthRequest} from "../services/actions/auth";

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(
            authReducer(undefined, {})
        ).toEqual(reducerInitialState);
    });

    it('should start auth request', () => {
        expect(
            authReducer(undefined, makeAuthRequest())
        ).toEqual({
            ...reducerInitialState,
            isLoading: true,
        });
    });

    it('should set error with failed auth', () => {
        expect(
            authReducer(undefined, authWasUnSuccessful('Ошибка'))
        ).toEqual({
            ...reducerInitialState,
            error: 'Ошибка',
        });
    });

    it('should reset loading with successful auth', () => {
        const initialState = {
            ...reducerInitialState,
            isLoading: true,
        }

        expect(
            authReducer(initialState, authWasSuccessful())
        ).toEqual({
            ...initialState,
            isLoading: false,
        });
    });
});