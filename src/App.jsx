
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import ArticleDetail from "./pages/ArticleDetail";
import Authors from "./pages/Authors";
import AuthorDetail from "./pages/AuthorDetail";
import Categories from "./pages/Categories";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import "./styles/global.css";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* About */}
        <Route path="/about" element={<About />} />

        {/* Categories */}
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:slug" element={<Categories />} />

        {/* Blog */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<ArticleDetail />} />

        {/* Authors */}
        <Route path="/authors" element={<Authors />} />
        <Route path="/authors/:slug" element={<AuthorDetail />} />

        {/* Tools */}
        <Route path="/tools" element={<Tools />} />

        {/* Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
