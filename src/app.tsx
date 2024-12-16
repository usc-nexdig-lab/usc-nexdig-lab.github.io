import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "components/header";
import { Home } from "views/home";
import { People } from "views/people";
import { Research } from "views/research";
import { Publications } from "views/publications";
import { NotFound } from "views/notFound";
import Opportunities from "views/opportunities";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="px-[30px] pt-[90px] pb-[60px] flex flex-col items-center">
        <div className="max-w-[900px] w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people" element={<People />} />
            <Route path="/research" element={<Research />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/opportunities" element={<Opportunities />} />
          </Routes>
        </div>
      </div>

      <div className="bg-black text-white text-xs py-[5px] px-[30px] fixed bottom-0 w-full">
        Copyright © 2024 NEXDIG
      </div>
    </BrowserRouter>
  );
}

export default App;
