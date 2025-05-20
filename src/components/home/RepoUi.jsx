// export default function RepoCard(
//   full_name,
//   topics,
//   visibility,
//   description,
//   language,
//   created_at,
//   stargazers_count,
//   updated_at
// ) {
//   const formattedCreatedAt = new Date(created_at).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   const formattedUpdatedAt = new Date(updated_at).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <div className="max-w-xl mx-auto p-4 border rounded-lg shadow-sm bg-white">
//       <div className="flex justify-between items-start">
//         <div>
//           <a
//             href="#"
//             className="text-lg font-semibold text-blue-600 hover:underline"
//           >
//             {full_name}
//           </a>
//           <span className="ml-2 px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded-full text-gray-600">
//             {visibility}
//           </span>
//           <p className="mt-1 text-sm text-gray-600">{description}</p>
//         </div>
//         <button className="flex items-center gap-1 px-2 py-1 border rounded hover:bg-gray-100">
//           ⭐ <span>{stargazers_count}</span>
//         </button>
//       </div>

//       <div className="mt-3 flex flex-wrap gap-2">
//         {topics?.map((tag) => (
//           <span
//             key={tag}
//             className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       <div className="mt-4 flex items-center text-sm text-gray-500 gap-4">
//         <span className="flex items-center">
//           <span className="text-yellow-500 text-lg mr-1">●</span> {language}
//         </span>

//         <span>Updated on {formattedUpdatedAt}</span>
//         <span>Created on {formattedCreatedAt}</span>
//       </div>
//     </div>
//   );
// }
import { Star } from "lucide-react";

const RepoCard = ({
  full_name,
  topics = [],
  visibility,
  description,
  language,
  created_at,
  stargazers_count,
  updated_at,
}) => {
  return (
    <div className="border-2 border-gray-300 rounded-xl shadow p-4 bg-white space-y-3 w-full">
      <div className="flex justify-between items-start">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-base text-blue-500 hover:underline cursor-pointer">
            {full_name}
          </h2>
          <span className="text-xs border rounded-full px-2 py-0.5 text-gray-600 border-gray-400">
            {visibility}
          </span>
        </div>

        <button className="flex items-center gap-1 text-sm text-gray-700 border-2 border-gray-300 not-only:rounded px-2 py-1 hover:bg-gray-100">
          <Star className="w-4 h-4" />
          <span>{stargazers_count}</span>
        </button>
      </div>

      {description && <p className="text-sm text-gray-700">{description}</p>}

      {topics && (
        <div className="flex flex-wrap gap-2">
          {topics.map((topic, i) => (
            <span
              key={i}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
            >
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center text-sm text-gray-600 gap-4 flex-wrap">
        {language && (
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"></span>
            <span>{language}</span>
          </div>
        )}

        <div>Updated on {new Date(updated_at).toLocaleDateString()}</div>
      </div>
    </div>
  );
};

export default RepoCard;
