import React from 'react';
import { useSelector } from 'react-redux';

import styles from './MainPage.module.scss';
import { selectors } from '../../slices/usersSlice';
import User from '../../components/User/User';

const mappingVariant = {
  city: (arr) => arr.sort((a, b) => {
    if (a.address.city > b.address.city) {
      return 1;
    } else if (a.address.city < b.address.city) {
      return -1;
    }
    return 0;
  }),
  company: (arr) => arr.sort((a, b) => {
    if (a.company.name > b.company.name) {
      return 1;
    } else if (a.company.name < b.company.name) {
      return -1;
    }
    return 0;
  }),
  standard: (arr) => arr,
};

function MainPage({ currentMappingVariant }) {
  const users = useSelector(selectors.selectAll);
  const sortedUsers = mappingVariant[currentMappingVariant](users);
  return (
    <section className="main__users">
      <h1 className="headling">Список пользователей</h1>
      <ul className={styles['users-list']}>
        {sortedUsers.map((user) => (<User key={user.id} user={user} />))}
      </ul>
      <p className={styles['users__count']}>Найдено {users.length} пользователей</p>
    </section>
  );
}

export default MainPage;