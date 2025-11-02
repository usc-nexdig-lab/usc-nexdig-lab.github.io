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
          zoom: 'top',
          zoomLevel: 1, 
        },
      ],
    },
    {
      header: 'PhD Students',
      content: [
        {
          name: 'Shaolin Xie',
          description: 'Fall 2024 - Now',
          image: '/people_photos/shelly-photo.jpg',
          website: 'https://www.linkedin.com/in/shaolin-xie-25577a23b/',
          zoom: '',
          zoomLevel: 0.97, 
        },
        {
          name: 'Hanwen Liu',
          description: 'Fall 2024 - Now',
          image: '/people_photos/hanwen.jpeg',
          website: 'https://www.linkedin.com/in/liu-hanwen/',
          zoom: 'center',
          zoomLevel: 1,
        },
        {
          name: 'Qihan Zhang',
          description: 'Fall 2025 - Now',
          image: '/people_photos/qihan-photo.jpg',
          website: 'https://tsihan.github.io/',
          zoom: 'center',
          zoomLevel: 1.2,
        },
      ],
    },
    {
      header: 'Master Students',
      content: [  
        {
          name: 'Archana Manoj Bhatia',
          description: 'Spring 2025 - Now',
          image: '/people_photos/archana-picture.png',
          website: 'https://www.linkedin.com/in/archanab7/',
        },
        
        {
          name: 'Gaurvi Vishnoi',
          description: 'Spring 2025 - Now',
          image: '/people_photos/gaurvi-picture.jpg',
          website: 'https://www.linkedin.com/in/gaurvi-vishnoi/',
        },
      ],
    },
    {
      header: 'Alumni',
      content: [
        {
          name: 'Abhishek Kumar',
          description: 'Next: SWE at Arista Networks',
          image: '/people_photos/abhishek-picture.png',
          website:'https://uscviterbiclass.slack.com/archives/D08CN9GRQHZ/p1741569127653059',
        },
        {
          name: 'Parinda Ashish Pranami',
          description: 'Next: Software Engineer at Google',
          image: '/people_photos/Parinda-image.jpg',
          website: 'https://www.linkedin.com/in/parindapranami/',
          zoom: 'top',
          zoomLevel: 1.2,
        },
        {
          name: 'Bowen Wang',
          description: 'Next: Software Engineer at Amazon',
          image: '/people_photos/bowen-photo.jpg',
          website: 'https://www.linkedin.com/in/kyriewang',
          zoom: 'center',
          zoomLevel: 1.7,
        },
        {
          name: 'Shashank Giridhara',
          description: 'Next: Amazon Redshift',
          image: '/people_photos/shashank-picture.png',
          website: 'https://www.linkedin.com/in/shashank-giridhara-4175a41a9/',
          zoom:'center',
          zoomLevel: 1,
        },
        {
          name: 'Nicholas Lee',
          description: 'Fall 2024',
          image: '/people_photos/nicholas-picture.jpeg',
          website: 'https://www.linkedin.com/in/nicolas-matthew-lee/',
        },

      ],
    },
  ];

  return (
    <div>
      <Title content="People" className="red-title" />
      <div className="space-y-8">
        {sections.map((section, index) => (
          <section key={index} className="space-y-4">
            <h2 className="font-semibold text-xl">{section.header}</h2>
            <div className={`${section.header === 'Faculty' ? 'flex w-full' : 'flex flex-wrap'} gap-4`}>
              {section.content.map((person, index) => (
                <div key={index} className={`flex items-start ${section.header === 'Faculty' ? 'w-full gap-8' : 'w-80'}`}>
                  <div>
                    {person.image ? (
                      <div className="relative w-32 h-32 overflow-hidden g">
                        <img
                          src={person.image}
                          alt={person.name}
                          className="absolute w-full h-full object-cover transition-transform duration-300"
                          style={{
                            transform: `scale(${person.zoomLevel || 1})`, 
                            objectPosition: person.zoom === 'top' ? '50% 0%' :
                                            person.zoom === 'bottom' ? '50% 100%' :
                                            person.zoom === 'left' ? '0% 50%' :
                                            person.zoom === 'right' ? '100% 50%' :
                                            '50% 50%', 
                          }}
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-100 w-24 h-24 flex items-center justify-center ">
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
