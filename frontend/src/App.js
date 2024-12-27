
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout"
import Landing from "./components/Landing/Landing"
import Unsubscribe from "./components/Unsubscribe/Unsubscribe";
import Success from "./components/Success/Success";

function App() {
  return (
    <Routes>
      <Route path="/" element={<h1>Landing Page</h1>} />
      <Route path="/unsubscribe" element={<h1>Unsubscribe Page</h1>} />
    </Routes>
  );
}


// function App() {
//   return (
//     <Routes>
//       {/* Layout renders the children thats passed in*/}
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Landing />} />
//         <Route path="unsubscribe" element={<Unsubscribe />} />
//         <Route path="success" element={<Success />} />
//       </Route>
//     </Routes>
//   );
// }

export default App;
