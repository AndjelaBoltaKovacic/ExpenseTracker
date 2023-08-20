import axios from 'axios';
import { HttpMethod } from '../models/common';

const userService = async (url: string, method: HttpMethod, body?: any) => {
  try {
    const response = await axios({
      method,
      url,
      data: body,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default userService;
