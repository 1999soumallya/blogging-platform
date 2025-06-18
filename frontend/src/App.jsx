import { Navigate, Route, Routes } from "react-router-dom"
import { AuthGuard, DashboardGuard } from "./guards/auth.guard"
import LoginPage from "./pages/auth/login.page"
import RegistrationPage from "./pages/auth/registration.page"
import MainLayout from "./layouts/MainLayout"
import BlogList from "./pages/blog/blog.page"
import BlogDetailsPage from "./pages/blog/details.page"

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthGuard />}>
        <Route index element={<LoginPage />} />
        <Route path='registration' element={<RegistrationPage />} />
      </Route>
      <Route path='/blog' element={<DashboardGuard />}>
        <Route element={<MainLayout />}>
          <Route index element={<BlogList />} />
          <Route path=":id" element={<BlogDetailsPage />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App
