import { useMutation } from "@tanstack/react-query";
import { useNotifications } from "../context/NotificationContext.jsx";
import apiClient from "../services/apiClient.js";

export default function NotificationItem({ notification }) {
  const { dispatch } = useNotifications();

  const mutation = useMutation({
    mutationFn: (id) =>
      apiClient.patch(`/api/notifications/${id}/read`),

    onMutate: (id) => {
      dispatch({ type: "MARK_READ", payload: id });
    },

    onError: () => {
      // Reload the page to restore server state if the request fails.
      window.location.reload();
    },
  });

  return (
    <div
      style={{
        padding: "10px",
        marginBottom: "8px",
        borderRadius: "6px",
        background: notification.isRead ? "#f3f4f6" : "#eaf2ff",
        borderLeft: notification.isRead
          ? "3px solid #ccc"
          : "3px solid #2563eb",
      }}
    >
      <button
        type="button"
        disabled={notification.isRead || mutation.isPending}
        onClick={() => mutation.mutate(notification.id)}
        style={{
          width: "100%",
          textAlign: "left",
          border: "none",
          background: "transparent",
          cursor: "pointer",
        }}
      >
        <strong>{notification.title || "Notification"}</strong>
        <p>
          {notification.message ||
            notification.body ||
            "You have a new notification."}
        </p>
        <small>{notification.isRead ? "Read" : "Unread"}</small>
      </button>
    </div>
  );
}