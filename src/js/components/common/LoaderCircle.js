/* @flow */


import React from 'react';

type Props = {
    size: string,
    label?: string,
    className?: string,
};

export default (props: Props): React$Element<string> => {
    const className = props.className ? `loader-circle ${props.className}` : 'loader-circle';

    const style = {
        width: `${props.size}px`,
        height: `${props.size}px`,
    }

    return (
        <div className={ className } style={ style }>
            <p>{ props.label }</p>
            <svg className="circular" viewBox="25 25 50 50">
                <circle className="route" cx="50" cy="50" r="20" fill="none" stroke="" strokeWidth="1" strokeMiterlimit="10" />
                <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="1" strokeMiterlimit="10" />
            </svg>
        </div>
    );
};
