import * as React from 'react';
import { useHistory } from 'react-router-dom';

export function Navigation() {
  const history = useHistory();
  return (
    <nav>
      <ul>
        <li>
          <div
            onClick={() => {
              history.replace('/');
            }}
          >
            Home
          </div>
        </li>
        <li>
          <div
            onClick={() => {
              history.replace('/about');
            }}
          >
            About
          </div>
        </li>
      </ul>
    </nav>
  );
}
