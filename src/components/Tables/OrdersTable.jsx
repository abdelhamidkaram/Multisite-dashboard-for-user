import CustomTable from "./CustomTable";
import { $api, useData } from "../../client"; // استبدال $api بـ useData
import { useEffect, useState } from "react";
import useModal from "../../store/useModal";
import useOrderModal from "../../store/modals/OrderModal";
import PromiseToast from "../UIElements/Toasts/PromiseToast";

const OrdersTable = ({ changeTitle, showMorButton }) => {
  const { toggle, changeName } = useModal();
  const { changeOrder } = useOrderModal();

  const { data: ordersData, error, isLoading  , mutate} = useData("wp-json/products/v1/orders");

  const handleDeleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "هل أنت متأكد أنك تريد حذف هذا الطلب؟"
    );

    if (confirmDelete) {
      try {
        let response ;

        response =  $api.post(
          `wp-json/products/v1/delete-order/${orderId}`
        );

        PromiseToast(
          response,
          "جاري تحديث البيانات...",
          "فشلت العملية حاول لاحقًا",
          "تم الحذف بنجاح!",
          () => {
            mutate();
          }
        );
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
  };

  const handlerStatusOrder = (order) => {
    changeOrder(order);
    openModal();
  };

  function openModal() {
    changeName("order");
    toggle();
  }

  const Headers = ["رقم الطلب", "العميل", "الحالة", "الإجمالي", "تاريخ الطلب"];

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (ordersData) {
      setOrders(ordersData);
    }
  }, [ordersData]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <CustomTable
        isLoading={isLoading}
        data={orders}
        title={changeTitle ?? "الطلبات"}
        CustomHeader={Headers}
        to={showMorButton ? "/orders" : null}
        deleteHandler={handleDeleteOrder}
        editHandler={handlerStatusOrder}
      />
    </div>
  );
};

export default OrdersTable;
