/* eslint-disable no-unused-vars */
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { Suspense, lazy } from "react"
import ProtectedRoute from "./pages/ProtectedRoute"

// import Product from "./pages/Product"
// import Pricing from "./pages/Pricing"
// import Home from "./pages/Home"
// import NotFound from "./pages/NotFound"
// import AppLayout from "./pages/AppLayout"
// import Login from "./pages/Login"

import CityList from "./components/CityList"
import City from "./components/City"
import CountryList from "./components/CountryList"
import Form from "./components/Form"
import SpinnerFullPage from "./components/SpinnerFullPage"

import { CitiesProvider } from "./contexts/CitiesContext"
import { AuthProvider } from "./contexts/AuthContext"

const Home = lazy(() => import("./pages/Home"))
const Product = lazy(() => import("./pages/Product"))
const Pricing = lazy(() => import("./pages/Pricing"))
const Login = lazy(() => import("./pages/Login"))
const AppLayout = lazy(() => import("./pages/AppLayout"))
const NotFound = lazy(() => import("./pages/NotFound"))

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}
