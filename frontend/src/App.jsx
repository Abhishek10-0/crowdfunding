// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ProjectProvider } from "./context/ProjectContext";
// import { AuthProvider } from "./context/AuthContext";
// import Nav from "./components/Navbar/Nav";
// import Footer from "./components/Footer/Footer";
// import Home from "./components/Home/Home";
// import CreateProject from "./components/CreateProject/CreateProject";
// import Payment from "./components/Payment/Payment";
// import Categories from "./components/Categories/Categories";
// import About from "./components/About/About";
// import WhyInvestSection from "./components/common/WhyInvestSection";
// import JoinCommunitySection from "./components/common/JoinCommunitySection";
// import "./App.css";
// import SignUp from "./components/Signup/Signup";

// function App() {
//   return (
//     <Router>
//       <AuthProvider>
//         <div className="App">
//           <Nav />
//           <main className="main-content">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/about" element={<About />} />
//               <Route path="/create-project" element={<CreateProject />} />
//               <Route path="/payment" element={<Payment />} />
//               <Route path="/category/:category" element={<Categories />} />
//               <Route path="/Signup" element={<SignUp />} />
//             </Routes>
//           </main>
//           <WhyInvestSection />
//           <JoinCommunitySection />
//           <Footer />
//         </div>
//       </AuthProvider>
//     </Router>
//   );
// }


// export default App;



import React from 'react'
import SignUp from './components/Signup/Signup'

function App() {
  return (
    <>
    <SignUp />
    </>
  )
}

export default App