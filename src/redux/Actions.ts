import * as ActionTypes from './ActionTypes';

interface ILoginAction {
  type: string;
  payload: object;
}
export type AuthActionTypes =ILoginAction
export const action_Login = (data: object): ILoginAction => ({
    type: ActionTypes.LOGIN,
    payload: data
})
