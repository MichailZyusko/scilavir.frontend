import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

// TODO: Add loading component when fetching data from persist storage
export default function ReduxProvider({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
