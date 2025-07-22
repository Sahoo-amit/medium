import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { AuthStore } from "./Store/authStore";
import Dashboard from "./pages/Dashboard";
import Logout from "./components/Dashboard/Logout";
import TextEditor from "./components/Dashboard/TextEditor";
import NotFoundPage from "./pages/404page";

const App = () => {
  const isAuthenticated = AuthStore((state)=>state.isAuthenticated)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Dashboard /> : <Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/write' element={<TextEditor />}/>
          <Route path="/*" element={<NotFoundPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
