import { Title } from "components/title";

export const Publications = () => {
  const publications = [
    {
      title: "SEFRQO: A Self-Evolving Fine-Tuned RAG-Based Query Optimizer",
      authors: (
        <>
          <b>Hanwen Liu*</b>, <b>Qihan Zhang*</b>, Ryan Marcus, <b>Ibrahim Sabek</b>
        </>
      ),
      source: "International Conference on Management of Data (SIGMOD), 2026",
      links: [
        { label: "Paper", url: "https://arxiv.org/abs/2508.17556" },
      ],
      note: "* Equal contribution",
    },
    {
      title: "SERAG: Self-Evolving RAG System for Query Optimization",
      authors: (
        <>
          <b>Hanwen Liu*</b>, <b>Qihan Zhang*</b>, Ryan Marcus, <b>Ibrahim Sabek</b>
        </>
      ),
      source: "Workshop on Applied AI for Database Systems and Applications (aiDM@SIGMOD), 2025",
      links: [
        { label: "Paper", url: "https://viterbi-web.usc.edu/~sabek/pdf/25_workshop_serag.pdf" },
      ],
      note: "* Equal contribution",
    },
    {
      title: "Intrinsic Geospatial Topological Reasoning in LLMs",
      authors: (
        <>
          <b>Shaolin Xie</b>, Shang-ling Hsu, <b>Qihan Zhang</b>, Yiming Gao, Cyrus Shahabi, <b>Ibrahim Sabek</b>
        </>
      ),
      source: "Workshop on Generative and Agentic AI for Multi-Modality Space-Time Intelligence (GeoGenAgent@SIGSPATIAL), 2025",
      links: [
        { label: "Paper", url: "https://dl.acm.org/doi/10.1145/3764915.3770722" },
        { label: "Code", url: "https://github.com/shaolin-x/topology_reasoning_queries" },
      ],
    },
    {
      title: "LIMAO: A Framework for Lifelong Modular Learned Query Optimization",
      authors: (
        <>
          <b>Qihan Zhang</b>, <b>Shaolin Xie</b>, <b>Ibrahim Sabek</b>
        </>
      ),
      source: "International Conference on Very Large Data Bases (VLDB), 2025",
      links: [
        { label: "Paper", url: "https://arxiv.org/abs/2507.00188" },
      ],
    },
    {
      title: "From Logs to Causal Inference: Diagnosing Large Systems",
      authors: (
        <>
          M. Markakis, B. Youngmann, T. Gao, Z. Zhang, R. Shahout, P. B. Chen, C. Liu, <b>I. Sabek</b>, and M. Cafarella
        </>
      ),
      source: "International Conference on Very Large Data Bases (VLDB), 2025",
      links: [
        { label: "Paper", url: "https://viterbi-web.usc.edu/~sabek/pdf/25_paper_logos.pdf" },
      ],
    },
    {
      title: "Conformal Prediction for Verifiable Learned Query Optimization",
      authors: (
        <>
          <b>Hanwen Liu</b>, <b>Shashank Giridhara</b>, <b>Ibrahim Sabek</b>
        </>
      ),
      source: "International Conference on Very Large Data Bases (VLDB), 2024",
      links: [
        { label: "Paper", url: "https://www.arxiv.org/abs/2505.02284" },
      ],
    },
    
    {
      title: "Optimizing Video Selection LIMIT Queries With Commonsense Knowledge",
      authors: (
        <>
          Wenjia He, <b>Ibrahim Sabek</b>, Yuze Lou, and Michael Cafarella
        </>
      ),
      source: "International Conference on Very Large Data Bases (VLDB), 2024",
      links: [
        { label: "Paper", url: "https://viterbi-web.usc.edu/~sabek/pdf/24_paper_paine.pdf" },
      ],
    },

  ];

  return (
    <div className="max-w-3xl mx-auto">
      <Title content="Publications" className="red-title mb-6" />
      <div className="space-y-5">
        {publications.map((publication, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-3 space-y-1.5"
          >
            <h2 className="font-medium text-base leading-snug">
              {publication.title}
            </h2>
            <p className="text-sm text-gray-800">{publication.authors}</p>
            <p className="italic text-gray-500 text-sm">
              {publication.source}
            </p>
            {publication.note && (
              <p className="text-xs text-gray-500 italic">
                {publication.note}
              </p>
            )}

            <div className="text-sm text-gray-600 mt-1 space-x-2">
              {publication.links.map((linkObj, i) => (
                <a
                  key={i}
                  href={linkObj.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-blue-600"
                >
                  [{linkObj.label}]
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
