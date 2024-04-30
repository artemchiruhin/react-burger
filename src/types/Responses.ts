import {IIngredient} from '../interfaces/IIngredient';
import {IUser} from '../interfaces/IUser';
import {IOrder} from '../interfaces/IOrder';

export type TServerResponse<T> = {
    success: boolean,
} & T;

export type TRefreshResponse = TServerResponse<{
    refreshToken: string;
    accessToken: string;
}>;

export type TIngredientsResponse = TServerResponse<{
    data: IIngredient[];
}>;

export type TGetUserResponse = TServerResponse<{
    user: IUser;
}>;

export type TSignInResponse = TServerResponse<{
    user: IUser;
    refreshToken: string;
    accessToken: string;
}>;

export type TSignUpResponse = TServerResponse<{
    user: IUser;
    refreshToken: string;
    accessToken: string;
}>;

export type TCreateOrderResponse = TServerResponse<{
    name: string,
    order: IOrder,
}>;

export type TGetOrderResponse = TServerResponse<{
    orders: IOrder[],
}>;