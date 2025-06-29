# Task-3--REAL-TIME-COLLABORATIVE-DOCUMENT-EDITOR

Company: CodeTech IT solutions 
Name: KESAVA NATH G 
Domain: Full Stack Development 
Intern ID: CT04DG3221 
Duration: 4 Weeks 
Mentor: Neela Santhosh Kumar

 **Real-Time Collaborative Document Editor** built using **React.js**, **Node.js**, **Socket.IO**, and **MongoDB**:

---

### **Working Process of the Real-Time Collaborative Document Editor**

The Real-Time Collaborative Document Editor is a web-based application that allows multiple users to edit a shared text document simultaneously. The architecture consists of three main components: the **frontend (React.js)**, the **backend server (Node.js + Express + Socket.IO)**, and the **database (MongoDB)**.

---

### **Frontend (React.js)**

The frontend is built using React.js to create a responsive and interactive user interface. When a user opens the app in the browser, the React app loads and establishes a WebSocket connection to the backend using **Socket.IO**. This connection allows the app to send and receive live updates as users type into the document.

A `<textarea>` is used to display and edit the document content. Whenever a user types, the `onChange` event handler is triggered. This event captures the new text and sends it to the backend via the Socket.IO `emit` function (`socket.emit('edit', newVal)`).

The frontend also listens for real-time updates using the `socket.on('update', ...)` event. When any other user makes a change, the server broadcasts the new content to all connected clients. This keeps the document in sync across all users.

When the app first loads, it requests the latest version of the document from the server using `socket.on('init', ...)` and sets that content into the editor.

---

### **Backend (Node.js + Express + Socket.IO)**

The backend is built using Node.js with the Express framework to handle HTTP and WebSocket connections. It uses **Socket.IO** to manage real-time bi-directional communication between clients and the server.

When the server starts, it listens for incoming WebSocket connections. When a user connects, the server checks if a document already exists in MongoDB. If not, it creates one. Then, it sends the current document content to the newly connected user using `socket.emit('init', content)`.

Whenever a client sends an `'edit'` event with updated text, the server updates the content in memory and saves it to MongoDB using Mongoose (`currentDoc.save()`). It then broadcasts the updated content to all other connected clients using `socket.broadcast.emit('update', newContent)`.

This ensures that all users receive the same content in real time without having to refresh the page or make HTTP requests.

---

### **Database (MongoDB)**

The application uses MongoDB to persist the document content. A simple schema is defined using Mongoose with a single field: `content` (type String). MongoDB stores only one document in this setup, representing the shared editor's content.

This allows the editor to remember the last saved content even after the server restarts or all users disconnect.

---

### **Conclusion**

This real-time editor enables smooth and collaborative editing by integrating React for the UI, Socket.IO for real-time communication, Node.js for server logic, and MongoDB for storage. The entire flow revolves around broadcasting text changes as they happen, ensuring all users see the same document in real time. It’s lightweight, scalable, and provides a solid foundation for more advanced features like user authentication, version control, and rich-text formatting.


Output:
![Image](https://github.com/user-attachments/assets/544b3a8f-0bac-4edf-b9c1-b797e6f9a793)
