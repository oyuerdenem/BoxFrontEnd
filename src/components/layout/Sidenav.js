import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/candyWarehouse-logo (2).png";
import { menulist } from "../../utils/utils";

function Sidenav() {
  return (
    <>
      <div className="brand">
        <img src={logo} alt="Candy Warehouse" />
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        {menulist.map((x, index) =>
          <Menu.Item key={index + x.url}>
            <NavLink to={'/' + x.url}>
              {x.icon}
              <span className="label">{x.label}</span>
            </NavLink>
          </Menu.Item>
        )}
      </Menu>
    </>
  );
}

export default Sidenav;
