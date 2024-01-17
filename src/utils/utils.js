import { notification } from "antd"
import { ShopOutlined, WalletOutlined, CarOutlined, SendOutlined, UsergroupAddOutlined, BarChartOutlined, ProfileOutlined, HddOutlined, FileTextOutlined } from '@ant-design/icons'

const Notification = (res, description = "", isshow = false) => {
  if (res?.success && isshow) {
    return notification["success"]({
      message: "Амжилттай",
      description: description || ''
    })
  }

  if (!res.success) {
    return notification["warning"]({
      message: "Амжилтгүй",
      description: description || ''
    })
  }
}
const Response = (description = "", isshow = false) => {
  if (isshow) {
    return notification["warning"]({
      message: "Алдаа гарлаа.",
      description: description || ''
    })
  }
}
const menulist = [
  {
    url: "dashboard",
    icon: <span className="icon"><ProfileOutlined /></span>,
    label: "Нүүр хуудас"
  },
  {
    url: "stock",
    icon: <span className="icon"><ProfileOutlined /></span>,
    label: "Нөөц"
  },
  {
    url: "warehouse",
    icon: <span className="icon"><HddOutlined /></span>,
    label: "Агуулах"
  },
  {
    url: "supplier",
    icon: <span className="icon"><UsergroupAddOutlined /></span>,
    label: "Нийлүүлэгч"
  },
  {
    url: "product",
    icon: <span className="icon"><FileTextOutlined /></span>,
    label: "Бараа"
  },
  // {
  //   url: "home",
  //   icon: <span className="icon"><BarChartOutlined /></span>,
  //   label: "Диаграмм"
  // },
  {
    url: "store",
    icon: <span className="icon"><ShopOutlined /></span>,
    label: "Дэлгүүр"
  },
  {
    url: "sale",
    icon: <span className="icon"><WalletOutlined /></span>,
    label: "Борлуулалт"
  },
  {
    url: "movement",
    icon: <span className="icon"><CarOutlined /></span>,
    label: "Хөдөлгөөн"

  },
  {
    url: "supplying",
    icon: <span className="icon"><SendOutlined /></span>,
    label: "Татан авалт"
  }
];

export {
  Notification, menulist, Response
}