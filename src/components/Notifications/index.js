import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '../../services/api';

import {
  Container,
  Badge,
  NotificationList,
  Scroll,
  Notification,
} from './style';

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnread = useMemo(
    () => !!notifications.find((notification) => notification.read === false),
    [notifications]
  );

  useEffect(() => {
    async function loadNotification() {
      const response = await api.get('notifications');
      const data = response.data.map((notification) => ({
        ...notification,
        timeDistance: formatDistance(
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));
      setNotifications(data);
    }
    loadNotification();
  }, []);

  const handleToggleVisible = () => {
    setVisible(!visible);
  };

  const handleMarkAsRead = async (id) => {
    await api.put(`notifications/${id}`);
    setNotifications(
      notifications.map((notification) =>
        notification._id ? { ...notification, read: true } : notification
      )
    );
  };

  return (
    <Container>
      <Badge onClick={handleToggleVisible} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>
      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map((notification) => {
            const {
              _id,
              read,
              content,
              user,
              createdAt,
              updatedAt,
              timeDistance,
            } = notification;
            return (
              <Notification unread={!notification.read}>
                <p>{content}</p>
                <time>{timeDistance}</time>
                {!notification.read && (
                  <button
                    onClick={() => handleMarkAsRead(notification._id)}
                    type="button"
                  >
                    Marcar como lida
                  </button>
                )}
              </Notification>
            );
          })}
        </Scroll>
      </NotificationList>
    </Container>
  );
}
