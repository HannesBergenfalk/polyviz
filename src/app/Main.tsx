import { StrictMode, FC } from "react"
import {
  RouterProvider,
  createRouter,
  createRootRoute,
  Outlet,
  createRoute,
  useParams,
} from "@tanstack/react-router"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { theme } from "./theme"
import { CuleLoader } from "./culePage/CulePage"
import { NavLoader } from "./navPage/NavPage"

const queryClient = new QueryClient()

const App: FC = () => (
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Outlet />
    </QueryClientProvider>
  </ThemeProvider>
)

const rootRoute = createRootRoute({
  component: App,
})

const CuleIdInject = () => {
  const { culeId } = culeRoute.useParams()
  return CuleLoader({ culeId })
}

const culeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cule/$culeId",
  component: CuleIdInject,
})

export const navRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: NavLoader,
})

const routeTree = rootRoute.addChildren([navRoute, culeRoute])

const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const Main = () => (
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)

export default Main
