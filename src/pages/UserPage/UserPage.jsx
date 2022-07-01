import React, { useState } from 'react';

import styles from './UserPage.module.scss';
import Button from '../../components/Button/Button';
import Form from '../../components/Form/Form';

function UserPage() {
  const [isReadOnlyMode, setIsReadOnlyMode] = useState(true);
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
      <Form isReadOnlyMode={isReadOnlyMode} />
    </section>
  );
}

export default UserPage;