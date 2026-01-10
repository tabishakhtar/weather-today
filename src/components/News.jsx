import { useEffect, useState } from "react";
import { fetchNews } from "../api/weatherApi";

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews().then((res) => setNews(res.data));
  }, []);

  return (
    <div
      className="
        bg-white/10 backdrop-blur-lg
        border border-white/20
        p-6 rounded-2xl shadow-lg

        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-2xl
        hover:border-white/40
      "
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        Weather News
      </h2>

      <div className="space-y-3">
        {news.map((n, i) => (
          <p
            key={i}
            className="
              text-sm text-slate-200 leading-relaxed
              transition-colors duration-300
              hover:text-white
            "
          >
            • {n.title}
          </p>
        ))}
      </div>
    </div>
  );
}
