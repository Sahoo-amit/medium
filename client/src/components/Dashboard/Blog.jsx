import React, { useEffect, useState } from "react";
import { AuthStore } from "../../Store/authStore";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const token = AuthStore((state)=>state.token)

  const getBlog = async () => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/posts/getall?_limit=6&_page=${page}`,{
          method:"GET",
          headers:{
            "Authorization":`Bearer ${token}`
          }
        });
      const data = await res.json();
      console.log(data)
      setBlogs([...blogs, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClap = async (postId, index) => {
    console.log('postid', postId)
    console.log('index', index)
    console.log('Pre-clap')
    try {
      const res = await fetch(
        `http://localhost:4000/api/posts/clap/${postId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      const updatedBlogs = [...blogs];
      updatedBlogs[index].claps = data.clapsCount;
      setBlogs(updatedBlogs);
      console.log('clapped')
    } catch (err) {
      console.error(err);
    }
  };

  const windowScroll = () => {
    const totalHeight = document.documentElement.scrollHeight;
    const viewHeight = window.innerHeight;
    const scrollFromTop = document.documentElement.scrollTop;

    if (viewHeight + Math.ceil(scrollFromTop) >= totalHeight) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", windowScroll);
    return () => window.removeEventListener("scroll", windowScroll);
  }, []);

  useEffect(() => {
    getBlog();
  }, [page]);

  return (
    <div className="mx-auto max-w-xl flex flex-col gap-10 my-10 pt-10">
      {blogs.map((item, index) => {
        const {
          _id,
          title,
          author,
          profile_pic,
          date,
          views,
          claps,
          category,
          content_pic,
          description,
        } = item;

        return (
          <div key={_id || index}>
            <div className="flex items-center gap-3">
              <img
                src={profile_pic}
                alt={author}
                className="w-8 h-8 rounded-full"
              />
              <p className="text-sm">{author}</p>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-gray-600">{description}</p>
              <div>
                <img
                  src={content_pic}
                  alt=""
                  className="w-full rounded-lg mt-2"
                />
              </div>
              <div className="flex items-center gap-6 mt-3 text-sm text-gray-500">
                <p>{new Date(date).toLocaleDateString()}</p>
                <p>👁️ {views}</p>
                <p>👏 {claps}</p>
              </div>
              <button
                onClick={() => handleClap(_id, index)}
                className="mt-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                👏 Clap
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Blog;
