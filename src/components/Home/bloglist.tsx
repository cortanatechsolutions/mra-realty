import React, { useState, useEffect } from "react";
import axios from "axios";

interface Post {
  id: string;
  title: string;
  href: string;
  description: string;
  date: string;
  datetime: string;
  category: {
    title: string;
    href: string;
  };
  author: {
    name: string;
    role: string;
    href: string;
    imageUrl: string;
  };
}

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace with your Contentful API keys and space ID
        const response = await axios.get(
          `https://cdn.contentful.com/spaces/ep34px3lef3m/environments/master/entries?content_type=pageBlogPost&access_token=hZT9kUXUZmg_0Ur54wYHZLniPuAoIrL7g2I_gkW48sI&order=-fields.publishedDate&limit=3`
        );

        // Extract relevant data from Contentful response
        const fetchedPosts = response.data.items.map((item: any) => ({
          id: item.sys.id,
          title: item.fields.title,
          href: `https://blog.cortanatechsolutions.com/${item.fields.slug}`, // Example URL, adjust as needed
          description: item.fields.shortDescription || "", // Adjust for actual field name
          date: new Date(item.fields.publishedDate).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            }
          ),
          datetime: new Date(item.fields.publishedDate).toISOString(),
          category: {
            title: item.fields.category?.title || "", // Adjust for actual field name
            href: "#", // Example URL, adjust as needed
          },
          author: {
            name: item.fields.author?.name || "", // Adjust for actual field name
            role: item.fields.author?.role || "", // Adjust for actual field name
            href: "#", // Example URL, adjust as needed
            imageUrl: item.fields.author?.imageUrl || "", // Adjust for actual field name
          },
        }));

        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section
      id="Blog"
      className="relative isolate overflow-hidden py-24 sm:py-32"
    >
      <img
        alt=""
        src={`/images/blog.jpg`}
        className="absolute inset-0 -z-10 h-full w-full object-cover md:object-center"
      />
      <div className="absolute inset-0 bg-theme-blue opacity-80 -z-10"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-5xl font-bold tracking-tight text-white">
            From the blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">
            Learn how to grow your business with our expert advice.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
              </div>
              <div className="group relative group-hover:text-blue-600">
                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900">
                  <p className="font-heading">{post.title}</p>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                  {post.description}
                </p>
                <div className="mt-10">
                  <a
                    href={post.href}
                    className="transition text-theme-royalBlue font-semibold hover:text-blue-500 hover:text-blue-400"
                  >
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="https://blog.cortanatechsolutions.com"
            className="btn btn-light"
          >
            Want to see more?
          </a>
          <a
            href="https://blog.cortanatechsolutions.com"
            className="btn btn-transparent btn-primary"
          >
            Go here
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogList;
