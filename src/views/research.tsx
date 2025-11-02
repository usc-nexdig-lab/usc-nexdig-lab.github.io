import { Title } from "components/title";
import { Link } from "react-router-dom";
import NEXDIG_LOGO from 'assets/logo_updated.svg';


export const Research = () => {
  const currentResearch = [
 
    {
      id: "data2insights",
      header: "Data to Insights",
      content:
        "Building LLM-based agent systems that transform raw data into actionable insights efficiently and reliably.",
      image: "/projects_photos/transfrom-data-actionable-insights.jpg",
    },
        {
      id: "quantum_db",
      header: "Quantum Database Systems",
      content:
        "Advancing the integration of quantum computing into data management for next-generation intelligent systems.",
      image: NEXDIG_LOGO,
    },
    {
      id: "secure_db",
      header: "Secure Database Systems",
      content:
        "A study of privacy-preserving query processing in database systems.",
      image: NEXDIG_LOGO,
    },
  ];

  const pastResearch = [
       {
      id: "limao",
      header: "Knowledge-preserving Learned Query Optimizers",
      content:
        "We design continual learning mechanisms for query optimizers to preserve knowledge across evolving workloads.",
      image: NEXDIG_LOGO,
    },
    {
      id: "reliable_LQO",
      header: "Reliable Learned Query Optimizers",
      content:
        "Exploring interpretability and reliability in learned query optimizers for production database systems.",
      image: NEXDIG_LOGO,
    },

  ];

  return (
    <div className="max-w-[1200px] mx-auto p-5">
      <Title content="Research" className="red-title mb-10" />

      {/* CURRENT RESEARCH */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2">
          Current Research
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentResearch.map((section) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white"
            >
              {section.image && (
                <img
                  src={section.image}
                  alt={section.header}
                  className="w-full h-40 object-contain"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  <Link
                    to={`/project/${section.id}`}
                    className="hover:text-red-600 transition-colors"
                  >
                    {section.header}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PAST RESEARCH */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-300 pb-2">
          Past Research
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastResearch.map((section) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden bg-white"
            >
              {section.image && (
                <img
                  src={section.image}
                  alt={section.header}
                  className="w-full h-40 object-contain"
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  <Link
                    to={`/project/${section.id}`}
                    className="hover:text-red-600 transition-colors"
                  >
                    {section.header}
                  </Link>
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
