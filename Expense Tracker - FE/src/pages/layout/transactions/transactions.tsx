import { useState } from 'react';
import CustomModal from '../../../common/modal/custom-modal';
import DataTable from '../../../common/table/table';
import { expenses } from '../../../services/mocks/expenses';
import AddTransactionForm from '../../../common/form/add-transaction/add-transaction-form';
import ModalButtons from '../../../common/modal/modal-buttons';
import Typography from '@mui/material/Typography';
import { Expense } from '../../../models/expenses';

function Transactions() {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [transationToModify, setTransactionToModify] = useState<Expense | null>(null);

  const handleEditOpen = (transaction: Expense) => {
    setTransactionToModify(transaction);
    setOpenEditModal(true);
  };

  const handleDeleteOpen = (transaction: Expense) => {
    setTransactionToModify(transaction);
    setOpenDeleteModal(true);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
  };

  const handleDeleteClose = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      <DataTable data={expenses} onEditClick={handleEditOpen} onDeleteClick={handleDeleteOpen} />
      <CustomModal title='Edit Transaction' isOpen={openEditModal} handleClose={handleEditClose}>
        <AddTransactionForm handleClose={handleEditClose} transactionToEdit={transationToModify as Expense} />
      </CustomModal>
      <CustomModal title='Delete Transaction' isOpen={openDeleteModal} handleClose={handleDeleteClose}>
        <Typography variant='h5'>Are you sure you want to delete this transaction?</Typography>
        <ModalButtons
          handleClose={handleDeleteClose}
          handleSubmit={() => {
            console.log('send delete request');
          }}
        />
      </CustomModal>
    </>
  );
}

export default Transactions;
