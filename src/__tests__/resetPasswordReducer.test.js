import {resetPasswordReducer, initialState as reducerInitialState} from "../services/reducers/resetPasswordReducer";
import {
    makeResetPasswordRequest,
    resetPasswordRequestWasSuccessful,
    resetPasswordRequestWasUnSuccessful
} from "../services/actions/resetPassword";

describe('reset password reducer', () => {
    it('should return initial state', () => {
        expect(
            resetPasswordReducer(undefined, {})
        ).toEqual(reducerInitialState);
    });

    it('should start request', () => {
        expect(
            resetPasswordReducer(undefined, makeResetPasswordRequest())
        ).toEqual({
            ...reducerInitialState,
            isLoading: true,
        });
    });

    it('should set error with failed request', () => {
        expect(
            resetPasswordReducer(undefined, resetPasswordRequestWasUnSuccessful('Ошибка'))
        ).toEqual({
            ...reducerInitialState,
            error: 'Ошибка',
        });
    });

    it('should reset loading with successful request', () => {
        const initialState = {
            ...reducerInitialState,
            isLoading: true,
        }
        expect(
            resetPasswordReducer(initialState, resetPasswordRequestWasSuccessful())
        ).toEqual({
            ...initialState,
            isLoading: false,
        })
    });
})