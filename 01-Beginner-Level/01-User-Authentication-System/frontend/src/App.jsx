import LogIn from "./components/login";
import SignUp from "./components/signup";
import { BrowserRouter, Route, Routes } from "react-router";
import { UserProvider } from "./UserProvider";
import Dashboard from "./dashboard";

function App() {
  return (
    <main className="h-screen w-screen bg-yellow-950 text-stone-100">
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/login" element={<LogIn />} />
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </main>
  );
}

export default App;
