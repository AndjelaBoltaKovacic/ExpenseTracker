import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { ReminderDTO } from '../models/reminder';
import ReminderService from '../services/reminder.service';
import useFetch from '../hooks/useFetch';
import { _void } from '../models/common';

type ReminderContextType = {
  reminder: ReminderDTO;
  getReminder: _void;
};

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

const useReminderContext = () => {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error('useReminderContext must be used within a ReminderProvider');
  }
  return context;
};

export const ReminderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [reminder, setReminder] = useState<ReminderDTO>({} as ReminderDTO);
  const { data, error, loading, fetchData } = useFetch<ReminderDTO>(ReminderService.getReminder);

  const getReminder = () => {
    fetchData();
  };
  const contextValue = useMemo(() => {
    return {
      reminder,
      getReminder,
    }

  }, [reminder, getReminder]);

  useEffect(() => {
    if (data) {
      setReminder(data);
    }
  }, [data]);

  return <ReminderContext.Provider value={contextValue}>{children}</ReminderContext.Provider>;
};

export default useReminderContext;
