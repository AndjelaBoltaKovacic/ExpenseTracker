import { useEffect, useRef, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import BlogService from '../../../services/blog.service';
import Loader from '../../../common/loader';
import NoticeCard from '../../../common/notice-card';
import { BlogDTO, Article } from '../../../models/blog';
import BlogCard from '../../../common/blog-card';
import { Box } from '@mui/material';
import { MOCK_ARTICLES } from '../../../services/mocks/blogs';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

function Blog() {
  const [page, setPage] = useState<number>(0);
  const [blogs, setBlogs] = useState<Article[]>([] as Article[]);
  const { data, error, loading, fetchData } = useFetch<BlogDTO>(BlogService.getBlogs, `?page=${page}&size=10`);

  const sentinelRef = useInfiniteScroll(() => setPage((prev) => prev + 10));
  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    data && setBlogs((prevData) => [...prevData, ...data.data]);
  }, [data]);

  return (
    <Box mt={5}>
      <Loader isLoading={loading}>
        {error ? (
          <NoticeCard title="Opps! Something went wrong!" text="Sorry for the inconvenience. Please try again later." />
        ) : (
          <>
            {[...MOCK_ARTICLES, ...blogs].map((blog, i) => (
              <BlogCard blog={blog} key={i} />
            ))}
            <div ref={sentinelRef} />
          </>
        )}
      </Loader>
    </Box>
  );
}

export default Blog;
