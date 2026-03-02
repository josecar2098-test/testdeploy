# Fullstack React + Express Deployment en Railway 🚀

Este proyecto combina un **frontend React + TypeScript** con un **backend Express** y está listo para desplegar en Railway de forma pública.

---

## Estructura del proyecto

project/
 ├─ backend/
 │    ├─ index.js
 │    └─ package.json
 ├─ frontend/
 │    ├─ src/
 │    └─ package.json
 └─ package.json  ← opcional root con scripts monorepo

---

## 1️⃣ Configurar el backend

1. Asegúrate de que el backend use process.env.PORT:

```js
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
```

2. Configura CORS y servir el frontend en producción:

```js
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(frontendPath));
  app.use((req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
```

---

## 2️⃣ Configurar el frontend

1. Crea un archivo `.env.production` dentro del frontend con la URL pública del backend:

```env
VITE_API_URL=https://<TU-BACKEND-PUBLICO>.up.railway.app
```

2. En tu componente React (`App.tsx`) usa la variable de entorno:

```ts
const apiUrl = import.meta.env.VITE_API_URL;

const res = await fetch(`${apiUrl}/api/test`);
```

---

## 3️⃣ Build del frontend

```bash
cd frontend
npm install
npm run build
```

---

## 4️⃣ Deploy en Railway

1. Sube todo tu proyecto a GitHub.  
2. En Railway, crea un nuevo proyecto → Deploy from GitHub.  
3. Selecciona tu repo.  

**Build Command**:

```bash
cd frontend && npm install && npm run build && cd ../backend && npm install
```

**Start Command**:

```bash
cd backend && npm start
```

4. Variables de entorno: Railway asigna PORT automáticamente.

---

## 5️⃣ Obtener la URL pública del proyecto

1. Ve a Settings → Public Networking en Railway.  
2. Habilita "Access to this service publicly through HTTP or TCP".  
3. Haz clic en Generate Domain.  
4. Esa URL será la que usarás en el frontend y compartirás con otros.

Ejemplo:

```
https://testdeploy-production-1108.up.railway.app
```

---

## 6️⃣ Probar la aplicación

- Frontend SPA:

```
https://testdeploy-production-1108.up.railway.app/
```

- API:

```
https://testdeploy-production-1108.up.railway.app/api/test
```

Deberías ver un JSON como:

```json
{ "message": "Hola desde el backend 🚀" }
```

---

## 7️⃣ Tips finales

- Siempre usa la URL pública del backend en producción.  
- Para desarrollo local, usa http://localhost:5000/api/test.  
- Corre primero el build del frontend antes de desplegar.