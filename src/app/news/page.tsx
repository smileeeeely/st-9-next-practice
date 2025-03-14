interface News {
  id: string;
  title: string;
  content: string;
  author: string;
  category: string;
  createdAt: number;
}
const page = async () => {
  const res = await fetch("http://localhost:4000/news", {
    next: { revalidate: 50 },
  });
  const news: News[] = await res.json();
  return (
    <div className="news-container">
      <h2 className="news-header">최신 기술 뉴스</h2>
      <div className="description-text">
        <p>
          ISR 페이지는 빌드 시점에 데이터를 미리 가져와서 캐싱 후, 사용자 요청
          시 캐싱해둔 데이터로 페이지를 렌더링하는 방식입니다. 유효시간이 지나면
          서버에서 데이터를 다시 가져와서 페이지를 재생성합니다.
        </p>
        <p>
          실시간 업데이트가 중요하지 않은 경우, 서버 비용을 절감할 수 있고,
          빠르게 사용자에게 페이지를 제공할 수 있습니다.
        </p>
      </div>
      <div className="news-list">
        {news.map((newsItem) => (
          <article key={newsItem.id} className="news-card">
            <div className="news-content">
              <h3 className="news-title">{newsItem.title}</h3>
              <p className="news-text">{newsItem.content}</p>
            </div>
            <div className="news-meta">
              <span className="meta-item">
                <i className="fas fa-user"></i>
                작성자: {newsItem.author}
              </span>
              <span className="meta-item">
                <i className="fas fa-folder"></i>
                카테고리: {newsItem.category}
              </span>
              <span className="meta-item">
                <i className="fas fa-calendar"></i>
                작성일: {new Date(newsItem.createdAt).toLocaleDateString()}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default page;
