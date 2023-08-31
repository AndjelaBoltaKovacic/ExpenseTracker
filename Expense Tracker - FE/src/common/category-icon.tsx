import {
  ShoppingCart,
  DirectionsCar,
  LocalActivity,
  Restaurant,
  People,
  AttachMoney,
  CasinoRounded,
  HandymanRounded,
  ImportantDevices,
  HouseRounded,
  DashboardCustomizeRounded,
  DiamondRounded,
} from '@mui/icons-material';
import { Box } from '@mui/material';

const categories = [
  {
    keywords: ['clothes', 'fashion', 'shoes', 'accessories'],
    icon: <DiamondRounded color="primary" fontSize="small" />,
  },
  {
    keywords: ['transport', 'car', 'travel', 'gas'],
    icon: <DirectionsCar color="primary" fontSize="small" />,
  },
  {
    keywords: ['leisure', 'fun', 'entertainment'],
    icon: <LocalActivity color="primary" fontSize="small" />,
  },
  {
    keywords: ['shopping', 'food', 'groceries', 'market'],
    icon: <ShoppingCart color="primary" fontSize="small" />,
  },
  {
    keywords: ['bar', 'restaurants', 'cafee'],
    icon: <Restaurant color="primary" fontSize="small" />,
  },
  {
    keywords: ['friends', 'family'],
    icon: <People color="primary" fontSize="small" />,
  },
  {
    keywords: ['salary', 'bonus', 'incentive', 'work', 'compensation'],
    icon: <AttachMoney color="primary" fontSize="small" />,
  },
  {
    keywords: ['gambl', 'betting', 'lottery'],
    icon: <CasinoRounded color="primary" fontSize="small" />,
  },
  {
    keywords: ['repair', 'fix', 'handy'],
    icon: <HandymanRounded color="primary" fontSize="small" />,
  },
  {
    keywords: ['electronics', 'computer', 'phone', 'pc', 'battery'],
    icon: <ImportantDevices color="primary" fontSize="small" />,
  },
  {
    keywords: ['utilit', 'rent', 'bill', 'home'],
    icon: <HouseRounded color="primary" fontSize="small" />,
  },
];

const getIcon = (name: string, keywords: string[]) => {
  return !!keywords.find((keyword) => name.toLowerCase().includes(keyword));
};

function CategoryIcon({ name }: { name: string }) {
  return (
    <Box mr={1} display="flex" alignItems="end">
      {categories.find((category) => getIcon(name, category?.keywords))?.icon ?? (
        <DashboardCustomizeRounded fontSize="small" color="primary" />
      )}
    </Box>
  );
}

export default CategoryIcon;
