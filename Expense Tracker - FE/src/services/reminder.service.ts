import { baseUrl } from './urls';
import { axiosApiCall } from './axios-api';
import { HttpMethod } from '../values/enums/service';
import { Reminder, ReminderRequest } from '../models/reminder';

const reminderApiUrl = `${baseUrl}/reminder`;
const ReminderService = {
  setReminder({ body }: { body: ReminderRequest }): Promise<any> {
    return axiosApiCall<any>(HttpMethod.POST, reminderApiUrl, body);
  },
  getReminder(): Promise<Reminder> {
    return axiosApiCall<Reminder>(HttpMethod.GET, reminderApiUrl);
  },
};

export default ReminderService;
