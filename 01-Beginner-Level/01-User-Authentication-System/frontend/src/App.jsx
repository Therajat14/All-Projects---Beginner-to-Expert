import LogIn from "./components/login";
import SignUp from "./components/signup";
import { BrowserRouter, Route, Routes } from "react-router";
import { UserProvider } from "./UserProvider";
function App() {
  return (
    <main className="h-screen w-screen bg-yellow-950 text-stone-100">
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </main>
  );
}

export default App;
