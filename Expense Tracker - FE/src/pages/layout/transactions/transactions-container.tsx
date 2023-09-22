import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { NavTabs } from "../../../common/navigation/nav-tabs"


const MenuItems = [{ title: 'Incomes', page: 'incomes' }, { title: 'Expenses', page: 'expenses' }]
const TransactionsContainer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location.pathname === '/transactions' && navigate('incomes')

  }, [location.pathname])
  return (
    <>
      <NavTabs items={MenuItems} isChildRoute />
      <Outlet />
    </>
  )
}

export default TransactionsContainer;