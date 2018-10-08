/* @flow */

import * as React from 'react';
import PropTypes from 'prop-types';
import colors from 'config/colors';
import Icon from 'components/Icon';
import icons from 'config/icons';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import DeviceHeader from 'components/DeviceHeader';
import * as deviceUtils from 'utils/device';

import AccountMenu from './components/AccountMenu';
import CoinMenu from './components/CoinMenu';
import DeviceMenu from './components/DeviceMenu';
import StickyContainer from './components/StickyContainer';

import type { Props } from './components/common';

const Header = styled(DeviceHeader)`
    border-right: 1px solid ${colors.BACKGROUND};
`;

const Counter = styled.div`
    border: 1px solid ${colors.DIVIDER};
    border-radius: 50%;
    color: ${colors.TEXT_SECONDARY};
    width: 24px;
    height: 24px;
    line-height: 22px;
    text-align: center;
    font-size: 11px;
    margin-right: 8px;
`;

const TransitionGroupWrapper = styled(TransitionGroup)`
    width: 640px;
`;

const TransitionContentWrapper = styled.div`
    width: 320px;
    display: inline-block;
    vertical-align: top;
`;

const Footer = styled.div.attrs({
    style: ({ position }) => ({
        position,
    }),
})`
    width: 320px;
    bottom: 0;
    background: ${colors.MAIN};
    border-right: 1px solid ${colors.BACKGROUND};
`;

const Body = styled.div`
    width: 320px;
`;

const Help = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 319px;
    padding: 8px 0px;
    border-top: 1px solid ${colors.BACKGROUND};
`;

const A = styled.a`
    color: ${colors.TEXT_SECONDARY};
    font-size: 12px;
    display: inline-block;
    padding: 8px;
    height: auto;

    &:hover {
        background: transparent;
        color: ${colors.TEXT_PRIMARY};
    }
`;

type TransitionMenuProps = {
    animationType: ?string;
    children?: React.Node;
}

// TransitionMenu needs to dispatch window.resize event
// in order to StickyContainer be recalculated
const TransitionMenu = (props: TransitionMenuProps): React$Element<TransitionGroup> => (
    <TransitionGroupWrapper component="div" className="transition-container">
        <CSSTransition
            key={props.animationType}
            onExit={() => { window.dispatchEvent(new Event('resize')); }}
            onExited={() => window.dispatchEvent(new Event('resize'))}
            in
            out
            classNames={props.animationType}
            appear={false}
            timeout={300}
        >
            <TransitionContentWrapper>
                { props.children }
            </TransitionContentWrapper>
        </CSSTransition>
    </TransitionGroupWrapper>
);

type State = {
    animationType: ?string;
    shouldRenderDeviceSelection: boolean;
    clicked: boolean;
}

class LeftNavigation extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        const { location } = this.props.router;
        const hasNetwork = location && location.state && location.state.network;
        this.state = {
            animationType: hasNetwork ? 'slide-left' : null,
            shouldRenderDeviceSelection: false,
            clicked: false,
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        const { dropdownOpened, selectedDevice } = nextProps.wallet;
        const { location } = nextProps.router;
        const hasNetwork = location && location.state.network;
        const deviceReady = selectedDevice && selectedDevice.features && selectedDevice.mode === 'normal';
        if (dropdownOpened) {
            this.setState({ shouldRenderDeviceSelection: true });
        } else if (hasNetwork) {
            this.setState({
                shouldRenderDeviceSelection: false,
                animationType: 'slide-left',
            });
        } else {
            this.setState({
                shouldRenderDeviceSelection: false,
                animationType: deviceReady ? 'slide-right' : null,
            });
        }
    }

    shouldRenderAccounts() {
        const { selectedDevice } = this.props.wallet;
        const { location } = this.props.router;
        return selectedDevice
            && location
            && location.state
            && location.state.network
            && !this.state.shouldRenderDeviceSelection
            && this.state.animationType === 'slide-left';
    }

    handleOpen() {
        this.setState({ clicked: true });
        this.props.toggleDeviceDropdown(!this.props.wallet.dropdownOpened);
    }

    shouldRenderCoins() {
        return !this.state.shouldRenderDeviceSelection && this.state.animationType !== 'slide-left';
    }

    render() {
        const { props } = this;
        let menu;
        if (this.shouldRenderAccounts()) {
            menu = (
                <TransitionMenu animationType="slide-left">
                    <AccountMenu {...props} />
                </TransitionMenu>
            );
        } else if (this.shouldRenderCoins()) {
            menu = (
                <TransitionMenu animationType="slide-right">
                    <CoinMenu {...props} />
                </TransitionMenu>
            );
        }

        const { selectedDevice } = props.wallet;
        const isDeviceAccessible = deviceUtils.isDeviceAccessible(selectedDevice);
        return (
            <StickyContainer
                location={props.router.location.pathname}
                deviceSelection={this.props.wallet.dropdownOpened}
            >
                <Header
                    isSelected
                    isHoverable={false}
                    onClickWrapper={() => {
                        if (isDeviceAccessible || this.props.devices.length > 1) {
                            this.handleOpen();
                        }
                    }}
                    device={this.props.wallet.selectedDevice}
                    disabled={!isDeviceAccessible && this.props.devices.length === 1}
                    isOpen={this.props.wallet.dropdownOpened}
                    icon={(
                        <React.Fragment>
                            {this.props.devices.length > 1 && (
                                <Counter>{this.props.devices.length}</Counter>
                            )}
                            <Icon
                                canAnimate={this.state.clicked === true}
                                isActive={this.props.wallet.dropdownOpened}
                                size={25}
                                color={colors.TEXT_SECONDARY}
                                icon={icons.ARROW_DOWN}
                            />
                        </React.Fragment>
                    )}
                    {...this.props}
                />
                <Body>
                    {this.state.shouldRenderDeviceSelection && <DeviceMenu {...this.props} />}
                    {isDeviceAccessible && menu}
                </Body>
                <Footer key="sticky-footer">
                    <Help>
                        <A
                            href="https://trezor.io/support/"
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            <Icon size={26} icon={icons.CHAT} color={colors.TEXT_SECONDARY} />Need help?
                        </A>
                    </Help>
                </Footer>
            </StickyContainer>
        );
    }
}

LeftNavigation.propTypes = {
    connect: PropTypes.object,
    accounts: PropTypes.array,
    router: PropTypes.object,
    fiat: PropTypes.array,
    localStorage: PropTypes.object,
    discovery: PropTypes.array,
    wallet: PropTypes.object,
    devices: PropTypes.array,
    pending: PropTypes.array,

    toggleDeviceDropdown: PropTypes.func,
    addAccount: PropTypes.func,
    acquireDevice: PropTypes.func,
    forgetDevice: PropTypes.func,
    duplicateDevice: PropTypes.func,
    gotoDeviceSettings: PropTypes.func,
    onSelectDevice: PropTypes.func,
};

export default LeftNavigation;
