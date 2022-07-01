import { useContext } from 'react';

import UserContext from '../contexts/index';

const useUser = () => useContext(UserContext);

export default useUser;