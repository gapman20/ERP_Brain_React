import * as React from 'react';
import { AppProvider } from '@toolpad/core/AppProvider';
import { SignInPage } from '@toolpad/core/SignInPage';
import { useTheme } from '@mui/material/styles';

const providers = [{ id: 'credentials', name: 'Credentials' }];
// preview-start
const BRANDING = {
  logo: (
    <img
      src="../../../public/img/circuito.ico"
      alt="Brain logo"
      style={{ height: 100 }}
    />
  ),
  title: 'Brain',
};
// preview-end

const signIn = async (provider) => {
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      resolve({error: 'Verifique sus credenciales.'});
    }, 500);
  });
  return promise;
};

export default function BrandingSignInPage() {
  const theme = useTheme();
  return (
    // preview-start
    <AppProvider 
        branding={BRANDING} theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true },
                     emailField: {placeholder: 'tucorreo@email'} }}
      />
    </AppProvider>
    // preview-end
  );
}