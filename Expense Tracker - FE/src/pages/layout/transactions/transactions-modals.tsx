import CustomModal from "../../../common/modal/custom-modal";
import EditTransaction from "../../../form/manage-transactions/edit-transaction/edit-transaction";
import DeleteTransaction from "../../../form/steps/delete";
import { Expense } from "../../../models/transactions";

const TransactionsModals = ({ transactionToModify, fetchData, openEdit, openDelete, isEditOpen, isDeleteOpen }: any) => {

    const handleEditClose = () => {
        fetchData();
        openEdit(false);
    };

    const handleDeleteClose = () => {
        fetchData();
        openDelete(false);
    };
    return (
        <>
            <CustomModal isOpen={isEditOpen} handleClose={handleEditClose}>
                <EditTransaction handleClose={handleEditClose} transactionToEdit={transactionToModify as Expense} />
            </CustomModal>
            <CustomModal isOpen={isDeleteOpen} handleClose={handleDeleteClose}>
                <DeleteTransaction handleClose={handleDeleteClose} transactionToDelete={transactionToModify as Expense} />
            </CustomModal></>
    )
}

export default TransactionsModals;