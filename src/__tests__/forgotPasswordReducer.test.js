import {forgotPasswordReducer, initialState as reducerInitialState} from "../services/reducers/forgotPasswordReducer";
import {
    forgotPasswordRequestWasSuccessful,
    forgotPasswordRequestWasUnSuccessful,
    makeForgotPasswordRequest
} from "../services/actions/forgotPassword";

describe('forgot password reducer', () => {
    it('should return initial state', () => {
        expect(
            forgotPasswordReducer(undefined, {})
        ).toEqual(reducerInitialState);
    });

    it('should start request', () => {
        expect(
            forgotPasswordReducer(undefined, makeForgotPasswordRequest())
        ).toEqual({
            ...reducerInitialState,
            isLoading: true,
        });
    });

    it('should set error with failed request', () => {
        expect(
            forgotPasswordReducer(undefined, forgotPasswordRequestWasUnSuccessful('Ошибка'))
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
            forgotPasswordReducer(initialState, forgotPasswordRequestWasSuccessful())
        ).toEqual({
            ...initialState,
            isLoading: false,
        })
    });
})