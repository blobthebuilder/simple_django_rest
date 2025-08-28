import { useState } from "react";
import "./App.css";
import ActionForm from "./components/ActionForm";
import ActionsList from "./components/ActionsList";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleActionCreated = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-3xl font-bold text-center mb-6">CarbonSustain</h1>
      <ActionForm onActionCreated={handleActionCreated} />
      <ActionsList refreshKey={refreshKey} />
    </div>
  );
}

export default App;
