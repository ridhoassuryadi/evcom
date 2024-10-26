"use client"
import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './sidebar.scss';

type MenuItem = {
  icon: React.ReactNode;
  iconActive: React.ReactNode;
  label: string;
  route: string;
};

interface SidebarProps {
  items: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
    const router = useRouter();
    const pathname = usePathname()

    console.log("debug: pathname", pathname)
    const inProductDetail = pathname.includes("/products/")
    const inProductList = pathname.includes("/")
    const inCart = pathname.includes("/cart")

    if (!inProductDetail && !inProductList && !inCart) return null
  
    const handleNavigation = (route: string) => {
      router.push(route);
    };
    
    return (
      <div className="sidebar-menu vertical-center">
        {items.map((item, index) => (
          <div
            className={`menu-item ${pathname === item.route ? 'active' : ''}`}
            key={index}
            onClick={() => handleNavigation(item.route)}
          >
            <div className="icon">{pathname === item.route ? item.iconActive : item.icon}</div>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>
    );
  };
  

export default Sidebar;
