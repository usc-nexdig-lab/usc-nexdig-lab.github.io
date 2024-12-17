import { Title } from "components/title";

export const Research = () => {
  const sections = [
    {
      header: "Large Language Models (LLMs)",
      content:
        "Our work in LLMs focuses on enhancing their adaptability, accuracy, and efficiency across diverse applications. We explore methods to improve LLM alignment with human intent and optimize their behavior through fine-tuning, reinforcement learning, and multimodal integration. Our research emphasizes the development of models capable of processing and generating contextually relevant and coherent text while minimizing biases and computational inefficiencies.",
      image: "/images/llm.jpg", // Example image path
    },
    {
      header: "Database Optimization",
      content:
        "We design database systems and optimization algorithms tailored for AI-driven applications, focusing on efficiency, scalability, and adaptability. Our research investigates techniques to handle large-scale datasets, enabling seamless integration with LLMs for real-time data retrieval and generation. We explore areas such as adaptive indexing, query optimization, and distributed systems.",
      image: "/images/database.jpg", // Example image path
    },
    {
      header: "Cross-Domain Innovation",
      content:
        "By combining advancements in LLMs and database optimization, we focus on creating systems that can process, analyze, and generate insights from vast and complex datasets. Our goal is to bridge the gap between natural language understanding and data management, ensuring that the next generation of intelligent systems can seamlessly interact with both users and data.",
      image: "/images/cross-domain.jpg", // Example image path
    },
  ];

  return (
    <div className="max-w-[800px] mx-auto p-[20px]">
      <Title content="Research" className="red-title mb-[30px]" />
      <div className="flex flex-col gap-[30px]">
        {sections.map((section, index) => (
          <div
            key={index}
            className="flex items-start border border-gray-200 p-[20px] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex-1">
              <h2 className="font-bold text-2xl mb-[10px]">{section.header}</h2>
              <p className="text-gray-700">{section.content}</p>
            </div>
            {section.image && (
              <div className="w-[150px] h-[150px] ml-[20px]">
                <img
                  src={section.image}
                  alt={section.header}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
