import { NextPage } from 'next';
import { useAuth } from '../context/auth';

const CustomizePage: NextPage = () => {
  const [value] = useAuth();
  if (!value) {
    // do something
  }
  return <div>{value}</div>;
};

export default CustomizePage;
