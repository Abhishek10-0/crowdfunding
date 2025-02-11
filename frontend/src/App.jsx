import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Assuming AuthProvider is correctly set up
import Nav from "./components/Navbar/Nav";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import CreateProject from "./components/CreateProject/CreateProject";
import Payment from "./components/Payment/Payment";
import Categories from "./components/Categories/Categories";
import About from "./components/About/About";
import WhyInvestSection from "./components/common/WhyInvestSection";
import JoinCommunitySection from "./components/common/JoinCommunitySection";
import "./App.css";
import SignUp from "./components/Signup/Signup"; 
import SignIn from "./components/SignIn/SignIn";


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Nav />
          <main className="main-content">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              
              <Route path="/payment" element={<Payment />} />
              <Route path="/category/:category" element={<Categories />} />
              <Route path="/signup" element={<SignUp />} /> 
              <Route path="/signin" element={<SignIn />} /> 
              <Route path="/create-project" element={<CreateProject />} /> 
            </Routes>
          </main>
          <WhyInvestSection />
          <JoinCommunitySection />
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
