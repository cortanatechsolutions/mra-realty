import { useEffect, useState } from "react";
import { fetchPageFeed } from "../../utils/fetchPageFeed";
import {
  HeartIcon,
  ShareIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  /**  ArrowUpOnSquareIcon, **/
} from "@heroicons/react/24/outline";
import { formatDistanceToNow, parseISO } from "date-fns";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/** import ShareMenu from "../core/ShareMenu"; **/

// Define your types
interface ImageAttachment {
  media_type: "photo";
  media: {
    image: { src: string };
  };
}

interface VideoAttachment {
  media_type: "video";
  media: {
    video: { source: string };
  };
}

type Attachment = ImageAttachment | VideoAttachment;

interface Post {
  id: string;
  message?: string;
  created_time: string;
  picture?: string;
  full_picture?: string;
  attachments?: { data: Attachment[] };
  reactions?: { summary: { total_count: number } };
  shares?: { count: number };
  comments?: { summary: { total_count: number } };
  videos?: {
    data: {
      source: string;
      description: string;
      thumbnails: { data: { uri: string }[] };
    }[];
  };
}

interface PageFeedData {
  profilePictureUrl: string;
  pageName: string;
  pageUrl: string;
  posts: Post[];
}

const PageProfile: React.FC<{
  profilePictureUrl: string;
  pageName: string;
  pageUrl: string;
  pageCreatedTime: string;
}> = ({ profilePictureUrl, pageName, pageUrl, pageCreatedTime }) => (
  <div className="flex items-center space-x-2">
    <img
      src={profilePictureUrl}
      alt="Page Profile"
      className="w-12 h-12 rounded-full"
    />
    <div>
      <span className="block font-medium text-base text-black dark:text-gray-100">
        {pageName}
      </span>
      <span className="block text-sm text-gray-500 dark:text-gray-400 font-light">
        {formatDistanceToNow(parseISO(pageCreatedTime), {
          addSuffix: true,
        })}
      </span>
    </div>
  </div>
);

const FacebookFeed: React.FC = () => {
  const [data, setData] = useState<PageFeedData | null>(null);
  const [visiblePosts, setVisiblePosts] = useState<Post[]>([]);
  const [visibleCount, setVisibleCount] = useState(3); // Initially show 2 rows (3 columns per row = 6 posts)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPageFeed();
        setData(data);
        setVisiblePosts(data.posts.slice(0, visibleCount));
      } catch (error) {
        console.error("Error fetching page feed:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, [visibleCount]);

  const loadMorePosts = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Load 2 more rows (6 posts) on click
  };

  /** 
  const handleMenuToggle = (postId: string) => {
    setShowMenu((prev) => (prev === postId ? null : postId));
  };

  const handleCloseMenu = () => {
    setShowMenu(null);
  };
  **/

  if (isLoading) {
    return (
      <section
        id="Updates"
        className="relative isolate overflow-hidden py-10 sm:py-20 bg-white dark:bg-gray-900"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="mx-auto max-w-6xl lg:mx-0">
            <h2 className="text-2xl font-semibold text-gray-800">
              Our Latest Announcements
            </h2>
          </div>
          <div className="mx-auto mt-10">
            {/* Responsive Flexbox */}
            <div className="flex flex-wrap gap-4 justify-center z-0">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="relative border rounded-lg shadow-md bg-white dark:bg-gray-800 flex flex-col h-full animate-fadeIn w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1rem)] transform transition-transform duration-300 hover:translate-y-[-5px] z-10"
                  style={{
                    flex: "1 0 calc(33.333% - 1rem)",
                    minWidth: "300px",
                  }}
                >
                  <div className="p-4">
                    <Skeleton circle={true} height={48} width={48} />
                    <div className="mt-2">
                      <Skeleton width={150} />
                      <Skeleton width={100} />
                    </div>
                  </div>
                  <div className="p-4 text-gray-800 dark:text-gray-100">
                    <Skeleton count={3} />
                  </div>
                  <div className="relative">
                    <Skeleton height={180} />
                  </div>
                  <hr className="border-gray-200 dark:border-gray-700" />
                  <div className="p-4 flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <Skeleton circle={true} height={20} width={20} />
                      <Skeleton width={30} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Skeleton circle={true} height={20} width={20} />
                      <Skeleton width={30} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Skeleton circle={true} height={20} width={20} />
                      <Skeleton width={30} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="FacebookFeed"
      className="relative isolate overflow-hidden py-10 sm:py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto text-center">
        <div className="mx-auto max-w-6xl lg:mx-0">
          <h2 className="text-2xl font-semibold text-gray-800">
            Our Latest Announcements
          </h2>
        </div>
        <div className="mx-auto mt-10">
          {/* Responsive Flexbox */}
          <div className="flex flex-wrap gap-4 justify-center z-0">
            {visiblePosts.map((post) => (
              <div
                key={post.id}
                className="relative border rounded-lg shadow-md bg-white dark:bg-gray-800 flex flex-col h-full animate-fadeIn w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1rem)] transform transition-transform duration-300 hover:translate-y-[-5px] z-10"
                style={{ flex: "1 0 calc(33.333% - 1rem)", minWidth: "300px" }}
              >
                {/* First Row: Page Profile and Name */}
                <div className="p-4">
                  <a
                    href={data?.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <PageProfile
                      profilePictureUrl={data?.profilePictureUrl || ""}
                      pageName={data?.pageName || ""}
                      pageUrl={data?.pageUrl || ""}
                      pageCreatedTime={post.created_time}
                    />
                  </a>
                </div>
                <a
                  key={post.id}
                  href={`https://www.facebook.com/${post.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: "1 0 calc(33.333% - 1rem)",
                    minWidth: "300px",
                  }}
                >
                  {/* Second Row: Text */}
                  <div className="p-4 text-gray-800 dark:text-gray-100">
                    {post.message && (
                      <p className="leading-normal break-words">
                        {post.message}
                      </p>
                    )}
                  </div>

                  {/* Third Row: Image/Video Thumbnail */}
                  {post.full_picture && (
                    <div className="relative">
                      <img
                        src={post.full_picture}
                        alt="Post Media"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                  {post.videos?.data?.[0]?.thumbnails?.data?.[0]?.uri && (
                    <div className="relative">
                      <img
                        src={post.videos.data[0].thumbnails.data[0].uri}
                        alt="Video Thumbnail"
                        className="w-full h-auto"
                      />
                    </div>
                  )}
                </a>

                {/* Divider Line */}
                <hr className="border-gray-200 dark:border-gray-700" />

                {/* Fourth Row: Reactions, Shares, Comments, and Share Link */}
                <div className="p-4 flex items-center justify-center gap-8 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <HeartIcon className="h-5 w-5 text-red-500" />
                    <p>{post.reactions?.summary.total_count || 0}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ShareIcon className="h-5 w-5 text-blue-500" />
                    <p>{post.shares?.count || 0}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 text-gray-500" />
                    <p>{post.comments?.summary.total_count || 0}</p>
                  </div>
                  {/** 
                  <button
                    onClick={() => handleMenuToggle(post.id)}
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1"
                  >
                    <ArrowUpOnSquareIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    <span>Share</span>
                  </button>                  
                  {showMenu === post.id && (
                    <ShareMenu
                      postUrl={`https://www.facebook.com/${post.id}`}
                      onClose={handleCloseMenu}
                    />
                  )}**/}
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {visiblePosts.length < data.posts.length && (
            <div className="flex justify-center mt-4">
              <button onClick={loadMorePosts} className="btn btn-primary">
                Show More
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FacebookFeed;
