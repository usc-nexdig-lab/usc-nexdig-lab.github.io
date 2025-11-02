const newsItems = [
  {
    id: 1,
    date: 'April 15 2025',
    description:
      'Hanwen and Shashank\'s paper <a href="https://www.arxiv.org/abs/2505.02284" target="_blank" rel="noopener noreferrer" style="color:#990000; font-weight:600; text-decoration:underline;">Conformal Prediction for Verifiable Learned Query Optimization</a> is accepted to VLDB\'25!',
  },
  {
    id: 2,
    date: 'June 25 2025',
    description:
      'Qihan and Shaolin\'s paper <a href="https://arxiv.org/abs/2507.00188" target="_blank" rel="noopener noreferrer" style="color:#990000; font-weight:600; text-decoration:underline;">LIMAO: A Framework for Lifelong Modular Learned Query Optimization</a> is accepted to VLDB\'25!',
  },
  {
    id: 3,
    date: 'July 15 2025',
    description:
      'Bowen Wang is joining Amazon as a full-time software engineer after graduation. Congratulations Bowen!',
  },
  {
    id: 4,
    date: 'September 27 2025',
    description:
      'Shaolin\'s paper <a href="https://dl.acm.org/doi/10.1145/3764915.3770722" target="_blank" rel="noopener noreferrer" style="color:#990000; font-weight:600; text-decoration:underline;">Intrinsic Geospatial Topological Reasoning in LLMs</a> is accepted to 2025 SIGSPATIAL GeoGenAgent workshop!',
  },
];

const parseDate = (dateStr: string): number => {
  return new Date(dateStr).getTime();
};

const News = () => {
  const sortedNews = [...newsItems].sort((a, b) => parseDate(b.date) - parseDate(a.date));

  return (
    <section className="news-section">
      <h2 className="news-title">News</h2>
      <ul className="news-list">
        {sortedNews.map((news) => (
          <li key={news.id} className="news-item">
            <p className="news-date">{news.date}</p>
            <p
              className="news-description"
              dangerouslySetInnerHTML={{ __html: news.description }}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default News;
