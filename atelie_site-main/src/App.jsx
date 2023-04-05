import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './index.css';
import HomeScreen from './screens/HomeScreen';
import Login from './components/Login';
import AddPost from './components/AddPost';
import PostScreen from './screens/PostScreen';
import SearchPage from './screens/SearchPage';
import About from './screens/About';
import Contact from './screens/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Floating from './components/buttons/Floating';
import Table from './components/Table';
import AllPosts from './components/AllPosts';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<AddPost />} />
          <Route exact path="/posts/:id" element={<PostScreen />} />
          <Route exact path="/menu" element={<Table />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/search" element={<SearchPage />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
        <Floating />
        <Footer />
      </Router>
    </div>
  );
}

export default App;
