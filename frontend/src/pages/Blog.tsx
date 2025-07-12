import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Appbar } from "../components/Appbar";

import { FullBlog } from "../components/FullBlog";
import EachBlogSkeleton from "../components/EachBlogSkeleton";


export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({ id: id || "" });

  if (loading || !blog) {
    return (
      <div>
        <Appbar />

        <EachBlogSkeleton />
      </div>
    );
  }

  return <FullBlog blog={blog} />;
};
