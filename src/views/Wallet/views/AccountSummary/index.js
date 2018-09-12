/* @flow */
import styled from 'styled-components';
import React from 'react';
import { H2 } from 'components/Heading';
import TooltipContent from 'components/TooltipContent';
import BigNumber from 'bignumber.js';
import Icon from 'components/Icon';
import { AsyncSelect } from 'components/Select';
import ICONS from 'config/icons';
import colors from 'config/colors';
import Tooltip from 'rc-tooltip';

import CoinLogo from 'components/images/CoinLogo';
import * as stateUtils from 'reducers/utils';
import SelectedAccount from 'views/Wallet/components/SelectedAccount';
import Link from 'components/Link';
import AccountBalance from './components/AccountBalance';
import AddedToken from './components/AddedToken';

import type { Props } from './Container';

const AccountHeading = styled.div`
    padding: 20px 48px 20px 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledH2 = styled(H2)`
    padding: 20px 48px;
`;

const AccountName = styled.div`
    display: flex;
    align-items: center;
`;

const StyledCoinLogo = styled(CoinLogo)`
    margin-right: 10px;
`;

const StyledIcon = styled(Icon)`
    position: relative;
    top: -1px;
    &:hover {
        cursor: pointer;
    }
`;

const AsyncSelectWrapper = styled.div`
    padding: 0px 48px 32px 48px;
`;

const AddedTokensWrapper = styled.div``;

const AccountSummary = (props: Props) => {
    const device = props.wallet.selectedDevice;
    const {
        account,
        network,
        tokens,
        pending,
    } = props.selectedAccount;

    // flow
    if (!device || !account || !network) return <SelectedAccount {...props} />;

    const explorerLink: string = `${network.explorer.address}${account.address}`;
    const pendingAmount: BigNumber = stateUtils.getPendingAmount(pending, network.symbol);
    const balance: string = new BigNumber(account.balance).minus(pendingAmount).toString(10);

    return (
        <SelectedAccount {...props}>
            <AccountHeading network={account.networks}>
                <AccountName>
                    <StyledCoinLogo coinNetwork={account.network} />
                    <H2>Account #{parseInt(account.index, 10) + 1}</H2>
                </AccountName>
                <Link
                    target="_blank"
                    rel="noreferrer noopener"
                    href={explorerLink}
                    isGray
                >See full transaction history
                </Link>
            </AccountHeading>

            <AccountBalance
                coin={network}
                summary={props.summary}
                balance={balance}
                network={network.network}
                fiat={props.fiat}
                localStorage={props.localStorage}
                onToggle={props.onDetailsToggle}
            />

            <StyledH2>
                Tokens
                <Tooltip
                    arrowContent={<div className="rc-tooltip-arrow-inner" />}
                    overlay={(
                        <TooltipContent>
                            Insert token name, symbol or address to be able to send it.
                        </TooltipContent>
                    )}
                    placement="top"
                >
                    <StyledIcon
                        icon={ICONS.HELP}
                        color={colors.TEXT_SECONDARY}
                        size={24}
                    />
                </Tooltip>
            </StyledH2>
            {/* 0x58cda554935e4a1f2acbe15f8757400af275e084 Lahod */}
            {/* 0x58cda554935e4a1f2acbe15f8757400af275e084 T01 */}

            {/* TOOO: AsyncSelect is lagging when dropdown menu must show more than 200 items */}
            {/* TODO: Input's box-shadow  */}
            <AsyncSelectWrapper>
                <AsyncSelect
                    isSearchable
                    defaultOptions
                    value={null}
                    isMulti={false}
                    placeholder="Search for the token"
                    loadingMessage={() => 'Loading...'}
                    noOptionsMessage={() => 'Token not found'}
                    onChange={token => props.addToken(token, account)}
                    loadOptions={input => props.loadTokens(input, account.network)}
                    formatOptionLabel={(option) => {
                        const isAdded = tokens.find(t => t.symbol === option.symbol);
                        if (isAdded) {
                            return `${option.name} (Already added)`;
                        }
                        return option.name;
                    }}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.symbol}
                />
            </AsyncSelectWrapper>

            <AddedTokensWrapper>
                {tokens.map(token => (
                    <AddedToken
                        key={token.symbol}
                        token={token}
                        pending={pending}
                        removeToken={props.removeToken}
                    />
                ))}
            </AddedTokensWrapper>
        </SelectedAccount>
    );
};

export default AccountSummary;
