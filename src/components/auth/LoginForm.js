import { useDispatch } from 'react-redux';
import { authOps } from '../../redux/auth';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginSchema } from '../common/Validations/AuthValidInput';
import css from './Auth.module.scss';
import BackgroundDesktop from './AuthBackground/BackgroundDesktop/BackgroundDesktop';
import BackgroundTablet from './AuthBackground/BackgroundTablet/BackgroundTablet';
import AccentButton from '../common/AccentButton/AccentButton';

import useDeviceSizes from '../../services/utils/useDeviceSize';

export default function Login() {
    const dispatch = useDispatch();

    const { isTabletDevice, isDesktopDevice } = useDeviceSizes();

    return (
        <div className={css.formWraper}>
            {isDesktopDevice && <BackgroundDesktop />}
            {isTabletDevice && <BackgroundTablet />}
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={values => {
                    const { email, password } = values;

                    dispatch(authOps.login({ email, password }));
                }}
            >
                {({ touched, errors, isSubmitting }) => (
                    <Form className={css.registerForm}>
                        <h2 className={css.registerFormTitle}>Вхід</h2>

                        <div className="form-group">
                            <Field
                                autoComplete="on"
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                className={`${css.registerFormInput} ${
                                    touched.email && errors.email
                                        ? ` ${css.isinvalid}`
                                        : ''
                                }`}
                            />
                            <ErrorMessage
                                component="div"
                                name="email"
                                className={css.errorMessageEmail}
                            />
                        </div>
                        <div className="form-group">
                            <Field
                                autoComplete="on"
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                className={`${css.registerFormInput}  ${
                                    touched.password && errors.password
                                        ? ` ${css.isinvalid}`
                                        : ''
                                }`}
                            />
                            <ErrorMessage
                                component="div"
                                name="password"
                                className={css.errorMessagePassword}
                            />
                        </div>

                        <AccentButton
                            className={css.registerPageButton}
                            type="submit"
                        >
                            Увійти
                        </AccentButton>

                        <p className={css.registerFormText}>
                            Немає акаунту?{' '}
                            <NavLink
                                className={css.registerFormText}
                                to="/register"
                            >
                                Зареєструватись
                            </NavLink>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
