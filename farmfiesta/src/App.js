import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./MainComponents/HomePage";
import Navbar from "./Components/Navbar";
import Shop from "./Components/Shop";
import Login from "./MainComponents/Login";
import Register from "./MainComponents/Register";
import Cart from "./MainComponents/Cart";
import ProductPage from "./Components/ProductPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route  path="/" element={<HomePage />} />
          <Route  path="/shop" element={<Shop />} />
          <Route  path="/login" element={<Login />} />
          <Route  path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/product/:id" element={<ProductPage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
