import {userReducer, initialState as reducerInitialState} from "../services/reducers/userReducer";
import {editDataWasSuccessful, editDataWasUnSuccessful, makeEditDataRequest} from "../services/actions/user";

describe('user reducer', () => {
    it('should return initial state', () => {
        expect(
            userReducer(undefined, {})
        ).toEqual(reducerInitialState);
    });

    it('should start edit user data request', () => {
        expect(
            userReducer(undefined, makeEditDataRequest())
        ).toEqual({
            ...reducerInitialState,
            isLoading: true,
        });
    });

    it('should set error with failed edit request', () => {
        expect(
            userReducer(undefined, editDataWasUnSuccessful('Ошибка'))
        ).toEqual({
            ...reducerInitialState,
            error: 'Ошибка'
        })
    });

    it('should reset loading with successful edit request', () => {
        expect(
            userReducer(undefined, editDataWasSuccessful())
        ).toEqual({
            ...reducerInitialState,
            isLoading: false,
        })
    });
});