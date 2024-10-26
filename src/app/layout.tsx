import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutStyle from './layout.module.scss';

import { MdOutlineAddShoppingCart, MdOutlineHome,  MdShoppingCart, MdHome, MdOutlinePerson, MdPerson } from "react-icons/md";

import Sidebar from "./layouts/sidebar/sidebar";
const menuItems = [
  { icon: <MdOutlineHome className="icon home" />, iconActive: <MdHome className="icon home" />, label: 'Beranda', route: '/' },
  { icon: <MdOutlineAddShoppingCart className="icon" />, iconActive: <MdShoppingCart className="icon home" />, label: 'Keranjang', route: '/cart' },
  // { icon: <MdOutlineDeliveryDining className="icon" />, iconActive: <MdDeliveryDining className="icon home" />, label: 'Pesanan', route: '/order' },
  { icon: <MdOutlinePerson className="icon" />, iconActive: <MdPerson className="icon home" />, label: 'Profile', route: '/order' },
];


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evermos Store",
  description: "Simple Store",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen`}>
        <div className="flex justify-center">
          <main className={LayoutStyle.mobileFirst}>
            <div>{children}</div>
            <Sidebar items={menuItems} />
          </main>
        </div>
      </body>
    </html>
  );
}
