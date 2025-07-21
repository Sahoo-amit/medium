import React, { useState } from "react";
import { AuthStore } from "../../Store/authStore";

const TextEditor = () => {
  const [postData, setPostData] = useState({
    title: "",
    description: "",
    content_pic: null,
  });

  const token = AuthStore((state) => state.token);

  const isFormValid =
    postData.title.trim() &&
    postData.description.trim() &&
    postData.content_pic;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "content_pic") {
      setPostData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setPostData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    console.log(`Button clicked.`);
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("description", postData.description);
      formData.append("content_pic", postData.content_pic);
      console.log(`Inside`);
      console.log(formData);
      const res = await fetch("https://medium-66zd.vercel.app/api/posts/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      console.log(data);
      console.log(res);
    } catch (error) {
      console.error("Failed to submit post:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <header className="flex items-center justify-between py-3">
        <h1 className="font-serif text-3xl font-semibold text-gray-800">
          Medium
        </h1>
        <div className="flex items-center gap-4 font-semibold">
          {/* Moved the Publish button into the form below */}
          <button className="py-2 px-4 bg-gray-700 rounded-full text-white cursor-pointer">
            Profile
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-2xl mt-12">
        <form
          id="postForm"
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
          encType="multipart/form-data"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border px-4 py-2 rounded"
            required
            value={postData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Tell your story..."
            className="border px-4 py-2 h-40 rounded"
            required
            value={postData.description}
            onChange={handleChange}
          />

          <input
            type="file"
            name="content_pic"
            accept="image/*"
            className="border px-2 py-1"
            required
            onChange={handleChange}
          />

          {/* Place the Publish button here, inside the form */}
          <button
            className={`py-2 px-4 rounded-full text-white transition ${
              isFormValid
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!isFormValid}
          >
            Publish
          </button>
        </form>
      </div>

      {postData.content_pic && (
        <div className="mt-4">
          {postData.content_pic.type.startsWith("video/") ? (
            <video controls width="300">
              <source src={URL.createObjectURL(postData.content_pic)} />
            </video>
          ) : (
            <img
              src={URL.createObjectURL(postData.content_pic)}
              alt="Preview"
              className="max-w-xs rounded"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TextEditor;
