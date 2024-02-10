

export default function NotificationDetails({ notifications }) {
    return (
        <ul>
            {notifications.map((notification) => (
                <li key={notification.id}>
                    <h3>{notification.title}</h3>
                    <p>{notification.message}</p>
                    <small>{notification.date}</small>
                </li>
            ))}
        </ul>
    );
}


