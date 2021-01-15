import * as React from 'react';
import { useHistory } from 'react-router-dom';

export function HomeScreen() {
  console.log('Home Screen');
  const history = useHistory();
  return (
    <div>
      <h1 className="text-red-600	">HomeScreen</h1>
      <button
        className="btn-primary transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-purple-700 hover:bg-purple-900 text-white font-normal py-2 px-4 mr-1 rounded"
        onClick={() => {
          console.log('go to about');
          history.push('/about');
        }}
      >
        Aboutへ
      </button>
    </div>
  );
}
