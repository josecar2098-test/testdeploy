import { useEffect, useState } from "react";

type ApiResponse = {
  message: string;
};

function App() {
  const [message, setMessage] = useState<string>("Cargando...");

  // Obtener la URL del backend desde la variable de entorno
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/test`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data: ApiResponse = await res.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Error conectando al backend:", error);
        setMessage("Error conectando al backend");
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Frontend React + TypeScript 🚀</h1>
      <p>Mensaje del backend:</p>
      <strong>{message}</strong>
    </div>
  );
}

export default App;