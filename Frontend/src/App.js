
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import AppLayout from './Navigation/AppLayout';
import HomePage from './Pages/HomePage';

import LoginPage from './Pages/LoginPage';
import AdminPage from './Pages/AdminPage';
import PropertiesPage from './Pages/PropertiesPage';
import FavoritesPage from './Pages/FavoritesPage';
import EditProperty from './Components/Admin/EditProperty'
import DetailsPage from './Pages/DetailsPage';
import { ToastContainer } from 'react-toastify';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },

      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/admin',
        element: <AdminPage />
      },
      {
        path: '/admin/edit/:id',
        element: <EditProperty />
      },
      {
        path: '/properties',
        element: <PropertiesPage />
      },
      {
        path: '/favorites',
        element: <FavoritesPage />
      },
      {
        path: '/details/:id',
        element: <DetailsPage />
      }
    ]
  }
])

function App() {
  return (
    <>
      <RouterProvider router={browserRouter}>
        <ToastContainer />
      </RouterProvider>
    </>
  );
}

export default App;
