import React from 'react';
import { Heart } from 'lucide-react';
import { SocialPost } from '../types';

interface SocialFeedProps {
  posts: SocialPost[];
}

const SocialFeed: React.FC<SocialFeedProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <div key={post.docId || post.date} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
          <div className="h-60 overflow-hidden">
            <img
              src={post.image}
              alt="Social media post"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-gray-700 text-sm mb-3 line-clamp-3">{post.caption}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <div className="flex items-center text-red-500">
                <Heart size={14} className="mr-1" />
                <span className="text-xs">{post.likes}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialFeed;