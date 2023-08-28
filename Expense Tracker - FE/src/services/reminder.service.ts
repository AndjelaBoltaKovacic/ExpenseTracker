import { baseUrl } from './urls';
import { axiosApiCall } from './axios-api';
import { HttpMethod } from '../values/enums/service';
import { ReminderDTO, ReminderRequest } from '../models/reminder';

const reminderApiUrl = `${baseUrl}/reminder`;
const ReminderService = {
  setReminder({ body }: { body: ReminderRequest }): Promise<ReminderDTO> {
    return axiosApiCall<any>(HttpMethod.POST, reminderApiUrl, body);
  },
  getReminder(): Promise<ReminderDTO> {
    return axiosApiCall<ReminderDTO>(HttpMethod.GET, reminderApiUrl);
  },
};

export default ReminderService;
