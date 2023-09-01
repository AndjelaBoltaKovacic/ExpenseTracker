import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import useFetch from '../../../hooks/useFetch';
import { Article } from '../../../models/blog';
import BlogService from '../../../services/blog.service';
import Loader from '../../../common/loader';
import dummy from '../../../assets/images/dummy-img.webp';
import NoticeCard from '../../../common/notice-card';

const BlogPage = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState<Article | null>(null);
  const { data, error, loading, fetchData } = useFetch<any>(BlogService.getBlog, id);
  const { title, image, author, text } = blogData ?? ({} as Article);

  useEffect(() => {
    id && fetchData();
  }, [id]);

  useEffect(() => {
    data && setBlogData(data);
  }, [data]);

  return (
    <Loader isLoading={loading}>
      {error && (
        <NoticeCard
          title='Opps! Something went wrong!'
          text='Sorry for the inconvenience. Please try again later.'
          buttonText='Get articles'
          onButtonClick={() => fetchData()}
        />
      )}
      <Container maxWidth='md'>
        <CardMedia component='img' alt={title} height='400' image={image || dummy} />
        <Typography variant='h3' component='div' my={3}>
          {title}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary' mb={2}>
          Author: {author}
        </Typography>
        <Typography variant='body1'>{text}</Typography>
      </Container>
    </Loader>
  );
};

export default BlogPage;
