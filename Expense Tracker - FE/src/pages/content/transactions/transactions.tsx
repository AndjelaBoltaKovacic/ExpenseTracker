import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import DataTable from '../../../common/table/table';
import { Transaction, TransactionParams, TransactionsDTO } from '../../../models/transactions';
import useFetch from '../../../hooks/useFetch';
import Loader from '../../../common/loader';
import { FilterBox } from '../../../form/common/filter-box';
import ReportGenerator from '../../../reports/report-generator';
import ErrorCard from '../../../common/cards/error-card';
import { useLocation } from 'react-router-dom';
import GetStartedCard from '../../../common/cards/get-started-card';
import { useModalContext } from '../../../contexts/modals.context';
import { getService, getType } from '../../../helpers/common';

const defaultParams: TransactionParams = {
  sort: 'updatedDtm',
  order: 'desc',
  priceRange: { from: 0, to: 10000 },
  dateRange: [null, null],
};

export const Transactions = () => {
  const location = useLocation();
  const type = getType(location.pathname);
  const [params, setParams] = useState<TransactionParams>(defaultParams);
  const [resetTrigger, setResetTrigger] = useState(false);
  const {
    openAddTransactionModal,
    openEditTransactionModal,
    openDeleteTransactionModal,
    addTransactionModalOpen,
    editTransactionModalOpen,
    deleteTransactionModalOpen,
  } = useModalContext();
  const { data, loading, error, fetchData } = useFetch<TransactionsDTO<Transaction[]>>(
    getService(location.pathname),
    `?amountFrom=${params.priceRange.from}&amountTo=${params.priceRange.to}&dateFrom=${
      params.dateRange[0] || ''
    }&dateTo=${params.dateRange[1] || ''}&page=0&size=10&sort=${params.sort},${params.order}`
  );

  const isGettingStarted = JSON.stringify(defaultParams) === JSON.stringify(params) && !data?.data?.content?.length;

  const handleResetFilters = () => {
    setParams(defaultParams);
    setResetTrigger((prev) => !prev);
  };

  const handleChangeParams = (params: TransactionParams) => {
    setParams(params);
  };

  useEffect(() => {
    if (!addTransactionModalOpen && !editTransactionModalOpen && !deleteTransactionModalOpen) fetchData();
  }, [
    location.pathname,
    params.order,
    params.sort,
    resetTrigger,
    addTransactionModalOpen,
    editTransactionModalOpen,
    deleteTransactionModalOpen,
  ]);

  return (
    <Container sx={{ marginTop: '5vw' }}>
      <Loader isLoading={loading}>
        {!isGettingStarted ? (
          <>
            <Box flexGrow={1} mb='3vw'>
              <FilterBox
                handleSubmit={fetchData}
                params={params}
                handleChangeParams={handleChangeParams}
                maxFilterAmount={data?.maxAmount || 10000}
              />
            </Box>
            <Box mt='3vw' mb='1vw' display='flex' justifyContent='end'>
              <Button onClick={handleResetFilters}>Reset Filters</Button>
            </Box>
            {!!data?.data.content.length ? (
              <>
                <DataTable
                  params={params}
                  handleChangeParams={handleChangeParams}
                  type={type}
                  data={data?.data?.content || []}
                  onEdit={openEditTransactionModal}
                  onDelete={openDeleteTransactionModal}
                />
                <ReportGenerator type={type} />
              </>
            ) : (
              <Typography>There are no results for the requested parameters.</Typography>
            )}
          </>
        ) : (
          isGettingStarted && <GetStartedCard handleAddTransactions={openAddTransactionModal} type={type} />
        )}
        {error && !data && <ErrorCard onClick={fetchData} />}
      </Loader>
    </Container>
  );
};

export default Transactions;
