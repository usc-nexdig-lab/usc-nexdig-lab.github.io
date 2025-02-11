import { Title } from 'components/title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const People = () => {
  const sections = [
    {
      header: 'Faculty',
      content: [
        {
          name: 'Ibrahim Sabek',
          description:
            'Assistant Professor, Thomas Lord Department of Computer Science.',
          image: '/people_photos/ibrahimsabek-photo.jpg',
          website: 'http://viterbi-web.usc.edu/~sabek/',
        },
      ],
    },
    {
      header: 'PhD Students',
      content: [
        {
          name: 'Shaolin Xie',
          description: 'Fall 2024 -',
          image: null,
          website: null,
        },
        {
          name: 'Hanwen Liu',
          description: 'Fall 2024 -',
          image: null,
          website: null,
        },
      ],
    },
    {
      header: 'Master Students',
      content: [
        {
          name: 'Qihan Zhang',
          description: 'Fall 2023 -',
          image: null,
          website: null,
        },
      ],
    },
    {
      header: 'Undergraduate Students',
      content: [
        {
          name: 'Nicolas Lee',
          description: 'Fall 2024 -',
          image: null,
          website: null,
        },
      ],
    },
    {
      header: 'Alumni',
      content: [
        {
          name: 'Shashank Giridhara',
          description: 'Now: Amazon Redshift',
          image: null,
          website: null,
        },
      ],
    },
  ];

  return (
    <div>
      <Title content="People" className="red-title" />
      <div className="space-y-8 ">
        {sections.map((section, index) => (
          <section key={index} className="space-y-4">
            <h2 className="font-semibold text-xl">{section.header}</h2>
            <div
              className={`${
                section.header === 'Faculty' ? 'flex w-full' : 'flex flex-wrap'
              } gap-4 `}
            >
              {section.content.map((person, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    section.header === 'Faculty' ? 'w-full gap-8' : 'w-80'
                  }`}
                >
                  <div>
                    {person.image ? (
                      <div
                        className={`flex-shrink-0 ${
                          section.header === 'Faculty' ? 'w-64' : 'w-48'
                        }`}
                      >
                        <img
                          src={person.image}
                          alt={person.name}
                          className="w-full object-cover rounded-lg" // Removed fixed height to maintain aspect ratio
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-100 w-24 h-24 flex items-center justify-center rounded">
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-gray-300 w-12 h-12"
                        />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    {person.website ? (
                      <h2 className="font-semibold text-lg">
                        <a
                          href={person.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-700 hover:underline"
                        >
                          {person.name}
                        </a>
                      </h2>
                    ) : (
                      <h2 className="font-semibold text-lg">{person.name}</h2>
                    )}
                    <p className="mt-2 text-gray-700">{person.description}</p>
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
