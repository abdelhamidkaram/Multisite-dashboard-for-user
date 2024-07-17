import { NavLink } from "react-router-dom";
import Arrow from "../../assets/icons/arrow.svg";
import HomeIcon from "../../assets/icons/home.svg";
import BagIcon from "../../assets/icons/bag.svg";
import Analytics from "../../assets/icons/analytics.svg";
import OrdersIcon from "../../assets/icons/broduct.svg";
import Marketing from "../../assets/icons/marketing.svg";
import Store from "../../assets/icons/store.svg";
import Apps from "../../assets/icons/apps.svg";
import Setting from "../../assets/icons/setting.svg";
import SelectedIcon from "../../assets/icons/select.svg";
import usePageTitle from "../../store/PageTitle";
import useSideBarToggle from "../../store/ToggleSidebar";

const SideBar = ({onClick }) => {

  const isOpen = useSideBarToggle((state)=>state.isOpen);

  const SideNavLi = ({ icon, name, to }) => {

    return (
      <li className="mb-2">
        <NavLink to={to}>
          {({ isActive }) => (
            <SideItem
              isActive={isActive}
              name={name}
              icon={icon}
            />
          )}
        </NavLink>
      </li>
    );
  };

  return (
    <nav
      className={` p-3 fixed z-50 bottom-0 start-0 ${
        isOpen ? "w-60" : "w-20"
      } h-screen bg-blue-dark duration-700`}
    >
      <img />
      <h1
        className={`text-lg py-4 font-base font-bold text-blue-light text-center ${
          isOpen ? "text-4xl duration-700 " : "text-sm duration-700 "
        }`}
      >
        متكامــل
      </h1>
      <img
        className={` absolute end-0 cursor-pointer z-40 -me-3 -mt-9 rounded-full border-2 size-7 border-blue-dark bg-blue-dark  ${
          isOpen ? "rotate-180" : ""
        } duration-700`}
        src={Arrow}
        onClick={onClick}
      />

      <div className="bg-slate-500  h-px align-middle items-center mb-3 "></div>

      <ul className={"h-full  "}>
        <SideNavLi name={"لوحة التحكم "} icon={HomeIcon} to={"/"} />
        <SideNavLi name={"المنتجات"} icon={BagIcon} to={"products"} />
        <SideNavLi name={"الطلبات"} icon={OrdersIcon} to={"orders"} />
        <SideNavLi name={"التسويق"} icon={Marketing} to={"marketing"} />
        <SideNavLi name={"المتجر"} icon={Store} to={"store"} />
        <SideNavLi name={"التطبيقات"} icon={Apps} to={"apps"} />
        <SideNavLi name={"الإحصائيات"} icon={Analytics} to={"analytics"} />
        <SideNavLi
          name={"الإعدادات"}
          icon={Setting}
          to={"settings"}
          className={"fixed bottom-10"}
        />
      </ul>
    </nav>
  );
};

export default SideBar;

const SideItem = ({  name, icon, isActive }) => {
  const open = useSideBarToggle((state)=>state.isOpen);
  const setTitle = usePageTitle((state) => state.setTitle);
  if (isActive) {
    setTitle(name);
  }

  return (
    <div
      className={`${
        isActive
          ? "side-item-active flex  justify-between   gap-3 text-white font-bold duration-75 "
          : "flex gap-2 mb-2 side-item  text-white  "
      }`}
    >
      <div className="flex gap-4 ">
        <img src={icon} className= {`  ${open ? "w-5  " : "w-8 " } ${isActive ? 'w-[2rem] items-center duration-1000 ':''} `} />
        <span>{open ? name : ""} </span>
      </div>
      {isActive ? (
        <img src={SelectedIcon} width={`${open ? "20px" : "5px"}  `} />
      ) : (
        ""
      )}
    </div>
  );
};
