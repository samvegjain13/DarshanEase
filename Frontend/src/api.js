const API_BASE = "https://darshanease-1-b1je.onrender.com";
export const getImageUrl = (img) => img?.startsWith('http') ? img : `${API_BASE}/organizer/${img}`;
export default API_BASE;

