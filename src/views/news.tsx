const newsItems = [
  { id: 1, date: 'June 2024', description: 'NexDIG launches a new database system.' },
  { id: 2, date: 'May 2024', description: 'Paper accepted at SIGMOD 2024.' },
  { id: 3, date: 'April 2024', description: 'New team members join NexDIG.' },
  { id: 4, date: 'March 2024', description: 'Webinar on data-intensive systems.' },
  { id: 5, date: 'February 2024', description: 'Research on spatial-temporal embeddings published.' },
];

const News = () => {
  return (
    <section className="news-section">
      <h2 className="news-title">Lab News</h2>
      <ul className="news-list">
        {newsItems.map((news) => (
          <li key={news.id} className="news-item">
            <p className="news-date">{news.date}</p>
            <p className="news-description">{news.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default News;
