import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { TransactionType } from '../values/enums/transactions';
import React from 'react';

const ModalContext = createContext({} as any);

export function useModalContext() {
    return useContext(ModalContext);
}

function ModalProvider({ children }: { children: ReactNode }) {
    const [addTransactionModalOpen, setAddTransactionModalOpen] = useState(false);
    const [editTransactionModalOpen, setEditTransactionModalOpen] = useState(false);
    const [deleteTransactionModalOpen, setDeleteTransactionModalOpen] = useState(false);
    const [manageGroupModalOpen, setManageGroupModalOpen] = useState(false);
    const [transactionToModify, setTransactionToModify] = useState(null);

    const openAddTransactionModal = (callback: any) => {
        setAddTransactionModalOpen(true);
    };

    const closeAddTransactionModal = (type: TransactionType) => {
        setAddTransactionModalOpen(false);
    };

    const openEditTransactionModal = (transaction: any) => {
        setTransactionToModify(transaction);
        setEditTransactionModalOpen(true);
    };

    const closeEditTransactionModal = () => {
        setEditTransactionModalOpen(false);
        setTransactionToModify(null);
    };

    const openDeleteTransactionModal = (transaction: any) => {
        setTransactionToModify(transaction);
        setDeleteTransactionModalOpen(true);
    };

    const closeDeleteTransactionModal = () => {
        setDeleteTransactionModalOpen(false);
        setTransactionToModify(null);
    };

    const openManageGroupModal = () => {
        setManageGroupModalOpen(true);
    };

    const closeManageGroupModal = () => {
        setManageGroupModalOpen(false);
    };

    const modalValues = useMemo(() => {
        return {
            addTransactionModalOpen,
            editTransactionModalOpen,
            deleteTransactionModalOpen,
            manageGroupModalOpen,
            transactionToModify,
            openAddTransactionModal,
            closeAddTransactionModal,
            openEditTransactionModal,
            closeEditTransactionModal,
            openDeleteTransactionModal,
            closeDeleteTransactionModal,
            openManageGroupModal,
            closeManageGroupModal,
        }
    }, [addTransactionModalOpen,
        editTransactionModalOpen,
        deleteTransactionModalOpen,
        manageGroupModalOpen,
        transactionToModify])
    return (
        <ModalContext.Provider
            value={modalValues}
        >
            {children}
        </ModalContext.Provider>
    );
}

export default React.memo(ModalProvider);