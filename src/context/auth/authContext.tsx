import { ReactNode, createContext, useContext, useEffect, useCallback, useMemo, useState } from "react";
import { useAsync } from "@/hooks";
import * as auth from "./authFunction";
import { SignInProps } from "@/components/SignInForm/SignInFormItems";
import { AuthService, backend_AuthRegisterRequest } from "@/service/userService";
import automatedRequester from "@/clientApi/requester/automatedRequester";

async function bootstrapAppData() {
  let user = null;

  const token = await auth.getToken();

  // refresh session token
  if (token?.sessionToken && token?.sessionId) {
    const data = await auth.client("PATCH", `/booking/v1/sessions/${token.sessionId}`, { sessionToken: token.sessionToken });
    if (data?.sessionToken) {
      user = data;
    }
  }

  return user;
}

const initAuthContext = {
  user: {
    details: {
      sequence: "",
      changeDate: "",
      resourceOwner: ""
    },
    sessionToken: ""
  },
  login: (form: SignInProps) => { },
  register: (form: backend_AuthRegisterRequest) => { },
  logout: () => { },
  isLoading: false,
  isFormLoading: false,
  error: ""
}

const AuthContext = createContext(initAuthContext);

AuthContext.displayName = 'AuthContext';

function AuthProvider(props: { children: ReactNode }) {
  const {
    data: user,
    isLoading,
    run,
    setData,
  } = useAsync();

  const [isFormLoading, setIsFormLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const appDataPromise = bootstrapAppData();
    run(appDataPromise);
  }, [run]);

  const login = useCallback(
    (form: SignInProps) => {
      setIsFormLoading(true);
      auth.login(form).then(user => {
        setData(user);
        setError("");
      }).catch((error: any) => {
        setError(error.details && error.details[0]?.message || error.message);
      }).finally(() => setIsFormLoading(false));
    },
    [setData],
  );

  let usernameRegister = '';
  let passwordRegister = '';
  let firstnameRegister = '';
  let lastnameRegister = '';

  const register = useCallback(
    (form: backend_AuthRegisterRequest) => {
      setIsFormLoading(true);
      // @ts-ignore
      usernameRegister = form.email;
      // @ts-ignore
      passwordRegister = form.password;
      // @ts-ignore
      firstnameRegister = form.firstName;
      // @ts-ignore
      lastnameRegister = form.lastName;
      AuthService.authRegister({ authRegisterRequest: form })
        .then((res) => {
          if (!res?.errors) {
            login({ username: usernameRegister, password: passwordRegister });
            automatedRequester.subscribeNewsletter(usernameRegister, "subscribed", firstnameRegister, lastnameRegister);
            setError("");
          } else {
            setError(res?.errors && res?.errors[0]);
            setIsFormLoading(false);
          }
        }).catch((error: any) => {
          setError(error.message);
        });
    },
    [],
  )

  const logout = useCallback(
    () => auth.logout()
    , []);

  const value = useMemo(
    () => ({ user, login, logout, register, isLoading, isFormLoading, error }),
    [login, logout, register, user, isLoading, isFormLoading, error],
  );

  return <AuthContext.Provider value={value} {...props} />;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

function useClient() {
  const { user } = useAuth();
  const { sessionToken } = user;
  return useCallback(
    (method: 'POST' | 'PATCH', endpoint: string, data: any) => auth.client(method, endpoint, { ...data, sessionToken }),
    [sessionToken],
  );
}

export { AuthProvider, useAuth, useClient };
