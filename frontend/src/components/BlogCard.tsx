import { Link } from "react-router-dom";

interface BlogCardTypes {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardTypes) => {
  return ( <Link to={`/blog/${id}`} >
    <div className="flex flex-col border-b border-slate-200 p-4 w-screen max-w-screen-md cursor-pointer">
      <div className="flex ">
        <div className="px-2 flex justify-center">
          {" "}
          <Avatar Name={authorName} />
        </div>
        <div className="px-2 flex flex-col justify-center">{authorName} </div>
        <div className="flex flex-col justify-center px-2">
          <Dot />
        </div>
        <div className="px-2 flex flex-col justify-center text-slate-400">
          {publishedDate}
        </div>
      </div>
      <div className="pl-2 pt-2  flex flex-col">
        <div className="font-bold text-3xl">{title}</div>
        <div className="text-slate-600 font-light text-l pb-6">
          {content.length > 100 ? `${content.slice(0, 100)} ...` : content}
        </div>
        <div className="text-slate-500 font-thin text-sm">
          {Math.ceil(content.length) / 100 > 1
            ? `${Math.ceil(content.length / 100)} mins read`
            : "1 min read"}
        </div>
      </div>
    </div>
    </Link>
  );
};

export const Dot = () => {
  return <div className="h-1 w-1 rounded-full bg-slate-500 "></div>;
};

export const Avatar = ({
  Name,
  size = "small",
}: {
  Name: string;
  size?: "small" | "big";
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`text-xl font-medium text-gray-600 dark:text-gray-300 ${
          size === "small" ? "text-xs" : "text-md"
        }`}
      >
        {Name[0]}
      </span>
    </div>
  );
};
