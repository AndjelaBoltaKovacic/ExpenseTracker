import { useState } from 'react';
import CustomModal from '../../../common/modal/custom-modal';
import DataTable from '../../../common/table/table';
import { expenses } from '../../../services/mocks/expenses';
import { Expense } from '../../../models/transactions';
import EditTransaction from '../../../common/form/edit/edit-transaction';
import DeleteTransaction from '../../../common/form/steps/delete';
import { TransactionType } from '../../../values/enums/transactions';

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
      <DataTable
        type={TransactionType.Expense}
        data={expenses}
        onEditClick={handleEditOpen}
        onDeleteClick={handleDeleteOpen}
      />
      <CustomModal isOpen={openEditModal} handleClose={handleEditClose}>
        <EditTransaction handleClose={handleEditClose} transactionToEdit={transationToModify as Expense} />
      </CustomModal>
      <CustomModal isOpen={openDeleteModal} handleClose={handleDeleteClose}>
        <DeleteTransaction handleClose={handleDeleteClose} transactionToDelete={transationToModify as Expense} />
      </CustomModal>
    </>
  );
}

export default Transactions;
