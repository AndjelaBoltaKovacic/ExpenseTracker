import { baseUrl } from '../values/urls';
import { axiosApiCall } from './api/axios-api';
import { HttpMethod } from '../values/enums/service';
import { Article, BlogDTO } from '../models/blog';

const blogApiUrl = `${baseUrl}/blog`;

const BlogService = {
  getBlogs({ path }: { path: string }): Promise<BlogDTO> {
    return axiosApiCall<BlogDTO>(HttpMethod.GET, `${blogApiUrl}${path}`);
  },
  getBlog({ path }: { path: string }): Promise<Article> {
    return axiosApiCall<Article>(HttpMethod.GET, `${blogApiUrl}/${path}`);
  },
};

export default BlogService;
