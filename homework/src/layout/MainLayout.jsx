import { Link, Outlet, useMatch } from "react-router-dom";
import Header from "./Header";

function MainLayout() {
  const isIndex = useMatch("/");

  return (
    <div>
      <Header />
      <main>
        {!isIndex && (
          <div style={{ marginBottom: "1rem" }}>
            <Link to="/">← Back Home</Link>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
