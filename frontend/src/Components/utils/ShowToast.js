import { toast } from 'react-toastify';

// A map to track active toast messages by their ID
const activeToasts = new Set();

export const showToast = (message, type = 'info') => {
    // Generate a unique ID for the toast message (e.g., hash the message)
    const toastId = message;

    // Check if the toast is already active
    if (activeToasts.has(toastId)) {
        return; // Do not show the toast again
    }

    // Add the toast ID to the active set
    activeToasts.add(toastId);

    const options = {
        position: "bottom-left",
        onClose: () => activeToasts.delete(toastId), 
    };

    switch (type) {
        case 'success':
            toast.success(message, options);
            break;
        case 'error':
            toast.error(message, options);
            break;
        case 'warning':
            toast.warning(message, options);
            break;
        default:
            toast.info(message, options);
            break;
    }
};
