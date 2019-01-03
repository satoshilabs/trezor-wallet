/* @flow */


import { LOCATION_CHANGE } from 'connected-react-router';
import { DEVICE, TRANSPORT } from 'trezor-connect';
import * as MODAL from 'actions/constants/modal';
import * as WALLET from 'actions/constants/wallet';
import * as CONNECT from 'actions/constants/TrezorConnect';

import type { Action, RouterLocationState, TrezorDevice } from 'flowtype';

type State = {
    ready: boolean;
    online: boolean;
    dropdownOpened: boolean;
    showBetaDisclaimer: boolean;
    initialParams: ?RouterLocationState;
    initialPathname: ?string;
    disconnectRequest: ?TrezorDevice;
    selectedDevice: ?TrezorDevice;
}

const initialState: State = {
    ready: false,
    online: navigator.onLine,
    dropdownOpened: false,
    showBetaDisclaimer: false,
    initialParams: null,
    initialPathname: null,
    disconnectRequest: null,
    selectedDevice: null,
};

export default function wallet(state: State = initialState, action: Action): State {
    switch (action.type) {
        case WALLET.SET_INITIAL_URL:
            return {
                ...state,
                initialParams: action.state,
                initialPathname: action.pathname,
            };

        case TRANSPORT.START:
            return {
                ...state,
                ready: true,
            };

        case WALLET.ONLINE_STATUS:
            return {
                ...state,
                online: action.online,
            };

        case WALLET.TOGGLE_DEVICE_DROPDOWN:
            return {
                ...state,
                dropdownOpened: action.opened,
            };

        case LOCATION_CHANGE:
        case MODAL.CLOSE:
            return {
                ...state,
                dropdownOpened: false,
            };

        case CONNECT.DISCONNECT_REQUEST:
            return {
                ...state,
                disconnectRequest: action.device,
            };

        case DEVICE.DISCONNECT:
            if (state.disconnectRequest && action.device.path === state.disconnectRequest.path) {
                return {
                    ...state,
                    disconnectRequest: null,
                };
            }
            return state;

        case WALLET.SET_SELECTED_DEVICE:
        case WALLET.UPDATE_SELECTED_DEVICE:
            return {
                ...state,
                selectedDevice: action.device,
            };

        case WALLET.SHOW_BETA_DISCLAIMER:
            return {
                ...state,
                showBetaDisclaimer: true,
            };
        case WALLET.HIDE_BETA_DISCLAIMER:
            return {
                ...state,
                showBetaDisclaimer: false,
            };

        default:
            return state;
    }
}
