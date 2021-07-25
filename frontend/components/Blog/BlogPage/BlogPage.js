import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import "quill/dist/quill.snow.css";
import React from "react";
import { formattedDate } from "../../../helpers/util.functions";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const BlogPage = ({ blog, handleLikes }) => {
  return (
    <div>
      <h1>{blog.title}</h1>

      <section>
        {blog.author && (
          <Link href={`/profile/${blog.author.username}`}>
            <a>
              {blog.author.photo && (
                <Image
                  src={blog.author.photo}
                  alt={""}
                  height={20}
                  width={20}
                />
              )}
              <span>{blog.author.username}</span>
            </a>
          </Link>
        )}
      </section>

      <section>
        {blog.createdAt === blog.updatedAt
          ? `Created on ${formattedDate(blog.createdAt)}`
          : `Updated on ${formattedDate(blog.createdAt)}`}
      </section>

      <section>
        {blog.tags.map((tag) => {
          return (
            <Link key={tag._id} href={`/tag/${tag.slug}`}>
              <a>{tag.name}</a>
            </Link>
          );
        })}
      </section>

      <ReactQuill value={blog.body} readOnly={true} theme={"bubble"} />

      <section>
        <p>{blog.views} views</p>
        <p>
          {blog.likes.length} <button onClick={handleLikes}>Likes</button>
        </p>
      </section>
    </div>
  );
};

export default BlogPage;
