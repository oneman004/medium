import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

interface UseBlogResponse {
  loading: boolean;
  blog?: Blog;
  error?: string;
}

interface UseBlogsResponse {
  loading: boolean;
  blogs: Blog[];
  error?: string;
}

export const useBlog = ({ id }: { id: string }): UseBlogResponse => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token not found");
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlog(response.data.post);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || "Error fetching blog");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
    error,
  };
};

export const useBlogs = (): UseBlogsResponse => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token not found");
      setLoading(false);
      return;
    }

    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
      })
      .catch((err) => {
        setError(err.response?.data?.msg || "Error fetching blogs");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
    error,
  };
};
