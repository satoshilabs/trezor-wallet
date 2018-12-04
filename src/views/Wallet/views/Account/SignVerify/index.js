import React, { Component } from 'react';
import styled from 'styled-components';
import Input from 'components/inputs/Input';
import Textarea from 'components/Textarea';
import ICONS from 'config/icons';
import { validateAddress } from 'utils/ethUtils';
import Icon from 'components/Icon';
import Title from 'views/Wallet/components/Title';
import Button from 'components/Button';
import Content from 'views/Wallet/components/Content';
import colors from 'config/colors';

const Wrapper = styled.div`
    display: flex;
    flex: 1;
    margin-top: -5px;
    flex-direction: row;
    background: ${colors.WHITE};
`;

const Row = styled.div`
    padding: 0 0 10px 0;
`;

const RowButtons = styled(Row)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledButton = styled(Button)`
    margin-left: 10px;
    width: 110px;
`;

const Column = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
`;

const Sign = styled(Column)``;

const Verify = styled(Column)`
    padding-left: 20px;
`;

const Label = styled.div`
    color: ${colors.TEXT_SECONDARY};
    padding: 5px 0px 10px 0;
`;

const ConfirmTooltip = styled.div`
    position: absolute;
    z-index: 10001;
    padding: 3px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 250px;
    background: black;
    border: 0;
    color: ${colors.WHITE};
    border-radius: 5px;
    transform: translate(-1px, -1px);
`;

const ArrowUp = styled.div`
    position: absolute;
    top: -9px;
    left: 20px;
    width: 0;
    height: 0;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-bottom: 9px solid black;
    z-index: 10001;
`;

const StyledIcon = styled(Icon)`
    position: relative;
    left: 0;
`;

const ConfirmText = styled.div`
    color: white;   
`;

class SignVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signMessage: '',
            verifyAddress: '',
            verifyMessage: '',
            verifySignature: '',
        };
    }

    getPath() {
        return this.props.selectedAccount.account.addressPath;
    }

    getAddress() {
        let result = null;
        const { selectedAccount } = this.props;
        if (selectedAccount.account && selectedAccount.account.address) {
            result = selectedAccount.account.address;
        }
        return result || 'loading...';
    }

    handleInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    clearSign =() => {
        this.setState({
            signMessage: '',
        });
        this.props.signVerifyActions.clear();
    }

    clearVerify = () => {
        this.setState({
            verifyAddress: '',
            verifyMessage: '',
            verifySignature: '',
        });
    }

    render() {
        const {
            signVerifyActions,
            signature,
        } = this.props;
        return (
            <Content>
                <Title>Sign & Verify</Title>
                <Wrapper>
                    <Sign>
                        <Row>
                            <Label>Address</Label>
                            <Input
                                name="signAddress"
                                value={this.getAddress()}
                                height={50}
                                type="text"
                                isSmallText
                                isDisabled
                            />
                        </Row>
                        <Row>
                            <Label>Message</Label>
                            <Textarea
                                name="signMessage"
                                value={this.state.signMessage}
                                onChange={this.handleInputChange}
                                rows={4}
                                maxRows={4}
                                maxLength="255"
                                isInTrezorAction={this.props.isSignProgress}
                            />
                            {this.props.isSignProgress && (
                                <ConfirmTooltip>
                                    <ArrowUp />
                                    <StyledIcon
                                        icon={ICONS.T1}
                                        color={colors.WHITE}
                                    />
                                    <ConfirmText>Check address on your Trezor</ConfirmText>
                                </ConfirmTooltip>
                            )}
                        </Row>
                        <Row>
                            <Label>Signature</Label>
                            <Textarea
                                name="signSignature"
                                value={this.props.signature}
                                rows={4}
                                maxRows={4}
                                maxLength="255"
                                isDisabled
                            />
                        </Row>
                        <RowButtons>
                            <Button
                                onClick={this.clearSign}
                                isWhite
                            >Clear
                            </Button>
                            <StyledButton
                                onClick={() => signVerifyActions.sign(this.getPath(), this.state.signMessage)}
                            >Sign
                            </StyledButton>
                        </RowButtons>
                    </Sign>
                    <Verify>
                        <Row>
                            <Label>Address</Label>
                            <Input
                                name="verifyAddress"
                                value={this.state.verifyAddress}
                                onChange={this.handleInputChange}
                                type="text"
                                state={(this.state.verifyAddress && validateAddress(this.state.verifyAddress)) ? 'error' : null}
                                bottomText={this.state.verifyAddress !== '' ? validateAddress(this.state.verifyAddress) : null}
                                isSmallText
                            />
                        </Row>
                        <Row>
                            <Label>Message</Label>
                            <Textarea
                                name="verifyMessage"
                                value={this.state.verifyMessage}
                                onChange={this.handleInputChange}
                                rows={4}
                                maxRows={4}
                                maxLength="255"
                            />
                        </Row>
                        <Row>
                            <Label>Signature</Label>
                            <Textarea
                                name="verifySignature"
                                value={this.state.verifySignature}
                                onChange={this.handleInputChange}
                                rows={4}
                                maxRows={4}
                                maxLength="255"
                            />
                        </Row>
                        <RowButtons>
                            <Button
                                onClick={this.clearVerify}
                                isWhite
                            >Clear
                            </Button>
                            <StyledButton
                                onClick={() => signVerifyActions.verify(
                                    this.state.verifyAddress,
                                    this.state.verifyMessage,
                                    this.state.verifySignature,
                                )}
                            >Verify
                            </StyledButton>
                        </RowButtons>
                    </Verify>
                </Wrapper>
            </Content>
        );
    }
}

export default SignVerify;