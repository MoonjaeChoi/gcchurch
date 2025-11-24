import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getDepartments } from '@/lib/data';
import { getAllPosts, getAllTags } from '@/lib/posts';
import { Calendar, Users, Tag } from 'lucide-react';

export default function BlogPage() {
  const posts = getAllPosts();
  const departments = getDepartments();
  const tags = getAllTags();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">블로그</h1>
        <p className="text-xl text-muted-foreground">
          과천교회 활동 기록 및 소식
        </p>
      </div>

      {/* Tags */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Tag className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">태그</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => {
          const dept = departments.find(d => d.id === post.department);
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  {dept && (
                    <Badge className="w-fit mb-2" style={{ backgroundColor: dept.color }}>
                      {dept.name}
                    </Badge>
                  )}
                  <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString('ko-KR')}
                    </span>
                    {post.attendees && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {post.attendees}명
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">아직 작성된 포스트가 없습니다.</p>
        </div>
      )}
    </div>
  );
}
