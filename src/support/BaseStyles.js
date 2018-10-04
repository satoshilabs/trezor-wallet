import { injectGlobal } from 'styled-components';
import colors from 'config/colors';
import normalize from 'styled-normalize';

const baseStyles = () => injectGlobal`
    ${normalize};

    html, body {
        width: 100%;
        height: 100%;
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
        font-weight: 400;
        font-size: 14px;
        color: ${colors.TEXT};
    }

    * , *:before , *:after {
        box-sizing: border-box;
    }

    * {
        margin: 0;
        padding: 0;
    }

    *::selection, *::-moz-selection, *:focus, *:active, *:active:focus,  {
        outline: 0 !important;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    a {
        text-decoration: none;
        cursor: pointer;
    }

    a:focus,
    button:focus,
    input:focus,
    textarea:focus {
        outline: 0;
    }

    #root {
        height: 100%;
    }

    /* 
        custom Roboto with Zero without the thing inside, so it's more readable as number
        since 0 doesn't look too similar to 8
    */

    @font-face {
        font-family: 'Roboto Zero';
        src: url('/fonts/roboto/RobotoZero.eot') format('embedded-opentype'),
            url('/fonts/roboto/RobotoZero.eot?#iefix') format('embedded-opentype'),
            url('/fonts/roboto/RobotoZero.woff') format('woff'),
            url('/fonts/roboto/RobotoZero.ttf') format('truetype');
    }

    @font-face {
        font-family: 'Roboto Mono';
        font-style: normal;
        src:url('/fonts/roboto/RobotoMonoRegular.eot') format('embedded-opentype'), /* IE9 Compat Modes */
            url('/fonts/roboto/RobotoMonoRegular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
            url('/fonts/roboto/RobotoMonoRegular.woff2') format('woff2'), /* Super Modern Browsers */
            url('/fonts/roboto/RobotoMonoRegular.woff') format('woff'), /* Modern Browsers */
            url('/fonts/roboto/RobotoMonoRegular.ttf') format('truetype'), /* Safari, Android, iOS */
            url('/fonts/roboto/RobotoMonoRegular.svg#RobotoMono') format('svg'); /* Legacy iOS */
    }

    .slide-left-enter {
        transform: translate(100%);
        pointer-events: none;
    }
    
    .slide-left-enter.slide-left-enter-active {
        transform: translate(0%);
        transition: transform 300ms ease-in-out;
    }
    
    .slide-left-exit {
        transform: translate(-100%);
    }
    
    .slide-left-exit.slide-left-exit-active {
        transform: translate(0%);
        transition: transform 300ms ease-in-out;
    }
    
    .slide-right-enter {
        transform: translate(-100%);
        pointer-events: none;
    }
    
    .slide-right-enter.slide-right-enter-active {
        transform: translate(0%);
        transition: transform 300ms ease-in-out;
    }
    
    .slide-right-exit {
        transform: translate(-100%);
    }
    
    .slide-right-exit.slide-right-exit-active {
        transform: translate(-200%);
        transition: transform 300ms ease-in-out;
    }

`;

export default baseStyles;