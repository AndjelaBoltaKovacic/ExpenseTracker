import { useEffect, useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import DataTable from '../../../common/table/table';
import { Transaction, TransactionsDTO } from '../../../models/transactions';
import useFetch from '../../../hooks/useFetch';
import Loader from '../../../common/loader';
import { FilterBox } from '../../../form/common/filter-box';
import ReportGenerator from '../../../reports/report-generator';
import ErrorCard from '../../../common/cards/error-card';
import { useLocation } from 'react-router-dom';
import GetStartedCard from '../../../common/cards/get-started-card';
import { useModalContext } from '../../../contexts/modals.context';
import { getService, getType } from '../../../helpers/common';

const defaultParams = {
    sort: 'updatedDtm',
    order: 'desc',
    priceRange: { from: 0, to: 10000 },
    dateRange: [null, null],
};



export const Transactions = () => {
    const location = useLocation();
    const type = getType(location.pathname);
    const [params, setParams] = useState(defaultParams);
    const { openAddTransactionModal,
        openEditTransactionModal,
        openDeleteTransactionModal,
        addTransactionModalOpen,
        editTransactionModalOpen,
        deleteTransactionModalOpen,
    } = useModalContext();
    const { data, loading, error, fetchData } = useFetch<TransactionsDTO<Transaction[]>>(
        getService(location.pathname),
        `?amountFrom=${params.priceRange.from}&amountTo=${params.priceRange.to}&dateFrom=${params.dateRange[0] || ''
        }&dateTo=${params.dateRange[1] || ''}&page=0&size=10&sort=${params.sort},${params.order}`
    );


    const isGettingStarted = JSON.stringify(defaultParams) === JSON.stringify(params)

    useEffect(() => {
        if (!addTransactionModalOpen && !editTransactionModalOpen && !deleteTransactionModalOpen)
            fetchData();
    }, [location.pathname, params.order, params.sort, addTransactionModalOpen,
        editTransactionModalOpen,
        deleteTransactionModalOpen]);


    return (
        <Container sx={{ marginTop: '5vw' }}>
            <Loader isLoading={loading}>
                {!!data?.data?.content?.length ? (
                    <>
                        <Box mt="3vw" mb="1vw" display="flex" justifyContent="space-between">
                            <Button onClick={() => setParams(defaultParams)}>Reset Filters</Button>
                        </Box>
                        <Box flexGrow={1} mb="3vw">
                            <FilterBox handleSubmit={fetchData} params={params} setParams={setParams} maxFilterAmount={data.maxAmount} />
                        </Box>
                        <DataTable params={params} setParams={setParams} type={type} data={data?.data?.content || []} onEdit={openEditTransactionModal} onDelete={openDeleteTransactionModal} />
                        <ReportGenerator type={type} />
                    </>
                ) : (
                    isGettingStarted && <GetStartedCard handleAddTransactions={openAddTransactionModal} type={type} />
                )}
                {error && <ErrorCard onClick={fetchData} />}
            </Loader>
        </Container>

    );
};

export default Transactions;
