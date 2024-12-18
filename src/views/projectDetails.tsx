import React from "react";
import { useParams } from "react-router-dom";

const projectData: {
  [key: string]: { title: string; description: string; images: string[] };
} = {
  llm: {
    title: "Large Language Models (LLMs)",
    description:
      "Detailed information about our research on Large Language Models, focusing on enhancing adaptability, accuracy, and efficiency.",
    images: ["/images/llm1.jpg"], // Example image paths for LLMs
  },
  database: {
    title: "Database Optimization",
    description:
      "Detailed information about our research on database optimization, focusing on efficiency, scalability, and AI-driven applications.",
    images: ["/images/database1.jpg", "/images/database2.jpg"], // Example image paths for Database Optimization
  },
  "cross-domain": {
    title: "Cross-Domain Innovation",
    description:
      "Detailed information about our cross-domain research, integrating LLMs and database optimization for innovative solutions.",
    images: ["/images/cross-domain1.jpg", "/images/cross-domain2.jpg"], // Example image paths for Cross-Domain Innovation
  },
};

export const ProjectDetails = () => {
  const { id } = useParams<{ id?: string }>(); // Make `id` optional
  const project = id ? projectData[id] : undefined; // Check if `id` is defined before accessing `projectData`

  if (!project) {
    return <div className="text-center text-red-500">Project not found.</div>;
  }

  return (
    <div className="max-w-[900px] mx-auto p-[20px] flex items-start gap-[30px]">
      <div className="flex-1">
        <h1 className="text-3xl font-bold mb-[20px]">{project.title}</h1>
        <p className="text-gray-700">{project.description}</p>
      </div>
      <div className="flex flex-col gap-[20px] ml-auto">
        {project.images.map((image, index) => (
          <div key={index} className="w-[300px] h-[200px]">
            <img
              src={image}
              alt={`${project.title} ${index + 1}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
