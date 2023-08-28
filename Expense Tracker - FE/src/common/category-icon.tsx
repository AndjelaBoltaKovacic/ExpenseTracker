import {
  ShoppingCart,
  DirectionsCar,
  LocalActivity,
  Fastfood,
  Restaurant,
  HelpOutline,
  People,
  AttachMoney,
} from '@mui/icons-material';

const getIcon = (name: string, keywords: string[]) => {
  return !!keywords.find((keyword) => name.toLowerCase().includes(keyword));
};

function CategoryIcon({ name }: { name: string }) {
  switch (true) {
    case getIcon(name, ['shopping', 'clothes', 'fashion', 'shoes']):
      return <ShoppingCart color='primary' />;
    case getIcon(name, ['transport', 'car', 'travel', 'gas']):
      return <DirectionsCar color='primary' />;
    case getIcon(name, ['leisure', 'fun', 'entertainment']):
      return <LocalActivity color='primary' />;
    case getIcon(name, ['food', 'groceries']):
      return <Fastfood color='primary' />;
    case getIcon(name, ['bars', 'restaurants']):
      return <Restaurant color='primary' />;
    case getIcon(name, ['friends', 'family']):
      return <People color='primary' />;
    case getIcon(name, ['salary', 'bonus']):
      return <AttachMoney color='primary' />;
    default:
      return <HelpOutline color='primary' />;
  }
}

export default CategoryIcon;
