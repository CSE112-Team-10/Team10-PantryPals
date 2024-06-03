import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import TestPage from './pages/Etest';

const basePath = import.meta.env.BASE_URL;

export const routes = [
  {
    path: basePath,
    element: <LoginPage />,
    // errorElement: (
    //   <Page title='404'>
    //     <NotFoundPage />
    //   </Page>
    // ),
    // children: [
    //   {
    //     index: true,
    //     element: (
    //       <Page title='Home'>
    //         <HomePage />
    //       </Page>
    //     ),
    //   },
    // ],
  },
  {
    path: `/home`,
    element: <HomePage />,
  },
  {
    path: `/test`,
    element: <TestPage />,
  },
];
