import styled, { css } from 'styled-components';
import colors from 'config/colors';

const baseStyles = css`
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    color: ${colors.TEXT_PRIMARY};
    font-weight: bold;
    margin: 0;
    padding: 0;
`;

const H1 = styled.h1`
    ${baseStyles};
    font-size: 18px;
    padding-bottom: 10px;
`;

const H2 = styled.h2`
    ${baseStyles};
    font-size: 16px;
 
    ${props => props.claim && css`
        font-size: 36px;
        padding-bottom: 24px
    `}
    padding-bottom: 10px;
`;

const H3 = styled.h3`
    ${baseStyles};
    font-size: 14px;
    margin-bottom: 10px;
`;

const H4 = styled.h4`
    ${baseStyles};
    font-size: 12px;
    padding-bottom: 10px;
`;

export {
    H1,
    H2,
    H3,
    H4,
};