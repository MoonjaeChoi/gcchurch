export default function Footer() {
  return (
    <footer className="border-t bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm text-muted-foreground">
          <p className="mb-2">과천교회 사역 기록 블로그</p>
          <p>남선교회협의회 · 안수집사회 · 청년부</p>
          <p className="mt-4 text-xs">
            © {new Date().getFullYear()} 과천교회. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
