import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getDepartments } from '@/lib/data';
import { getAllPosts, getPostBySlug, getPostContent } from '@/lib/posts';
import { Calendar, Users, DollarSign, ArrowLeft, Tag } from 'lucide-react';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const departments = getDepartments();
  const dept = departments.find(d => d.id === post.department);
  const content = await getPostContent(params.slug);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            블로그 목록으로
          </Link>
        </Button>
      </div>

      {/* Header */}
      <article>
        <header className="mb-8">
          {dept && (
            <Badge className="mb-4" style={{ backgroundColor: dept.color }}>
              {dept.name}
            </Badge>
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {post.attendees && (
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                참석: {post.attendees}명
              </span>
            )}
            {post.budget && (
              <span className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                예산: {(post.budget / 10000).toFixed(0)}만원
              </span>
            )}
          </div>

          {post.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Content */}
        <Card>
          <CardContent className="pt-6">
            <div
              className="prose prose-slate max-w-none
                prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-4
                prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-8
                prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-6
                prose-p:mb-4 prose-p:leading-relaxed
                prose-ul:mb-4 prose-ul:list-disc prose-ul:pl-6
                prose-ol:mb-4 prose-ol:list-decimal prose-ol:pl-6
                prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-primary
                prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:my-4
                prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-strong:font-bold
              "
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </CardContent>
        </Card>

        {/* Related Info */}
        {dept && (
          <div className="mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">이 포스트는</p>
                    <p className="font-semibold">{dept.name}</p>
                  </div>
                  <Button asChild variant="outline">
                    <Link href={`/departments/${dept.id}`}>
                      부서 페이지 보기
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </article>
    </div>
  );
}
