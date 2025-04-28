
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
- **Download/Delete**: Hover a file for download/delete buttons.
- **Sidebar**: Filter by file type.
- **Quick Filter**: Use in Home view for fast filtering.
- **Recently Opened**: Shows your last 8 opened files (localStorage).
- **Responsive**: Works on desktop and mobile (sidebar hides on small screens).

---

## Project Structure

dropbox-assignment/
client/ # React frontend
public/
src/
build/
package.json
server/ # Node.js/Express backend
controllers/
middlewares/
models/
routes/
services/
utils/
app.js
package.json
docker-compose.yml
README.md

---

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
