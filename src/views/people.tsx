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
          description:
            "Ibrahim Sabek is an Assistant Professor in the Thomas Lord Department of Computer Science, and by courtesy, in the Dornsife Spatial Sciences Institute at University of Southern California. Before that, he was a Postdoctoral Associate at the MIT Data Systems Group and an NSF/CRA Computing Innovation Fellow. ",
          image: null,
        },
      ],
    },
    {
      header: "PhD Students",
      content: [
        {
          name: "Hanwen Liu",
          description: null,
          image: null,
        },
        {
          name: "Qihan Zhang",
          description: null,
          image: null,
        },
        {
          name: "Shaolin Xie",
          description: null,
          image: null,
        },
        {
          name: "Shashank Giridhara",
          description: null,
          image: null,
        },
      ],
    },
    {
      header: "Undergraduate Students",
      content: [
        {
          name: "Nicolas Lee",
          description:
            "Nicolas is an undergraduate student in Applied and Computational Mathematics.",
          image: null,
        },
      ],
    },
  ];

  return (
    <div>
      <Title content="People" />
      <div className="space-y-[30px]">
        {sections.map((section, index) => (
          <section key={index} className="space-y-[15px]">
            <h2 className="font-semibold">{section.header}</h2>
            <div className="space-y-[15px]">
              {section.content.map((person, index) => (
                <div
                  key={index}
                  className="flex overflow-hidden space-x-[15px]"
                >
                  <div className="">
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
                    <h2 className="font-semibold">{person.name}</h2>
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
