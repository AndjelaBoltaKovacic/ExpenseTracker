import { Article } from '../models/blog';
import dummy from '../assets/images/dummy-img.webp';
import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';

const BlogCard = ({ blog }: { blog: Article }) => {
  const { image, title, author, text } = blog;

  const excerpt = text.split(' ').slice(0, 20).join(' ');

  return (
    <Box
      border={1}
      borderColor="secondary.main"
      borderRadius="7px"
      boxShadow={2}
      width="90%"
      margin="auto"
      marginBottom="5vw"
    >
      <CardMedia component="img" alt={title} height="200" image={image || dummy} />
      <CardContent>
        <Typography variant="h4" component="div" fontWeight="600">
          {title}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary" style={{ opacity: 0.7 }}>
          {author}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {excerpt}
        </Typography>
        <Box textAlign="center">
          <Button variant="contained" color="secondary" sx={{ marginTop: '20px', width: '40%' }}>
            Read More
          </Button>
        </Box>
      </CardContent>
    </Box>
  );
};

export default BlogCard;
