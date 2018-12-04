/* @flow */
import type { Action } from 'flowtype';
import * as SIGN_VERIFY from '../actions/constants/signVerify';

export type State = {
    signature: string;
    isSignProgress: boolean;
    isVerifyProgress: boolean;
}

export const initialState: State = {
    signature: '',
    isSignProgress: false,
    isVerifyProgress: false,
};

export default (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case SIGN_VERIFY.SIGN_PROGRESS:
            return {
                ...state,
                isSignProgress: action.isSignProgress,
            };

        case SIGN_VERIFY.SIGN_SUCCESS:
            return {
                ...state,
                signature: action.signature,
            };

        case SIGN_VERIFY.VERIFY_PROGRESS:
            return {
                ...state,
                isVerifyProgress: action.isVerifyProgress,
            };

        case SIGN_VERIFY.CLEAR:
            return {
                ...initialState,
            };

        default:
            return state;
    }
};