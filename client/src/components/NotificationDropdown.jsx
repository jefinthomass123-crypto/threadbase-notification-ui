
import { useNotifications } from "../context/NotificationContext.jsx";
import NotificationItem from "./NotificationItem.jsx";

export default function NotificationDropdown({ onClose }) {
  const { state, dispatch } = useNotifications();
  const notifications = state.notifications || [];

  return (
    <div
      role="dialog"
      aria-label="Notifications"
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        right: 0,
        width: "320px",
        maxHeight: "400px",
        overflowY: "auto",
        background: "#fff",
        color: "#222",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
        zIndex: 1000,
        padding: "12px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <h3 style={{ margin: "4px 0 12px" }}>
          Notifications
        </h3>

        <button
          type="button"
          onClick={() => dispatch({ type: "MARK_ALL_READ" })}
        >
          Mark all as read
        </button>
      </div>

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={onClose}
          />
        ))
      )}
    </div>
  );
}
