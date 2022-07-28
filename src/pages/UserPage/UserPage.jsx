import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectors } from '../../slices/usersSlice';
import styles from './UserPage.module.scss';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';

function UserPage() {
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(true);
  const { id } = useParams();
  const users = useSelector(selectors.selectAll);
  const user = users.find((user) => user.id === +id);
  return (
    <section className={styles['user-page']}>
      <div className={styles['user-page__inner']}>
        <h1 className="headling">Профиль пользователя</h1>
        {isReadOnlyMode
          ?
          <Button type="general" onClick={() => setIsReadOnlyMode(false)} className={styles['user-page__button-edit']}>Редактировать</Button>
          :
          <Button type="general" onClick={() => setIsReadOnlyMode(true)} className={styles['user-page__button-edit']}>Отмена</Button>
        }
      </div>
      <Form user={user} setIsReadOnlyMode={setIsReadOnlyMode} isReadOnlyMode={isReadOnlyMode} />
    </section>
  );
}

export default UserPage;