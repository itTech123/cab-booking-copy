"use client";

import {
    Sidebar as SidebarComponent,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home, User, Settings, Menu, ShoppingCart, Car, FolderMinus, CaseLowerIcon, User2, SearchIcon, CarTaxiFront, ListOrdered, RulerDimensionLine } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState, useEffect } from 'react'; // Import useEffect
import { Button } from "@/components/ui/button";

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);

    const navItems = [
        { name: "Home", href: "/admin", icon: <Home size={18} /> },
        { name: "Users", href: "/admin/users", icon: <User2 size={18} /> },
        { name: "One Way Cabs", href: "/admin/oneWayCabs", icon: <Car size={18} /> },
        { name: "Orders", href: "/admin/orders", icon: <ShoppingCart size={18} /> },
        { name: "Forms", href: "/admin/forms", icon: <FolderMinus size={18} /> },
        { name: "Careers", href: "/admin/careers", icon: <CaseLowerIcon size={18} /> },
        { name: "SeachList", href: "/admin/searchList", icon: <SearchIcon size={18} /> },
        { name: "Taxi Service", href: "/admin/taxi-services", icon: <CarTaxiFront size={18} /> },
        { name: "Create Order", href: "/admin/add-order", icon: <ListOrdered size={18} /> },
        { name: "Driver Request", href: "/admin/driverRequest", icon: <RulerDimensionLine size={18} /> },
    ];

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
        console.log("isOpen toggled to:", !isOpen);
    };

    useEffect(() => {
        console.log("Current isOpen state:", isOpen);
    }, [isOpen]);

    return (
        <div className="relative">
            {/* Toggle button for small devices */}
            <Button
                onClick={toggleSidebar}
                className="md:hidden absolute top-4 left-4 z-10 rounded-full shadow-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Sidebar</span>
            </Button>

            <SidebarComponent
                className={cn(
                    "transition-all duration-300 ease-in-out fixed top-0 left-0 h-full z-20",
                    isOpen ? "w-64" : "w-0 md:w-64",
                    "bg-red-500/50" // Temporary background to visualize the sidebar area
                )}
            >
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel className={cn(
                            "transition-opacity",
                            isOpen ? "opacity-100" : "opacity-0"
                        )}>
                            Navigation
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {navItems.map((item) => (
                                    <SidebarMenuItem key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition",
                                                pathname === item.href && "bg-gray-200 dark:bg-gray-700 font-medium",
                                                !isOpen && "justify-center"
                                            )}
                                        >
                                            {item.icon}
                                            {isOpen && <span>{item.name}</span>}
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </SidebarComponent>

            {/* Overlay to prevent interaction with the main content when sidebar is closed on small devices */}
            {!isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="md:hidden fixed top-0 left-0 w-full h-full bg-black/50 z-10 cursor-pointer"
                />
            )}
        </div>
    );
}