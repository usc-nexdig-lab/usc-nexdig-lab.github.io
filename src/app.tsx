import { HashRouter, Routes, Route } from "react-router-dom";

import { Header } from "components/header";
import { Home } from "views/home";
import { People } from "views/people";
import { Research } from "views/research";
import { Publications } from "views/publications";
import { NotFound } from "views/notFound";
import Opportunities from "views/opportunities";
import { ProjectDetails } from "views/projectDetails";

function App() {
  return (
    <HashRouter >
      <Header />
      <div className="px-[30px] pt-[90px] pb-[60px]">
        <div className="max-w-[1200px] w-full mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/people" element={<People />} />
            <Route path="/research" element={<Research />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </div>
      </div>
      <div className="bg-black text-white text-xs py-[5px] px-[30px] fixed bottom-0 w-full">
        Copyright © 2024 NEXDIG
      </div>
    </HashRouter>
  );
}

export default App;
