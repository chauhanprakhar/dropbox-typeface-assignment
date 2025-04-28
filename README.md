## Production Setup
 #### You can access project at https://dropbox-typeface-assignment-client.onrender.com/
 #### For Hosting https://render.com/ is used

## Local Setup
### 4. Install Dependencies

#### Backend

```sh
cd server
npm install
```

#### Frontend

```sh
cd ../client
npm install
```

### 5. Build and Run

#### Backend

```sh
cd ../server
npm start
```

#### Frontend (Development)

```sh
cd ../client
npm start
```

#### Frontend (Production Build)

```sh
cd ../client
npm run build
```
The build will be in `client/build/`.

---

## Usage

- **Upload files**: Click "Upload file" or drag-and-drop.
- **Preview**: Click a file to preview (images, PDFs, GIFs, MP3s).
- **Search**: You can search for a specific file.
- **Download/Delete**: Hover a file for download/delete buttons.
- **Sidebar**: Filter by file type.
- **Quick Filter**: Use in Home view for fast filtering.
- **Recently Opened**: Shows your last 8 opened files (localStorage).
- **Responsive**: Works on desktop and mobile (sidebar hides on small screens).

---
# Dropbox Assignment

A full-stack Dropbox clone assignment using **React** for the frontend and **Node.js/Express** for the backend.

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

## ⚙️ Environment Variables

Set up environment variables if needed for backend (`server/.env`):
```
PORT=5000
DB_URI=your_database_uri
JWT_SECRET=your_jwt_secret
```
(Adjust based on your actual backend configuration.)

## 🐳 Running with Docker

If you are using Docker:
```bash
docker-compose up --build
```
This will spin up both the client and server in containers.

## 📌 Features

* User authentication (login/signup)
* File upload and download
* Preview files (PDFs, images)
* Recently opened files tracking
* Filtering files by type (Documents, Photos, GIFs, MP3s)
* Trash/Delete functionality
* Responsive frontend with React

## ✨ Tech Stack

* **Frontend:** React.js, CSS
* **Backend:** Node.js, Express
* **Storage:** (Local/File System or Database - based on your setup)
* **Containerization (Optional):** Docker

## 📄 License

This project is licensed under the MIT License.

## Notes

- **File size limit:** 5MB per file (configurable in backend).
- **Supported file types:** Images (jpg, png, gif), PDFs, MP3, MP4, etc.
- **Authentication:** Simple username/password match (can be extended).
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
