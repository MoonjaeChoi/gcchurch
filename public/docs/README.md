# 과천교회 문서 폴더

이 폴더는 블로그와 독립적으로 공유할 수 있는 문서들을 저장합니다.

## 접근 URL

- **문서 목록**: https://moonjaechoi.github.io/gcchurch/docs/
- **안수집사회 회칙 비교**: https://moonjaechoi.github.io/gcchurch/docs/deacons-bylaws-comparison.html

## 새 문서 추가 방법

1. HTML 파일을 이 폴더(`public/docs/`)에 추가
2. `index.html` 파일에 링크 추가
3. Git commit 및 push

```bash
# 문서 추가
cp 새문서.html public/docs/

# 커밋
git add public/docs/
git commit -m "Add new document"
git push origin main
```

## 참고사항

- 이 폴더의 파일들은 빌드 시 자동으로 `/docs/` 경로에 배포됩니다
- 블로그의 레이아웃과 네비게이션과 독립적입니다
- 직접 URL로 접근 가능하여 외부 공유가 용이합니다
