import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import styles from "./BlogCard.module.scss";

const BlogCard = ({ blog }) => {
  return (
    <div className={styles.blogCardContainer}>
      <h1>
        <Link href={`/blog/${blog.slug}`}>
          <a>{blog.title}</a>
        </Link>
      </h1>
      {blog.author && (
        <Link href={`/profile/${blog.author.username}`}>
          <a>
            {blog.author.photo && (
              <Image src={blog.author.photo} alt={""} height={20} width={20} />
            )}
            <p>{blog.author.username}</p>
          </a>
        </Link>
      )}
      <section>
        <span>Created {moment(blog.createdAt).fromNow()}</span>
        <span>Updated {moment(blog.updatedAt).fromNow()}</span>
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
      <section>
        <p>{blog.views} views</p>
        <p>{blog.likes.length} likes</p>
      </section>
    </div>
  );
};

export default BlogCard;
