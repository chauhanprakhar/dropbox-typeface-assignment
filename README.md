# Dropbox Assignment

A full-stack Dropbox clone assignment using **React** for the frontend and **Node.js/Express** for the backend. This is a single user application as most of the fuynctionality revolves around file handling.

## Project Architecture
<img width="795" alt="image" src="https://github.com/user-attachments/assets/639b5e0f-b5f6-4fed-8807-8e72188cee23" />



## 📁 Project Structure

```
dropbox-assignment/
├── client/                # React frontend
│   ├── public/
│   ├── src/
│   ├── build/            # Production build (after running npm run build)
│   └── package.json      # Frontend dependencies and scripts
├── server/               # Node.js/Express backend
│   ├── controllers/      # Request handlers
│   ├── middlewares/      # Express middlewares (auth, error handling, etc.)
│   ├── models/           # Database models (if using DB)
│   ├── routes/           # API route definitions
│   ├── services/         # External services or business logic
│   ├── utils/            # Utility/helper functions
│   ├── app.js            # Main Express app
│   └── package.json      # Backend dependencies and scripts
├── docker-compose.yml    # Docker Compose file (optional, if containerized)
└── README.md             # Project documentation (this file)
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/dropbox-assignment.git
cd dropbox-assignment
```

### 2. Install Dependencies

For Frontend:
```bash
cd client
npm install
```

For Backend:
```bash
cd ../server
npm install
```

### 3. Running the App Locally

Start Backend Server:
```bash
cd server
npm run dev # or npm start
```

Start Frontend React App:
Open a new terminal:
```bash
cd client
npm start
```

* Frontend runs on: `http://localhost:3000`
* Backend runs on: `http://localhost:5000` (or whatever port you set)
* Remember to replace base URL in api.ts inside `client\src` from `https://dropbox-typeface-assignment.onrender.com/api` to `http://localhost:5000`or whatever port you set)

## ⚙️ Environment Variables

Set up environment variables if needed for backend (`server/.env`):
```
PORT=5001 
MONGO_URI= mongourl
AWS_ACCESS_KEY_ID= access key id
AWS_SECRET_ACCESS_KEY= secret key
AWS_REGION= region
AWS_S3_BUCKET_NAME= bucketname
```
(Adjust based on your actual backend configuration.)

This will spin up both the client and server in containers.

## 📌 Features


- **Upload files**: Click "Upload file" or drag-and-drop.
- **Preview**: Click a file to preview (images, PDFs, GIFs, MP3s).
- **Search**: You can search for a specific file.
- **Download/Delete**: Hover a file for download/delete buttons.
- **Sidebar**: Filter by file type.
- **Quick Filter**: Use in Home view for fast filtering.
- **Recently Opened**: Shows your last 8 opened files (localStorage).
- **Responsive**: Works on desktop and mobile (sidebar hides on small screens).

## ✨ Tech Stack

* **Frontend:** React.js, CSS
* **Backend:** Node.js, Express
* **Storage:** (Amazon S3)
* **Database:** MongoDB

## 📄 License

This project is licensed under the MIT License.

## Notes

- **File size limit:** 5MB per file (configurable in backend).
- **Supported file types:** Images (jpg, png, gif), PDFs, MP3, MP4, etc.
- **Error Handling:** All API errors are shown in a modal with a clear message.
- **Production:** Use `npm run build` in `client/` and serve with Express or a static server.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License

[MIT](LICENSE)

---

## Author

- [Prakhar Chauhan](https://github.com/chauhanprakhar)
