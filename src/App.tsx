import { BrowserRouter, Route, Routes } from 'react-router';

import { MainLayout } from './pages/main-layout';
import { Home } from './pages/home';
import { PhotoDetails } from './pages/photo-details';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />

          <Route path="/photos/:photo_id" element={<PhotoDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
