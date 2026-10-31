
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const navigation = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Categories", path: "/categories", hasDropdown: true },
  { label: "Blog", path: "/blog" },
  { label: "Authors", path: "/authors" },
  { label: "Tools", path: "/tools" },
  { label: "Contact", path: "/contact" },
];

export default function Navigation({
  className = "",
  onNavigate,
  ariaLabel = "Main navigation",
}) {
  return (
    <nav
      className={`main-nav ${className}`.trim()}
      aria-label={ariaLabel}
      id="main-navigation"
    >
      {navigation.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.path === "/"}
          onClick={onNavigate}
          className={({ isActive }) =>
            `nav-link${isActive ? " active" : ""}`
          }
          aria-label={item.label}
        >
          <span>{item.label}</span>

          {item.hasDropdown && (
            <ChevronDown
              className="nav-chevron"
              size={14}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          )}
        </NavLink>
      ))}
    </nav>
  );
}
