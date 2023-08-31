import { BrowserRouter } from 'react-router-dom';
import { NotifiProvider } from '.';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <BrowserRouter>
      <NotifiProvider>{children}</NotifiProvider>
    </BrowserRouter>
  );
};
