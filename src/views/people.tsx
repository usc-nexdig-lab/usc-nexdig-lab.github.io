import { Title } from "components/title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const People = () => {
  const sections = [
    {
      header: "Faculty",
      content: [
        {
          name: "Ibrahim Sabek",
          description: "Assistant Professor, Thomas Lord Department of Computer Science.",
          image: null,
          website: "http://viterbi-web.usc.edu/~sabek/",
        },
      ],
    },
    {
      header: "PhD Students",
      content: [
        {
          name: "Shaolin Xie",
          description: "Fall 2024 -",
          image: null,
          website: null,
        },
        {
          name: "Hanwen Liu",
          description: "Fall 2024 -",
          image: null,
          website: null,
        },
      ],
    },
    {
      header: "Master Students",
      content: [
        {
          name: "Qihan Zhang",
          description: "Fall 2023 -",
          image: null,
          website: null,
        },
      ],
    },
    {
      header: "Undergraduate Students",
      content: [
        {
          name: "Nicolas Lee",
          description: "Fall 2024 -",
          image: null,
          email: "sabek@ucs.edu",
          website: null,
        },
      ],
    },
    {
      header: "Alumni",
      content: [
        {
          name: "Shashank Giridhara",
          description: "Now: Amazon Redshift",
          image: null,
          website: null,
        },
      ],
    },
  ];

  return (
    <div>
      <Title content="People" className="red-title" />
      <div className="space-y-[30px]">
        {sections.map((section, index) => (
          <section key={index} className="space-y-[15px]">
            <h2 className="font-semibold">{section.header}</h2>
            <div className="flex flex-wrap gap-[20px]">
              {section.content.map((person, index) => (
                <div
                  key={index}
                  className="flex w-[300px] space-x-[15px] items-start"
                >
                  <div>
                    {person.image || (
                      <div className="bg-gray-100 w-[90px] h-[90px] pt-[5px] px-[5px] flex rounded">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-300 w-full h-full"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {person.website ? (
                      <h2 className="font-semibold">
                        <a href={person.website} target="_blank" rel="noopener noreferrer" className="clickable-link">
                          {person.name}
                        </a>
                      </h2>
                    ) : (
                      <h2 className="font-semibold">{person.name}</h2>
                    )}
                    <p>{person.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
