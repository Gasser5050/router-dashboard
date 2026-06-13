import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="text-2xl text-[hsl(200,20%,95%)] bg-[hsl(200,100%,10%)] sticky top-0 z-20">
      <nav className="container mx-auto flex items-center justify-between px-8 md:px-5 lg:px-8 py-4 md:py-5">
        <NavLink className="text-3xl" to={"/"}>
          My App
        </NavLink>

        <ul className="flex space-x-4 md:space-x-6">
          <li>
            <NavLink
              className={({ isActive }) =>
                `hover:underline underline-offset-6 ${isActive ? "underline" : ""}`
              }
              to="/posts"
            >
              Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `hover:underline underline-offset-6 ${isActive ? "underline" : ""}`
              }
              to="users"
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                `hover:underline underline-offset-6 ${isActive ? "underline" : ""}`
              }
              to="todos"
            >
              Todos
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
