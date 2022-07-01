import React from 'react';

import styles from './User.module.scss';
import useUser from '../../hooks/index';

function User({ user }) {
  const { setChosenUserId } = useUser();

  return (
    <article className={styles['user']}>
      <dl className={styles['user__outter']}>
        <div className={styles['user__inner']}>
          <dt className={styles['user__termin']}>ФИО:</dt>
          <dd>{user.name}</dd>
        </div>
        <div className={styles['user__inner']}>
          <dt className={styles['user__termin']}>Город:</dt>
          <dd>{user.address.city}</dd>
        </div>
        <div className={styles['user__inner']}>
          <dt className={styles['user__termin']}>Компания:</dt>
          <dd>{user.company.name}</dd>
        </div>
      </dl>
      <button className={styles['user__link']} onClick={() => setChosenUserId(user.id)}>Подробнее</button>
    </article>
  );
}

export default User;