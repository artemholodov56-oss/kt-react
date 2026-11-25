import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./assets/components/Navbar";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import About from "./pages/About"; // Создай этот файл по аналогии с Home
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  );
}

export default App;
