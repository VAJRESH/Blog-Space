import styles from "./BlogCard.module.scss";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  return (
    <div className={styles.blogCardContainer}>
      <h1>
        <Link href={blog.slug}>
          <a>{blog.title}</a>
        </Link>
      </h1>
      <Link href={`/profile/${blog.author.username}`}>
        <a>
          {blog.author.photo && (
            <Image src={blog.author.photo} alt={""} height={20} width={20} />
          )}
          <p>{blog.author.username}</p>
        </a>
      </Link>
      <section>
        <span>Created {moment(blog.createdAt).fromNow()}</span>
        <span>Updated {moment(blog.updatedAt).fromNow()}</span>
      </section>
      <section>
        {blog.tags.map((tag) => {
          return <span key={tag._id}>{tag.name}</span>;
        })}
      </section>
      <section>
        <p>{blog.views}</p>
        <p>{blog.likes.length}</p>
      </section>
    </div>
  );
};

export default BlogCard;
