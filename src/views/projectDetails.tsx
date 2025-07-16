import React from "react";
import { useParams } from "react-router-dom";

const projectData: {
  [key: string]: {
    title: string;
    description: string;
    images: string[];
    members: { name: string; image: string }[];
  };
} = {
  limao: {
    title: "Knowledge-preserving Learned Query Optimizers",
    description:
      "In traditional database systems, query optimizers play an important role in ensuring efficient query execution. Recently, learned query optimizers (LQOs) have shown promising improvements over traditional ones. However, most existing LQOs assume a static query environment (or limited dynamic environments), which limits their ability to handle real-world scenarios where queries and workloads change dynamically. This limitation leads to performance degradation over time, as frequent retraining can cause the model to forget previously learned knowledge, a problem known as catastrophic forgetting. In this research, we propose a novel approach to address this issue.",
    images: [], 
    members: [
      { name: "Qihan Zhang", image: "/people_photos/qihan-photo.jpg" },
      { name: "Shaolin Xie", image: "/people_photos/shelly-photo.jpg" },
    ],
  },
  reliable_LQO: {
    title: "Reliable Learned Query Optimizers",
    description:
      "Recently, many learned query optimizers have been proposed. These optimizers can undergo several hours of training and then achieve performance comparable to PostgreSQL, which has been refined over decades by database experts. However, despite their potential, learned query optimizers are rarely adopted in commercial database systems. A major concern stems from the black-box nature of learned components, as well as the potential long-tail effect of execution latency. In this research, we employ methods to address these challenges.",
    images: [], 
    members: [
      { name: "Hanwen Liu", image: "/people_photos/hanwen.jpeg" },
      { name: "Shashank Giridhara", image: "/people_photos/shashank-picture.png" },
    ],
  }, 
};

export const ProjectDetails = () => {
  const { id } = useParams<{ id?: string }>(); // Make `id` optional
  const project = id ? projectData[id] : undefined; // Check if `id` is defined before accessing `projectData`

  if (!project) {
    return <div className="text-center text-red-500">Project not found.</div>;
  }

  return (
    <div className="max-w-[900px] mx-auto p-[20px] flex flex-col gap-[30px]">
      {/* Project Title & Description */}
      <div>
        <h1 className="text-3xl font-bold mb-[20px]">{project.title}</h1>
        <p className="text-gray-700">{project.description}</p>
      </div>

      {/* Project Images */}
      <div className="flex flex-wrap gap-[20px]">
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

      {/* Project Members */}
      <div>
        <h2 className="text-2xl font-semibold mb-[10px]">Project Members</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]">
          {project.members.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-[100px] h-[100px] object-cover rounded-full shadow-md"
              />
              <p className="mt-[10px] text-gray-800 font-medium">{member.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
