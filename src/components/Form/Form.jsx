import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import merge from 'lodash.merge';

import { actions } from '../../slices/usersSlice';
import Button from '../../components/Button/Button';
import styles from './Form.module.scss';
import cn from 'classnames';

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  username: yup.string().trim().required(),
  email: yup.string().email().required(),
  street: yup.string().trim().required(),
  city: yup.string().trim().required(),
  zipcode: yup.string().required(),
  phone: yup.string().required(),
  website: yup.string().matches(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/).required(),
  comment: yup.string().trim(),
});

function Form({ isReadOnlyMode, setIsReadOnlyMode, user }) {
  const dispatch = useDispatch();
  const textAreaStyles = cn(styles['form__control'], styles['form__control-area']);
  return (
    <Formik
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(JSON.stringify(values));
          const { name, username, street, city, zipcode, email, website, phone, comment } = values;
          const newData = {
            name,
            username,
            email,
            address: {
              street,
              city,
              zipcode,
            },
            website,
            phone,
            comment
          }; 
          merge(user, newData);
          const normalizedObj = {
            id: user.id,
            changes: newData,
          };
          dispatch(actions.updateUser(normalizedObj));
          setIsReadOnlyMode(true);
        }}
        initialValues={{
          name: user.name,
          username: user.username,
          email: user.email,
          street: user.address.street,
          city: user.address.city,
          zipcode: user.address.zipcode,
          phone: user.phone,
          website: user.website,
          comment: user.comment || '',
        }}
      >
        {({
          handleSubmit,
          handleChange,
          values,
          errors,
        }) => (
          <form className={styles['form']} noValidate onSubmit={handleSubmit}>
            <div className={styles['form__inner']}>
              <div>
                <label htmlFor="name" className={styles['form__label']}>Name</label>
                <input className={styles['form__control']} invalid={errors.name ? 'true' : 'false'} readOnly={isReadOnlyMode} value={values.name} id="name" type="text" name="name" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="username" className={styles['form__label']}>User name</label>
                <input className={styles['form__control']} invalid={errors.username ? 'true' : 'false'} readOnly={isReadOnlyMode} value={values.username} id="username" type="text" name="username" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email" className={styles['form__label']}>E-mail</label>
                <input className={styles['form__control']} invalid={errors.email ? 'true' : 'false'} readOnly={isReadOnlyMode} value={values.email} id="email" type="email" name="email" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="street" className={styles['form__label']}>Street</label>
                <input className={styles['form__control']} invalid={errors.street ? 'true' : 'false'} readOnly={isReadOnlyMode} value={values.street} id="street" type="text" name="street" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="city" className={styles['form__label']}>City</label>
                <input className={styles['form__control']} invalid={errors.city ? 'true' : 'false'} readOnly={isReadOnlyMode} value={values.city} id="city" type="text" name="city" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="zipcode" className={styles['form__label']}>Zip code</label>
                <input className={styles['form__control']} invalid={errors.zipcode ? 'true' : 'false'} readOnly={isReadOnlyMode} value={values.zipcode} id="zipcode" type="text" name="zipcode" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="phone" className={styles['form__label']}>Phone</label>
                <input className={styles['form__control']} invalid={errors.phone ? 'true' : 'false'} readOnly={isReadOnlyMode} value={values.phone} id="phone" type="text" name="phone" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="website" className={styles['form__label']}>Website</label>
                <input className={styles['form__control']} invalid={errors.website ? 'true' : 'false'} readOnly={isReadOnlyMode} value={values.website} id="website" type="url" name="website" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="comment" className={styles['form__label']}>Comment</label>
                <textarea className={textAreaStyles} readOnly={isReadOnlyMode} value={values.comment} id="comment" name="comment" onChange={handleChange} />
              </div>
            </div>
            <Button className={styles['form__submit']} type={isReadOnlyMode ? 'blocked' : 'submit'} disabled={isReadOnlyMode}>Отправить</Button>
          </form>
        )}
      </Formik>
  );
}

export default Form;