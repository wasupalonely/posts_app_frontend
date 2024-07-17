import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1';

export const updateNotificationVisibility = async (notificationId) => {
    await axios.put(
        `${API_URL}/notifications/${notificationId}`,
        {
            seen: true
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
        }
    );
}