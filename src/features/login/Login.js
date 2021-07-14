import React, {useEffect, useState} from 'react';
import { Form, TextInput, Button } from "carbon-components-react";
import { useHistory } from "react-router-dom";
import logo from '../../assets/github_logo.png';

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
  const [url, setURl] = useStateWithLocalStorage('github_url');
  const [token, setToken] = useStateWithLocalStorage('github_token');
  const history = useHistory()

  useEffect(() => {
    if (token) {
      localStorage.setItem('github_token', token);
    }
    localStorage.setItem('github_url', url);
  }, [url, token]);

  return (
    <div className="login">
      <div className="bx--grid login__grid center">
        <div className="bx--row">
          <div className="bx--col">
            <div className="login__title">Github Notifications</div>
          </div>
        </div>
        <div className="bx--row">
          <div className="bx--col">
            <Form>
              <div className="login__input__url">
                <TextInput
                  id="github_url"
                  labelText="Github base URL"
                  onChange={(e) => setURl(e.target.value)}
                />
              </div>
              <div className="login__input__token">
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
          <div className="bx--col"><img src={logo} alt="logo" height={200} /></div>
        </div>
      </div>
    </div>
  )
}

export default Login;
