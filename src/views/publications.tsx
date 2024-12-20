import { Title } from "components/title";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";

export const Publications = () => {
  const publications = [
    {
      title: "From Logs to Causal Inference: Diagnosing Large Systems",
      authors: (
        <>
          M. Markakis, B. Youngmann, T. Gao, Z. Zhang, R. Shahout, P. B. Chen, C. Liu, <b>I. Sabek</b>, and M. Cafarella
        </>
      ),
      source: "International Conference on Very Large Data Bases (VLDB), 2025",
      link: "https://viterbi-web.usc.edu/~sabek/pdf/25_paper_logos.pdf",
    },
    {
      title: "Optimizing Video Selection LIMIT Queries With Commonsense Knowledge",
      authors: (
        <>
          Wenjia He, <b>Ibrahim Sabek</b>, Yuze Lou, and Michael Cafarella
        </>
      ),
      source: "International Conference on Very Large Data Bases (VLDB), 2024",
      link: "https://viterbi-web.usc.edu/~sabek/pdf/24_paper_paine.pdf",
    },
  ];
  return (
    <div>
      <Title content="Publications" className="red-title"/>
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
