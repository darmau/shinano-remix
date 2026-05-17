import { useState } from "react";
import SearchResult from "./SearchResult";
import type { SearchResult as SearchResultType } from "~/types/SearchResult";

interface Labels {
  search_placeholder: string;
  search_button: string;
  loading: string;
  error: string;
  results_heading: string;
  no_results: string;
  answer_heading: string;
}

interface AutoRagResponse {
  response?: string;
  data?: SearchResultType[];
}

interface SearchFormProps {
  labels: Labels;
  endpoint?: string;
}

export default function SearchForm({ labels, endpoint = "/api/search" }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AutoRagResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const formData = new FormData();
      formData.append("query", query);
      const res = await fetch(endpoint, { method: "POST", body: formData });
      const json = (await res.json()) as { results?: AutoRagResponse; error?: string };
      if (json.error) {
        setError(json.error);
      } else {
        setResults(json.results ?? {});
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="mb-4">
          <label
            htmlFor="query"
            className="block text-sm font-medium leading-6 text-gray-900 mb-2"
          >
            {labels.search_placeholder}
          </label>
          <input
            id="query"
            name="query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={labels.search_placeholder}
            required
            disabled={loading}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 disabled:cursor-not-allowed disabled:bg-gray-50 sm:text-sm sm:leading-6"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="flex w-full justify-center rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-violet-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? labels.loading : labels.search_button}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-sm">
            {labels.error}: {error}
          </p>
        </div>
      )}

      {results && (
        <div className="mt-8 space-y-6">
          {results.response && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">
                {labels.answer_heading}
              </h3>
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                {results.response}
              </div>
            </div>
          )}

          {results.data && results.data.length > 0 ? (
            <div>
              <h3 className="font-semibold text-lg text-gray-900 mb-4">
                {labels.results_heading}
              </h3>
              <div className="space-y-4">
                {results.data.map((r) => (
                  <SearchResult key={r.file_id} result={r} />
                ))}
              </div>
            </div>
          ) : (
            results.data && (
              <div className="text-center py-8 text-gray-500">{labels.no_results}</div>
            )
          )}
        </div>
      )}
    </>
  );
}
