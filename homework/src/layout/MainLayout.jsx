import { Link, Outlet, useMatch } from "react-router-dom";


function MainLayout() {
     const isIndex = useMatch("/"); 

  return (
    <div>
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
