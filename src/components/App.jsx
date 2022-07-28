import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { fetchUsers } from '../slices/usersSlice';
import MainPage from '../pages/MainPage/MainPage';
import UserPage from '../pages/UserPage/UserPage';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { useReducer } from 'react';
import { selectors } from '../slices/usersSlice';

const reducer = (_, { type, payload }) => {
  switch (type) {
    case 'city':
      return {
        sort: 'city',
        users: payload.users.sort((a, b) => a.address.city > b.address.city ? 1 : -1),
      }
    case 'company':
      return {
        sort: 'company',
        users: payload.users.sort((a, b) => a.company.name > b.company.name ? 1 : -1),
      }
    case 'standard':
      return {
        sort: 'standard',
        users: payload.users,
      }
    default: {
      throw new Error('Неправильная сортировка!');
    }
  }
};

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector(selectors.selectAll);
  const [{ users: sortedUsers }, sortDispatch] = useReducer(reducer, { type: 'standard', users });
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  useEffect(() => {
    sortDispatch({
      type: 'standard',
      payload: {
        users,
      }
    })
  }, [users])
  const isLoading = useSelector((state) => state.users.isLoading);

  const setSortVariant = (name) => () => {
    sortDispatch({
      type: name,
      payload: {
        users,
      }
    });
    navigate('/');
  }
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
              <Button type="general" onClick={setSortVariant('city')} className="filter__button-chosen">По городу</Button>
              <Button type="general" onClick={setSortVariant('company')}>По компании</Button>
            </section>
            <Routes path='/'>
              <Route index element={
                <MainPage users={sortedUsers} />
              } />
              <Route path='user/:id' element={<UserPage />} />
            </Routes>
            {/* {chosenUserId === null ? <MainPage currentMappingVariant={currentVariant} /> : <UserPage />} */}
          </main>
        }
      </div>
    </div>
  );
}

export default App;