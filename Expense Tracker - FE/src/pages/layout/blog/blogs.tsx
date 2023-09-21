import { useCallback, useEffect, useRef, useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import BlogService from '../../../services/blog.service';
import Loader from '../../../common/loader';
import { BlogDTO, Article } from '../../../models/blog';
import BlogCard from './blog-card';
import { Box } from '@mui/material';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';
import ErrorCard from '../../../common/error-card';

function Blogs() {
  const [page, setPage] = useState<number>(0);
  const [blogs, setBlogs] = useState<Article[]>([] as Article[]);
  const { data, error, loading, fetchData } = useFetch<BlogDTO>(BlogService.getBlogs, `?page=${page}&size=10`);
  const intersectionObserver = useRef<React.MutableRefObject<HTMLDivElement>>();
  const { infiniteScrollTrigger } = useInfiniteScroll(
    intersectionObserver,
    loading,
    useCallback(() => {
      if (data && data.data.length <= data?.meta?.total) {
        setPage((prev) => prev + 10);
      }
    }, [])
  );
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
          <ErrorCard
            onClick={fetchData}
          />
        ) : (
          <>
            {[...blogs].map((blog, i) => (
              <BlogCard blog={blog} key={i} />
            ))}
            <div ref={infiniteScrollTrigger}>bla</div>
          </>
        )}
      </Loader>
    </Box>
  );
}

export default Blogs;
