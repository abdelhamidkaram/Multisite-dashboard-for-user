import MainButton from "../../components/UIElements/MainButton";


const AppItem = ({app , actionHandler }) => {
    return (
    <div className="pb-2 rounded-md border-2 border-gray-100 overflow-hidden shadow-md  ">
      <img  src={app.image ?? "https://storeno.b-cdn.net/market/3-2022/1646671964322.png"} />
      <h3 className="px-2 py-3 text-lg text-blue-dark font-bold ">{app.title}</h3>
      <p className="text-sm line-clamp-3 px-3 mb-3 "> {app.des}</p>
      <div className="flex justify-between px-4 cursor-pointer  ">
        <MainButton danger={app.danger} text={app.danger ? "الغاء التفعيل" : " تفعيل "} ClickHandler={actionHandler} />
      </div>
    </div>
  );
};

export default AppItem;
