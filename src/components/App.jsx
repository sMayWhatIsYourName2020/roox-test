import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../slices/usersSlice';
import MainPage from '../pages/MainPage/MainPage';
import UserPage from '../pages/UserPage/UserPage';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import useUser from '../hooks/index';

function App() {
  const dispatch = useDispatch();
  const [currentVariant, setCurrentVariant] = useState('standard');
  const isLoading = useSelector((state) => state.users.isLoading);
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const { chosenUserId, setChosenUserId } = useUser();

  const setMappingVariant = (name) => () => {
    setCurrentVariant(name);
    setChosenUserId(null);
  };

  return (
    <div className="container">
      <div className="loader">
        {isLoading
          ?
          <Loader />
          :
          <main className="main">
            <section className="main__filter">
              <h2 className="filter__title">Сортировка</h2>
              <Button type="general" onClick={setMappingVariant('city')} className="filter__button-chosen">По городу</Button>
              <Button type="general" onClick={setMappingVariant('company')}>По компании</Button>
            </section>
            {chosenUserId === null ? <MainPage currentMappingVariant={currentVariant} /> : <UserPage />}
          </main>
        }
      </div>
    </div>
  );
}

export default App;