import { Title } from "components/title";
import { Link } from "react-router-dom";

export const Research = () => {
  const sections = [
    {
      id: "limao",
      header: "Knowledge-preserving Learned Query Optimizers",
      content: "",
      image: "",
    },
    {
      id: "reliable_LQO",
      header: "Reliable Learned Query Optimizers",
      content: "",
      image: "",
    },
    
  ];

  return (
    <div className="max-w-[800px] mx-auto p-[20px]">
      <Title content="Research" className="red-title mb-[30px]" />
      <div className="flex flex-col gap-[30px]">
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex items-start border border-gray-200 p-[20px] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex-1">
              <h2 className="font-bold text-2xl mb-[10px]">
                <Link to={`/project/${section.id}`} className="research-header-link">
                  {section.header}
                </Link>
              </h2>
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
