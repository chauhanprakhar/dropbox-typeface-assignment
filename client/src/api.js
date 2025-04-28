const API_BASE = 'https://dropbox-typeface-assignment.onrender.com';

export async function registerUser(username, password) {
  const res = await fetch(`${API_BASE}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function uploadFile({ file, username, password }) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('username', username);
  formData.append('password', password);
  const res = await fetch(`${API_BASE}/files/upload`, {
    method: 'POST',
    body: formData
  });
  return res.json();
}

export async function listFiles() {
  const res = await fetch(`${API_BASE}/files`);
  return res.json();
}

export async function listFilesByUser(username, password) {
  // This endpoint expects req.user, but for now, you may need to adjust backend or pass username/password in body or headers
  // Here, we use POST for demonstration, but you may need to adjust backend to accept username/password
  const res = await fetch(`${API_BASE}/files/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  return res.json();
}

export async function downloadFile(id) {
  const res = await fetch(`${API_BASE}/files/${id}/download`);
  if (!res.ok) throw new Error('Download failed');
  return res.blob();
} 
