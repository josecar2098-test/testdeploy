import { useEffect, useState } from "react";

type ApiResponse = {
  message: string;
};

function App() {
  const [message, setMessage] = useState<string>("Cargando...");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/test");
        const data: ApiResponse = await res.json();
        setMessage(data.message);
      } catch (error) {
        console.error(error);
        setMessage("Error conectando al backend");
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>Frontend React + TypeScript 🚀</h1>
      <p>Mensaje del backend:</p>
      <strong>{message}</strong>
    </div>
  );
}

export default App;