import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import SingleGroup from "./pages/SingleGroup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateGroup from "./pages/CreateGroup/CreateGroup";
import Profile from "./pages/Profile";
import Register from "./pages/Register/Register";
import Layout from "./containers/Layout";
import { Loading } from "./pages/Loading";
import { useCurrentUser } from "./hooks/useCurrentUser";
import CreateEcoAction from "./pages/CreateEcoAction";
import Groups from "./pages/Groups";
import EcoActions from "./pages/EcoActions";
import EditEcoAction from "./pages/EditEcoAction";

function App() {
  const { currentUser, loading } = useCurrentUser();

  if (loading) return <Loading />;

  return (
    <Routes>
      <Route
        element={<ProtectedRoute isAllowed={currentUser ? false : true} />}
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route
        element={
          <ProtectedRoute
            isAllowed={currentUser ? true : false}
            redirectPath="/login"
          />
        }
      >
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-group" element={<CreateGroup />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:id" element={<SingleGroup />} />
          <Route path="/eco-actions" element={<EcoActions />} />

          <Route
            element={
              <ProtectedRoute
                isAllowed={currentUser?.subscriptionType === "partner"}
                redirectPath="/"
              />
            }
          >
            <Route path="/create-eco-action" element={<CreateEcoAction />} />
            <Route path="/eco-actions/:id/edit" element={<EditEcoAction />} />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
