import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: 'The Evolution of World Tour Cycling Kits',
      excerpt: 'Exploring how team jerseys have evolved over the decades, from simple designs to high-tech performance gear.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      date: '2024-01-15',
      author: 'The Archive Team',
      category: 'History',
    },
    {
      id: 2,
      title: 'Collecting Cycling Memorabilia: A Beginner\'s Guide',
      excerpt: 'Everything you need to know about starting your collection of authentic cycling kits and equipment.',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop',
      date: '2024-01-10',
      author: 'The Archive Team',
      category: 'Collecting',
    },
    {
      id: 3,
      title: 'Spotlight: Ineos Grenadiers 2024 Collection',
      excerpt: 'A deep dive into the design and technology behind Ineos Grenadiers\' latest team kit.',
      image: 'https://images.unsplash.com/photo-1502744688674-c619d1586c6a?w=800&h=600&fit=crop',
      date: '2024-01-05',
      author: 'The Archive Team',
      category: 'Teams',
    },
    {
      id: 4,
      title: 'Caring for Your Cycling Kit Collection',
      excerpt: 'Expert tips on how to preserve and maintain your cycling memorabilia for years to come.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&h=600&fit=crop',
      date: '2023-12-28',
      author: 'The Archive Team',
      category: 'Care',
    },
    {
      id: 5,
      title: 'The Most Iconic Jerseys in Cycling History',
      excerpt: 'A look back at the most memorable and influential cycling jerseys throughout the sport\'s history.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      date: '2023-12-20',
      author: 'The Archive Team',
      category: 'History',
    },
    {
      id: 6,
      title: 'New Arrivals: January 2024',
      excerpt: 'Discover the latest additions to our archive, including rare finds and current season kits.',
      image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800&h=600&fit=crop',
      date: '2024-01-01',
      author: 'The Archive Team',
      category: 'News',
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-[1920px] mx-auto px-6 lg:px-12 py-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tighter text-black mb-4">
            The Archive Blog
          </h1>
          <p className="text-lg text-black/60 font-light tracking-tight max-w-2xl mb-16">
            Stories, insights, and updates from the world of cycling memorabilia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                <div className="bg-white overflow-hidden">
                  <div className="relative aspect-[4/3] bg-black/5 overflow-hidden mb-6">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-xs font-light tracking-wider uppercase">
                      {post.category}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-black tracking-tight mb-3 group-hover:opacity-70 transition-opacity">
                      {post.title}
                    </h3>
                    <p className="text-sm text-black/60 font-light tracking-tight leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-black/40 font-light tracking-tight mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" strokeWidth={1.5} />
                        <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" strokeWidth={1.5} />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs font-light text-black/60 hover:text-black tracking-wider uppercase group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


