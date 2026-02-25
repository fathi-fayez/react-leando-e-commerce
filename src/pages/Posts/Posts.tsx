import axios from "axios";
import { useQuery } from '@tanstack/react-query'

export default function Posts() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['posts'],
        queryFn: async () => await axios.get('/posts')
    });

    const posts = data?.data?.posts;


    

    if (isLoading) return 'Loading...';
    if (error) return 'Error';
    return (
        <>
            <section className="px-6 py-10 bg-gray-50">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Posts</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">
              {post.title}
            </h3>

            <p className="text-sm text-gray-600 mb-4 line-clamp-3">
              {post.body}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>👍 {post.reactions.likes}</span>
              <span>👀 {post.views}</span>
            </div>
          </div>
        ))}
      </div>
    </section>

        </>
    );
}