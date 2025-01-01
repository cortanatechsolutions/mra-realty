import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { fetchPageFeed } from "../../utils/fetchPageFeed";

interface Post {
  id: string;
  message?: string;
  full_picture?: string;
}

const FacebookFeed: React.FC = () => {
  const [data, setData] = useState<Post[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedData = await fetchPageFeed();
        setData(fetchedData.posts || []);
        setVisiblePosts(fetchedData.posts.slice(0, visibleCount));
      } catch (error) {
        console.error("Error fetching page feed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  useEffect(() => {
    if (data?.length) {
      setVisiblePosts(data.slice(0, visibleCount));
    }
  }, [visibleCount, data]);

  const loadMorePosts = () => {
    setVisibleCount((prevCount) => Math.min(prevCount + 3, data.length));
  };

  if (isLoading) {
    return (
      <section
        id="Updates"
        className="relative isolate overflow-hidden py-10 sm:py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800">
            Our Latest Announcements
          </h2>
          <div className="flex flex-wrap gap-4 justify-center z-0 mt-10">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="relative border rounded-lg shadow-md bg-white dark:bg-gray-800 flex flex-col h-full animate-fadeIn w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1rem)]"
                style={{ flex: "1 0 calc(33.333% - 1rem)", minWidth: "300px" }}
              >
                <Skeleton height={180} />
                <Skeleton count={3} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data.length) {
    return (
      <section
        id="Updates"
        className="relative isolate overflow-hidden py-10 sm:py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-gray-800">
            Our Latest Announcements
          </h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 mt-10">
            Content will be available shortly. Please check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="Updates"
      className="relative isolate overflow-hidden py-10 sm:py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-semibold text-gray-800">
          Our Latest Announcements
        </h2>
        <div className="flex flex-wrap gap-4 justify-center z-0 mt-10">
          {visiblePosts.map((post) => (
            <div
              key={post.id}
              className="relative border rounded-lg shadow-md bg-white dark:bg-gray-800 flex flex-col h-full animate-fadeIn w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1rem)]"
              style={{ flex: "1 0 calc(33.333% - 1rem)", minWidth: "300px" }}
            >
              <a
                href={`https://www.facebook.com/${post.id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {post.full_picture && (
                  <img
                    className="w-full h-[200px] object-cover rounded-t-lg"
                    src={post.full_picture}
                    alt="Post media"
                  />
                )}
                <div className="p-4 text-gray-800 dark:text-gray-100">
                  {post.message && (
                    <p className="leading-normal break-words">{post.message}</p>
                  )}
                </div>
              </a>
            </div>
          ))}
        </div>
        {visiblePosts.length < data.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMorePosts}
              className="btn btn-dark btn-variant mt-8 px-6 py-2"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FacebookFeed;
