import { UserResponseProps } from "./types";
import { SignInProps } from "@/components/SignInForm/SignInFormItems";

const localStorageKey = '__auth_provider_token__';
let newSessionId = "";

async function getToken() {
  return JSON.parse(
    window.localStorage.getItem(localStorageKey)
    || `{"seasionId": "", "sessionToken": ""}`
  );
}

function handleUserResponse(user: UserResponseProps) {
  window.localStorage.setItem(localStorageKey, JSON.stringify({
    sessionId: newSessionId,
    sessionToken: user.sessionToken,
  }));
  return user;
}

async function login({ username, password }: SignInProps) {
  return client('POST', '/orion/v1/sessions', {
    checks: {
      user: {
        loginName: username
      }
    }
  })
    .then((res) => {
      const { sessionId, sessionToken } = res;
      newSessionId = sessionId;
      return client('PATCH', `/orion/v1/sessions/${sessionId}`, {
        sessionToken,
        checks: {
          password: {
            password
          }
        }
      })
    })
    .then(handleUserResponse).catch((error) => {
      return Promise.reject(error)
    });
}

function logout() {
  window.localStorage.removeItem(localStorageKey);
}

const authURL = process.env.NEXT_PUBLIC_ZITADEL_AUTH;

export async function client(method: 'POST' | 'PATCH', endpoint: string, data: any) {
  const config = {
    method,
    body: JSON.stringify(data),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }

  return window.fetch(`${authURL}${endpoint}`, config).then(async response => {
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  }).catch((error) => {
    return Promise.reject(error)
  });
}

export { getToken, login, logout, localStorageKey }
