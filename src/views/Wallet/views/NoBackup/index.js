/* @flow */

import React from 'react';
import styled from 'styled-components';
import { H1 } from 'components/Heading';
import P from 'components/Paragraph';
import Link from 'components/Link';
import Button from 'components/Button';
import Icon from 'components/Icon';

import { FONT_SIZE } from 'config/variables';
import colors from 'config/colors';
import icons from 'config/icons';

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 90px 35px 40px 35px;
`;

const StyledNavLink = styled(Link)`
    color: ${colors.TEXT_SECONDARY};
    padding-top: 20px;
    font-size: ${FONT_SIZE.BASE};
`;

const StyledH1 = styled(H1)`
    text-align: center;
`;

const Message = styled.div`
    text-align: center;
    padding: 0 0 15px 0;
`;

const FirmwareUpdate = () => (
    <Wrapper>
        <Icon
            size={128}
            color={colors.WARNING_PRIMARY}
            icon={icons.WARNING}
        />
        <StyledH1>Your Trezor is not backed up!</StyledH1>
        <Message>
            <P>If your device is ever lost or damaged, your funds will be lost. Backup your device first, to protect your coins against such events.</P>
            <P>Please use Bitcoin wallet interface to create a backup.</P>
        </Message>
        <Link href="https://wallet.trezor.io?backup=1">
            <Button>Take me to the Bitcoin wallet</Button>
        </Link>
        <StyledNavLink to="/">I’ll do that later.</StyledNavLink>
    </Wrapper>
);

export default FirmwareUpdate;