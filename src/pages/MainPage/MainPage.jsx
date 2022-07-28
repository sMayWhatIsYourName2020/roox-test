import React from 'react';


import styles from './MainPage.module.scss';
import User from '../../components/User/User';

function MainPage({ users }) {
  return (
    <section className="main__users">
      <h1 className="headling">Список пользователей</h1>
      <ul className={styles['users-list']}>
        {users.map((user) => (<User key={user.id} user={user} />))}
      </ul>
      <p className={styles['users__count']}>Найдено {users.length} пользователей</p>
    </section>
  );
}

export default MainPage;