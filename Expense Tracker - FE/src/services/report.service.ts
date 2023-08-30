import { baseUrl } from '../values/urls';
import { axiosApiCall } from './api/axios-api';
import { HttpMethod } from '../values/enums/service';

const reportApi = `${baseUrl}/report`;
const ReportService = {
  sendReport({ path }: { path: string }): Promise<any> {
    return axiosApiCall<any>(HttpMethod.POST, reportApi + path);
  },
};

export default ReportService;
