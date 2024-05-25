import React, { useCallback, useEffect, useRef, useState } from 'react'
import Notification, { INotification } from '../Notification';
import './notify-container.css';
const useNotification = (position="bottom-left") => {

    const [notifications, setNotifications] = useState<INotification[]>([]);
    const timers = useRef<{ [key: number]: NodeJS.Timeout }>({});

    let timer: string | number | NodeJS.Timeout | undefined= undefined;


    const triggerNotification = useCallback((notifyProps: INotification) => {
        const id = new Date().getTime();
        const newNotification = { ...notifyProps, id };

        setNotifications((prevNotifications) => [...prevNotifications, newNotification]);

        timers.current[id] = setTimeout(() => {
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notification) => notification.id !== id)
            );
            if (newNotification.onClose) {
                newNotification.onClose();
            }
            delete timers.current[id];
        }, newNotification.duration);
    }, []);

    const removeNotification = useCallback((id: number) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        );
        if (timers.current[id]) {
            clearTimeout(timers.current[id]);
            delete timers.current[id];
        }
    }, []);

    useEffect(() => {
        return () => {
            Object.values(timers.current).forEach(clearTimeout);
        };
    }, []);


    const notificationComponent = notifications.length>0 ?  (
        <div className={`${position}`}>

        {
            notifications.map((notification) => (
                <Notification
                id={notification.id}
                key={notification.id}
                type={notification.type}
                message={notification.message}
                onClose={() => removeNotification(notification.id)}
                />
            ))
        }
        </div>
  ):null


  return {
       notificationComponent,
       triggerNotification 
  }
}

export default useNotification