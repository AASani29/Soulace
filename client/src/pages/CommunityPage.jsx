import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Heart,
  Image as ImageIcon,
  PenSquare,
  Send,
  ThumbsUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SideButtons from "../components/SideButtons";

// BlogModal Component
function BlogModal({ blog, isOpen, onClose, onLike, onLove }) {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal Container - Added padding to ensure modal stays within viewport */}
          <div className="fixed inset-0 overflow-y-auto z-50 p-4 sm:p-6 md:p-8">
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-4xl mx-auto bg-white dark:bg-[#2c2c2c] rounded-2xl shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>

              <div className="p-4 sm:p-6 md:p-8 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {/* Media */}
                {blog.media && (
                  <div className="mb-8 rounded-xl overflow-hidden">
                    {blog.media.endsWith(".mp4") ? (
                      <video controls className="w-full rounded-xl">
                        <source src={blog.media} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={blog.media}
                        alt="Blog content"
                        className="w-full max-h-[50vh] object-cover rounded-xl"
                      />
                    )}
                  </div>
                )}

                {/* Content */}
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                  {blog.title}
                </h2>

                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Written by {blog.author}
                </p>

                <div className="prose dark:prose-invert max-w-none mb-8">
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                    {blog.content}
                  </p>
                </div>

                {/* Interaction buttons */}
                <div className="flex gap-4 pt-4 border-t dark:border-gray-700">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onLike}
                    className="flex items-center gap-2 text-gray-500 hover:text-teal-500 transition-colors"
                  >
                    <ThumbsUp className="w-5 h-5" />
                    <span>{blog.likes}</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onLove}
                    className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors"
                  >
                    <Heart className="w-5 h-5" />
                    <span>{blog.loves}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

const CommunityPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    author: "",
    media: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  // Existing fetch blogs useEffect...
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blog");
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        const updatedBlogs = data.blogs.map((blog) => ({
          ...blog,
          likes: blog.likes || 0,
          loves: blog.loves || 0,
        }));
        setBlogs(updatedBlogs);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleLike = (blogId) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((b) =>
        b._id === blogId ? { ...b, likes: b.likes + 1 } : b
      )
    );
    if (selectedBlog?._id === blogId) {
      setSelectedBlog((prev) => ({ ...prev, likes: prev.likes + 1 }));
    }
  };

  const handleLove = (blogId) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((b) =>
        b._id === blogId ? { ...b, loves: b.loves + 1 } : b
      )
    );
    if (selectedBlog?._id === blogId) {
      setSelectedBlog((prev) => ({ ...prev, loves: prev.loves + 1 }));
    }
  };

  // Existing handlers...
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevBlog) => ({ ...prevBlog, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewBlog((prevBlog) => ({ ...prevBlog, media: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newBlog.title);
    formData.append("content", newBlog.content);
    formData.append("author", newBlog.author);
    if (newBlog.media) {
      formData.append("media", newBlog.media);
    }

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create blog");
      }

      const result = await response.json();
      setBlogs((prevBlogs) => [
        { ...result.blog, likes: 0, loves: 0 },
        ...prevBlogs,
      ]);
      setNewBlog({ title: "", content: "", author: "", media: null });
      setMediaPreview(null);
      setShowForm(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-teal-50 dark:bg-[#2c2c2c]">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-lg text-teal-800 dark:text-teal-200 font-medium">
            Loading amazing content...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-700 mb-2">Oops!</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-[#2c2c2c]">
      <SideButtons />
      <div
        id="main-content"
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: isExpanded ? "260px" : "80px" }}
      >
        <Header />

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-teal-600 to-white dark:from-teal-950 dark:to-teal-700 text-white py-16 px-8 rounded-2xl shadow-lg mx-4 mt-6">
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Share Your Story
              <br />
              With The World
            </h1>
            <p className="text-xl text-teal-50 max-w-2xl">
              Join our vibrant community of writers, thinkers, and creators.
              Your voice matters.
            </p>
          </div>
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
            <PenSquare className="w-full h-full" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-6 mt-8 px-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-teal-600 text-white px-8 py-4 rounded-xl shadow-lg hover:bg-teal-500 transition-all duration-300"
          >
            {showForm ? (
              <X className="w-5 h-5" />
            ) : (
              <PenSquare className="w-5 h-5" />
            )}
            {showForm ? "Close Editor" : "Write a Blog"}
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#latest-blogs"
            className="flex items-center gap-2 bg-white text-teal-600 px-8 py-4 rounded-xl shadow-lg hover:bg-teal-50 transition-all duration-300"
          >
            <ChevronDown className="w-5 h-5" />
            Browse Posts
          </motion.a>
        </div>

        {/* Blog Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 px-4"
            >
              <div className="bg-white dark:bg-transparent p-8 rounded-2xl shadow-lg dark:shadow-black dark:border dark:border-teal-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-300 mb-6 flex items-center gap-2">
                  <PenSquare className="w-6 h-6 text-teal-500" />
                  Create Your Blog
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="title"
                      value={newBlog.title}
                      onChange={handleChange}
                      placeholder="Give your blog a catchy title"
                      className="w-full p-4 dark:bg-gray-400 dark:placeholder:text-black border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                      required
                    />
                    <textarea
                      name="content"
                      value={newBlog.content}
                      onChange={handleChange}
                      placeholder="Share your thoughts..."
                      rows="6"
                      className="w-full p-4 dark:bg-gray-400 dark:placeholder:text-black border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                      required
                    ></textarea>
                    <input
                      type="text"
                      name="author"
                      value={newBlog.author}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full p-4 dark:bg-gray-400 dark:placeholder:text-black border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300"
                      required
                    />
                    <div className="relative">
                      <input
                        type="file"
                        name="media"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="media-upload"
                      />
                      <label
                        htmlFor="media-upload"
                        className="flex items-center gap-2 cursor-pointer w-full p-4 border border-gray-200 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-200 transition-all duration-300"
                      >
                        <ImageIcon className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-500">
                          Add media (optional)
                        </span>
                      </label>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl hover:bg-teal-500 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Publish Blog
                  </motion.button>
                </form>
              </div>

              <div className="bg-white dark:bg-teal-700/20 p-8 rounded-2xl shadow-lg dark:shadow-black dark:border dark:border-teal-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Preview
                </h2>
                <div className="prose max-w-none">
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-300 mb-4">
                    {newBlog.title || "Your Title Will Appear Here"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-wrap">
                    {newBlog.content || "Your content will appear here..."}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-200">
                    By {newBlog.author || "Your Name"}
                  </p>
                  {mediaPreview && (
                    <div className="mt-6 rounded-xl overflow-hidden">
                      {mediaPreview.startsWith("data:video") ? (
                        <video controls className="w-full rounded-xl">
                          <source src={mediaPreview} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={mediaPreview}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-xl"
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Posts */}
        <div id="latest-blogs" className="mt-16 px-4 pb-16">
          <h2 className="text-4xl font-bold mb-12 text-gray-800 dark:text-white text-center">
            Latest Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-teal-700/20 rounded-2xl shadow-lg dark:shadow-black overflow-hidden hover:shadow-xl dark:hover:shadow-black transition-all duration-300 dark:border dark:border-teal-700"
              >
                {blog.media && (
                  <div className="aspect-video overflow-hidden">
                    {blog.media.endsWith(".mp4") ? (
                      <video controls className="w-full h-full object-cover">
                        <source src={blog.media} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={blog.media}
                        alt="Blog Media"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                    {blog.content}
                  </p>
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="text-teal-600 dark:text-teal-400 font-medium hover:underline"
                  >
                    Read More
                  </button>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 text-gray-500 hover:text-teal-500 transition-colors"
                        onClick={() => handleLike(blog._id)}
                      >
                        <ThumbsUp className="w-5 h-5" />
                        <span>{blog.likes}</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors"
                        onClick={() => handleLove(blog._id)}
                      >
                        <Heart className="w-5 h-5" />
                        <span>{blog.loves}</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Blog Modal */}
        <BlogModal
          blog={selectedBlog}
          isOpen={!!selectedBlog}
          onClose={() => setSelectedBlog(null)}
          onLike={() => selectedBlog && handleLike(selectedBlog._id)}
          onLove={() => selectedBlog && handleLove(selectedBlog._id)}
        />

        <Footer />
      </div>
    </div>
  );
};

export default CommunityPage;
