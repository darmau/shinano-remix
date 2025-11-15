import type { SearchResult } from "~/types/SearchResult";
import { decodeRFC2047 } from "~/utils/decodeRFC2047";

export default function SearchResult({ result }: { result: SearchResult }) {
  const decodedTitle = result.attributes?.file?.title 
    ? decodeRFC2047(result.attributes.file.title)
    : '';
  const decodedDescription = result.attributes?.file?.description
    ? decodeRFC2047(result.attributes.file.description)
    : '';

  return (
    <div
      key={result.file_id}
      className="flex justify-between gap-4 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <div className="">
        <a href={result.filename} target="_blank" rel="noopener noreferrer">
          <h4 className="text-lg font-medium text-violet-900">
            {decodedTitle}
          </h4>
        </a>
        <p className="text-sm text-gray-600 mt-1">
          {decodedDescription}
        </p>
      </div>

      {result.attributes?.file?.image && (
        <img 
          src={result.attributes.file.image} 
          alt={decodedTitle || result.filename}
          className="rounded w-40 h-40 object-cover"
        />
      )}
    </div>
  )
}