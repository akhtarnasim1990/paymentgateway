import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import SuccessPayment from "./pages/Success";
import CancelPayment from "./pages/Cancel";
import Checkout from "./pages/Checkout/Checkout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<SuccessPayment />} />
        <Route path="/cancel" element={<CancelPayment />} />
        <Route path="*" element={<Navigate to="/checkout" />} />
      </Routes>
    </Router>
  );
}

export default App;
