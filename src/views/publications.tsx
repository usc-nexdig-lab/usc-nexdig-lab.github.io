import { Title } from "components/title";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export const Publications = () => {
  const publications = [
    {
      title: "Research Paper Title",
      authors: "First Author, Second Author, Third Author",
      source: "Journal Name",
      link: "example_link",
    },
  ];
  return (
    <div>
      <Title content="Publications" />
      <div>
        {publications.map((publication, index) => (
          <div key={index} className="space-y-[5px]">
            <div>
              <h2 className="font-semibold">{publication.title}</h2>
              <p>{publication.authors}</p>
              <p className="italic">{publication.source}</p>
            </div>
            <div>
              <Link
                to={publication.link}
                className="border rounded p-[5px] bg-gray-100 font-semibold hover:bg-gray-200"
              >
                <FontAwesomeIcon
                  icon={faBook}
                  className="mr-[5px] text-gray-500"
                />
                PDF
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
