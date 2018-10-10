import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FONT_SIZE, TRANSITION } from 'config/variables';
import colors from 'config/colors';
import { NavLink } from 'react-router-dom';

const A = styled.a`
    text-decoration: none;
    cursor: pointer;
    transition: ${TRANSITION.HOVER};
    font-size: ${FONT_SIZE.SMALLER};

    ${props => props.isGreen && css`
        border-bottom: 1px solid ${colors.GREEN_PRIMARY};
    `}
    ${props => props.isGray && css`
        border-bottom: 1px solid ${colors.TEXT_SECONDARY};
    `}

    &,
    &:visited,
    &:active,
    &:hover {
        ${props => props.isGreen && css`
            color: ${colors.GREEN_PRIMARY};
        `}
        ${props => props.isGray && css`
            color: ${colors.TEXT_SECONDARY};
        `}
    }

    &:hover {
        border-color: transparent;
    }
`;

const StyledNavLink = styled(NavLink)`
    ${props => props.isGreen && css`
            color: ${colors.GREEN_PRIMARY};
    `}

    ${props => props.isGray && css`
        color: ${colors.TEXT_SECONDARY};
    `}
`;

class Link extends Component {
    render() {
        const shouldRenderRouterLink = !!this.this.to;
        let LinkComponent;
        if (shouldRenderRouterLink) {
            LinkComponent = (
                <StyledNavLink
                    isGreen={this.props.isGreen}
                    isGray={this.props.isGray}
                    to={this.props.to}
                />);
        } else {
            LinkComponent = (
                <A
                    className={this.props.className}
                    href={this.props.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    onClick={this.props.onClick}
                    isGreen={this.props.isGreen}
                    isGray={this.props.isGray}
                >{this.props.children}
                </A>
            );
        }
        return (<LinkComponent />);
    }
}

Link.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.array,
    ]).isRequired,
    className: PropTypes.string,
    href: PropTypes.string,
    to: PropTypes.string,
    onClick: PropTypes.func,
    isGreen: PropTypes.bool,
    isGray: PropTypes.bool,
};

Link.defaultProps = {
    isGreen: false,
    isGray: false,
};

export default Link;
