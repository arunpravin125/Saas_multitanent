import { Toaster } from "react-hot-toast";
import ACRForm from "./pages/ACRForm";

// import Login from './pages/login/Login';
// import {Routes,Route, Navigate, Link} from "react-router-dom"
// import { useAuthContext } from './context/AuthContext';
// import HomePage from './components/HomePage';
// import SignUp from './pages/signup/SignUp';
// import SuggestedUsers from './components/suggested/SuggestedUsers';
// import Notification from "./components/Notification/Notification"
function App() {
  // const { authUser } = useAuthContext();
  return (
    <div className="flex justify-evenly">
      {/* <Link to="/" >Home</Link>
       
        <Link  to="/notification" >Notification</Link>
       
        
      </div>
      <Routes>
      
        <Route path="/" element={authUser?<HomePage/>:<Login/>} ></Route>
        <Route path="/sign" element={authUser?<Navigate to="/" />:<SignUp/>} ></Route>
        <Route path="/login" element={authUser?<Navigate to="/" />:<Login/>} ></Route>
        <Route path="/suggest" element={<SuggestedUsers/>} ></Route>
        <Route path="/notification" element={<Notification/>} ></Route>
      </Routes> */}
      <ACRForm />

      <Toaster />
    </div>
  );
}

export default App;
