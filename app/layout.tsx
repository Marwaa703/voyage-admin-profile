"use client";

// import { Provider } from 'react-redux';
// import store from '@/redux/store'; 
import '@/css/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // <Provider store={store}>
      <html lang="en">
        <body>{children}</body>
      </html>
    // </Provider>
  );
}
