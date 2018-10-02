import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { PRIORITY } from 'constants/notifications';
import Group from './components/Group';

const Wrapper = styled.div``;

class NotificationsGroup extends Component {
    groupNotifications = notifications => notifications
        .reduce((acc, obj) => {
            const key = obj.type;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});

    sortByPriority(notifications) {
        return notifications;
    }

    render() {
        const { close } = this.props;
        const notifications = [
            {
                key: 1,
                title: 'this is a title of error notification',
                type: 'error',
                message: 'this is a message of error notification',
            },
            {
                key: 2,
                title: 'this is a title of warning notification',
                type: 'warning',
                message: 'this is a message of warning notification',
            },
            {
                key: 3,
                title: 'this is a title of warning notification',
                type: 'warning',
                message: 'this is a message of warning notification',
            },
            {
                key: 4,
                title: 'this is a title of warning notification sds d',
                type: 'warning',
                message: 'this is a message of warning notification',
            },
            {
                key: 5,
                title: 'this is a title of warning notification as',
                type: 'info',
                message: 'this is a message of warning notification',
            },
            {
                key: 6,
                title: 'this is a title of info notification s ',
                type: 'info',
                message: 'this is a message of info notification',
            },
        ];
        const notificationGroups = this.groupNotifications(notifications);
        const sortedNotifications = this.sortByPriority(notificationGroups);

        return (
            <Wrapper>
                {Object.keys(sortedNotifications).map(group => (
                    <Group
                        key={group}
                        groupNotifications={notificationGroups[group]}
                        type={group}
                        close={close}
                    />
                ))}
            </Wrapper>
        );
    }
}

NotificationsGroup.propTypes = {
    notifications: PropTypes.array.isRequired,
    close: PropTypes.func.isRequired,
};

export default NotificationsGroup;