import * as React from 'react';
import { signout } from './config/ApiService';
import withRoot from './modules/withRoot';

function SignOut() {
  signout();

   return (
    <div>{"sign out"}
  </div>)
}

export default withRoot(SignOut);
