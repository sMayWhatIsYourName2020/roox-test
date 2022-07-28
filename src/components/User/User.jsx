import React from 'react';
import { Link } from "react-router-dom";

import styles from './User.module.scss';

function User({ user }) {
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
      <Link className={styles['user__link']} to={`/user/${user.id}`}>Подробнее</Link>
    </article>
  );
}

export default User;