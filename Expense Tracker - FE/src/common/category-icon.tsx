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
    icon: <DiamondRounded color="primary" />,
  },
  {
    keywords: ['transport', 'car', 'travel', 'gas'],
    icon: <DirectionsCar color="primary" />,
  },
  {
    keywords: ['leisure', 'fun', 'entertainment'],
    icon: <LocalActivity color="primary" />,
  },
  {
    keywords: ['shopping', 'food', 'groceries', 'market'],
    icon: <ShoppingCart color="primary" />,
  },
  {
    keywords: ['bar', 'restaurants', 'cafee'],
    icon: <Restaurant color="primary" />,
  },
  {
    keywords: ['friends', 'family'],
    icon: <People color="primary" />,
  },
  {
    keywords: ['salary', 'bonus', 'incentive', 'work', 'compensation'],
    icon: <AttachMoney color="primary" />,
  },
  {
    keywords: ['gambl', 'betting', 'lottery'],
    icon: <CasinoRounded color="primary" />,
  },
  {
    keywords: ['repair', 'fix', 'handy'],
    icon: <HandymanRounded color="primary" />,
  },
  {
    keywords: ['electronics', 'computer', 'phone', 'pc', 'battery'],
    icon: <ImportantDevices color="primary" />,
  },
  {
    keywords: ['utilit', 'rent', 'bill', 'home'],
    icon: <HouseRounded color="primary" />,
  },
];

const getIcon = (name: string, keywords: string[]) => {
  return !!keywords.find((keyword) => name.toLowerCase().includes(keyword));
};

function CategoryIcon({ name }: { name: string }) {
  return (
    <Box mr={1} display="flex" alignItems="end">
      {categories.find((category) => getIcon(name, category?.keywords))?.icon ?? (
        <DashboardCustomizeRounded color="primary" />
      )}
    </Box>
  );
}

export default CategoryIcon;
