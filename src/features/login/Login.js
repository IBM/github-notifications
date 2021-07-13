import React, {useEffect, useState} from 'react';
import { Form, TextInput, Button } from "carbon-components-react";
import { useHistory } from "react-router-dom";

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = useState(
    localStorage.getItem(localStorageKey) || ''
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value,localStorageKey]);

  return [value, setValue];
};

function Login() {
  const [token, setToken] = useStateWithLocalStorage('github_token');
  const history = useHistory()

  useEffect(() => {
    localStorage.setItem('github_token', token);
  }, [token]);

  return (
    <div className="login">
      <Form>
        <div className="login__input">
          <TextInput
            id="github_token"
            labelText="Github token"
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <Button
          kind="primary"
          tabIndex={0}
          type="submit"
          onClick={() => history.push('/notifications')}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default Login;
