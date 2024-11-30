import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Layout from "./components/Layout/Layout";
import Success from "./components/Success/Success";
import Unsubscribe from "./components/Unsubscribe/Unsubscribe";

function App() {
  return (
    <Routes>
      {/* Layout renders the children thats passed in*/}
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="unsubscribe" element={<Unsubscribe />} />
        <Route path="success" element={<Success />} />
      </Route>
    </Routes>
  );
}

export default App;
