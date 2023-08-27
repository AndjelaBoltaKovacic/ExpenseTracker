import { baseUrl } from './urls';
import { axiosApiCall } from './axios-api';
import { HttpMethod } from '../values/enums/service';
import { BlogDTO } from '../models/blog';

const blogApiUrl = `${baseUrl}/blog`;

const BlogService = {
  getBlogs({ path }: { path: string }): Promise<BlogDTO> {
    return axiosApiCall<BlogDTO>(HttpMethod.GET, `${blogApiUrl}${path}`);
  },
};

export default BlogService;
