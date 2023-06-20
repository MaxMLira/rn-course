import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../util/auth';
import { Alert } from 'react-native';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
function SignupScreen() {
  const [isAuthenticating, setAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({email, password}){
    setAuthenticating(true);
    try {
       const token = await createUser(email, password);
       authCtx.authenticate(token);
    } catch (error){
       Alert.alert(
         'Authentication failed!',
         'Could not create user. Please check your inputs or try again later.'
       );
       setAuthenticating(false);
    }
    
  }
  if (isAuthenticating ){
    return <LoadingOverlay message="Creating user...." />
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
