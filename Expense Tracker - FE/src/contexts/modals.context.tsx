import React, { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { Transaction, TransactionFormData } from '../models/transactions';

type ModalContextType = {
  addTransactionModalOpen: boolean;
  editTransactionModalOpen: boolean;
  deleteTransactionModalOpen: boolean;
  manageGroupModalOpen: boolean;
  transactionToModify: TransactionFormData | null;
  openAddTransactionModal: () => void;
  closeAddTransactionModal: () => void;
  openEditTransactionModal: (transaction: TransactionFormData) => void;
  closeEditTransactionModal: () => void;
  openDeleteTransactionModal: (transaction: TransactionFormData) => void;
  closeDeleteTransactionModal: () => void;
  openManageGroupModal: () => void;
  closeManageGroupModal: () => void;
};

const ModalContext = createContext({} as ModalContextType);

export function useModalContext() {
  return useContext(ModalContext);
}

function ModalProvider({ children }: { children: ReactNode }) {
  const [addTransactionModalOpen, setAddTransactionModalOpen] = useState<boolean>(false);
  const [editTransactionModalOpen, setEditTransactionModalOpen] = useState<boolean>(false);
  const [deleteTransactionModalOpen, setDeleteTransactionModalOpen] = useState<boolean>(false);
  const [manageGroupModalOpen, setManageGroupModalOpen] = useState<boolean>(false);
  const [transactionToModify, setTransactionToModify] = useState<TransactionFormData | null>(null);

  const openAddTransactionModal = () => {
    setAddTransactionModalOpen(true);
  };

  const closeAddTransactionModal = () => {
    setAddTransactionModalOpen(false);
  };

  const openEditTransactionModal = (transaction: TransactionFormData) => {
    setTransactionToModify(transaction);
    setEditTransactionModalOpen(true);
  };

  const closeEditTransactionModal = () => {
    setEditTransactionModalOpen(false);
    setTransactionToModify(null);
  };

  const openDeleteTransactionModal = (transaction: TransactionFormData) => {
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
    };
  }, [
    addTransactionModalOpen,
    editTransactionModalOpen,
    deleteTransactionModalOpen,
    manageGroupModalOpen,
    transactionToModify,
  ]);
  return <ModalContext.Provider value={modalValues}>{children}</ModalContext.Provider>;
}

export default React.memo(ModalProvider);
