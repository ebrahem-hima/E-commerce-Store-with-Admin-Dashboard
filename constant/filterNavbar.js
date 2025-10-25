import { CiPhone } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { GiSmartphone } from "react-icons/gi";
import { HiOutlineComputerDesktop } from "react-icons/hi2";
import { BsSmartwatch } from "react-icons/bs";
import { CiCamera } from "react-icons/ci";
import { PiHeadphonesLight } from "react-icons/pi";
import { VscGame } from "react-icons/vsc";

export const filter = [
  { text: "Gaming Mice", value: "gaming-mice" },
  { text: "Keyboards", value: "keyboards" },
  { text: "Headsets", value: "headsets" },
  { text: "Graphics Cards", value: "graphics-cards" },
  { text: "Motherboards", value: "motherboards" },
  { text: "Processors", value: "processors" },
  { text: "RAM & Memory", value: "ram-memory" },
  { text: "Monitors", value: "monitors" },
  { text: "Gaming Chairs", value: "gaming-chairs" },
  { text: "PC Cases", value: "pc-cases" },
  { text: "Power Supplies", value: "power-supplies" },
  { text: "Cooling & Fans", value: "cooling-fans" },
  { text: "Storage (SSD/HDD)", value: "storage-ssd-hdd" },
];

export const navbar = [
  { text: "Home", link: "/" },
  { text: "Contact", link: "/contact" },
  { text: "About", link: "/about" },
];
export const adminNavbar = [
  { icon: CiPhone, text: "Dashboard", link: "/admin/dashboard" },
  { icon: MdOutlineMail, text: "Orders", link: "/admin/orders" },
  { icon: GiSmartphone, text: "Products", link: "/admin/products" },
  { icon: HiOutlineComputerDesktop, text: "Category", link: "/admin/category" },
  { icon: BsSmartwatch, text: "Customers", link: "/admin/customers" },
  { icon: CiCamera, text: "Coupons", link: "/admin/coupons" },
  { icon: PiHeadphonesLight, text: "inbox", link: "/admin/inbox" },
];

export const categoriesLinks = [
  {
    name: "Desktop",
    value: "desktop",
    values: [
      { name: "Motherboard", value: "motherboard" },
      { name: "Graphic Card", value: "graphic card" },
      { name: "Processor (CPU)", value: "cpu" },
      { name: "Power Supply (PSU)", value: "psu" },
      { name: "Ram", value: "ram" },
      { name: "Case", value: "case" },
    ],
  },
  {
    name: "Notebook",
    value: "notebook",
    values: [
      { name: "Notebook Fans", value: "notebook fans" },
      { name: "Notebook Case", value: "notebook case" },
      { name: "Notebook", value: "notebook" },
      { name: "Notebook Screens", value: "notebook screens" },
      { name: "Ram", value: "ram" },
      { name: "Chargers", value: "chargers" },
    ],
  },
  {
    name: "Storage",
    value: "storage",
    values: [
      { name: "External Hard", value: "external hard" },
      { name: "SSD", value: "ssd" },
      { name: "M.2 NVMe SSD", value: "m2 ssd" },
      { name: "Flash Disk", value: "flash disk" },
      { name: "Memory Cards", value: "memory cards" },
      { name: "NAS Storage", value: "nas storage" },
    ],
  },
  {
    name: "Peripherals",
    value: "peripherals",
    values: [
      { name: "Keyboard", value: "keyboard" },
      { name: "Mouse", value: "mouse" },
      { name: "Headset", value: "headset" },
      { name: "Speakers", value: "speakers" },
      { name: "Webcam", value: "webcam" },
      { name: "Microphones", value: "microphones" },
    ],
  },
  {
    name: "Monitors",
    value: "monitors",
    values: [
      { name: "Gaming Monitors", value: "gaming monitors" },
      { name: "4K Monitors", value: "4k monitors" },
      { name: "Curved Monitors", value: "curved monitors" },
      { name: "Ultrawide Monitors", value: "ultrawide monitors" },
      { name: "Office Monitors", value: "office monitors" },
    ],
  },
  {
    name: "Networking",
    value: "networking",
    values: [
      { name: "Routers", value: "routers" },
      { name: "Switches", value: "switches" },
      { name: "WiFi Adapters", value: "wifi adapters" },
      { name: "Range Extenders", value: "range extenders" },
      { name: "Network Cables", value: "network cables" },
    ],
  },
  {
    name: "Printers & Scanners",
    value: "printers",
    values: [
      { name: "Laser Printers", value: "laser printers" },
      { name: "Inkjet Printers", value: "inkjet printers" },
      { name: "3D Printers", value: "3d printers" },
      { name: "Scanners", value: "scanners" },
      { name: "Printer Ink & Toner", value: "printer ink" },
    ],
  },
  {
    name: "Accessories",
    value: "accessories",
    values: [
      { name: "Cables & Adapters", value: "cables" },
      { name: "Cooling Pads", value: "cooling pads" },
      { name: "Laptop Bags", value: "laptop bags" },
      { name: "Phone Accessories", value: "phone accessories" },
      { name: "Tablet Accessories", value: "tablet accessories" },
    ],
  },
];

export const categoryCard = [
  { icon: GiSmartphone, text: "Phones", value: "phones" },
  { icon: HiOutlineComputerDesktop, text: "Computer", value: "computer" },
  { icon: BsSmartwatch, text: "Smartwatch", value: "smartwatch" },
  { icon: CiCamera, text: "Camera", value: "camera" },
  { icon: PiHeadphonesLight, text: "Headphones", value: "headphones" },
  { icon: VscGame, text: "Gaming", value: "gaming" },
  { icon: VscGame, text: "Gaming2", value: "gaming2" },
  { icon: VscGame, text: "Gaming3", value: "gaming3" },
];

export const CONTACT_INFO = [
  {
    title: "Call to Us",
    description: "We are available 24/7, 7 days a week.",
    detail: "Phone: +01276480215",
    icon: CiPhone,
  },
  {
    title: "Write To Us",
    description: "Fill out our form and we will contact you within 24 hours.",
    detail: "Emails: customer@exclusive.com",
    icon: MdOutlineMail,
  },
];

export const footer = [
  { title: "Exclusive", textArr: [{ text: "Subscribe", link: "" }] },
  {
    title: "Support",
    textArr: [
      { text: "111 Bijoy sarani, Dhaka, DH 1515, Bangladesh", link: "" },
      { text: "exclusive@gmail.com", link: "" },
      { text: "+88015-88888-9999", link: "" },
    ],
  },
  {
    title: "Account",
    textArr: [
      { text: "My Account", link: "/account/MyProfile" },
      { text: "Login", link: "/log-in" },
      { text: "Cart", link: "/Cart" },
      { text: "Wishlist", link: "/wishlist" },
      // { text: "shop", link: '' },
    ],
  },
  {
    title: "Quick Link",
    textArr: [
      { text: "Privacy Policy", link: "" },
      { text: "Terms Of Use", link: "" },
      { text: "FAQ", link: "" },
      { text: "Contact", link: "/contact" },
    ],
  },
];

// About Page
export const aboutCard = [
  { icon: GiSmartphone, text: "10.5K", value: "Sallers active out site" },
  {
    icon: HiOutlineComputerDesktop,
    text: "33K",
    value: "Sallers active out site",
  },
  { icon: BsSmartwatch, text: "45.5K", value: "Sallers active out site" },
  { icon: CiCamera, text: "25K", value: "Sallers active out site" },
  {
    icon: PiHeadphonesLight,
    text: "50K",
    value: "Sallers active out site",
  },
];

export const homeIcons = [
  {
    icon: CiPhone,
    text: "free and fast delivery",
    description: "Free and fast delivery",
  },
  {
    icon: MdOutlineMail,
    text: "free and fast delivery2",
    description: "Free and fast delivery",
  },
  {
    icon: CiPhone,
    text: "free and fast delivery3",
    description: "Free and fast delivery",
  },
];
