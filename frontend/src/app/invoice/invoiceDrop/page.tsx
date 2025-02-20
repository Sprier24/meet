"use client";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter } from "@heroui/react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MdCancel } from "react-icons/md";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ModeToggle } from "@/components/ModeToggle"

interface Invoice {
  _id: string;
  companyName: string;
  customerName: string;
  contactNumber: string;
  emailAddress: string;
  address: string;
  gstNumber: string;
  productName: string;
  amount: number;
  discount: number;
  gstRate: number;
  status: "Pending" | "Unpaid" | "Paid";
  date: string;
  totalWithoutGst: number;
  totalWithGst: number;
  paidAmount: 0 | number;
  remainingAmount: number;
  isActive: boolean;
}

export default function App() {
  const [error, setError] = useState("");
  const [draggedOver, setDraggedOver] = useState<string | null>(null);
  const [groupedInvoices, setGroupedInvoices] = useState<Record<string, Invoice[]>>({});

  const statusColors: Record<string, string> = {
    Pending: "bg-purple-300 text-gray-800 border-2 border-purple-900 shadow-lg shadow-purple-900/50",
    Unpaid: "bg-purple-300 text-gray-800 border-2 border-purple-900 shadow-lg shadow-purple-900/50",
    Paid: "bg-purple-300 text-gray-800 border-2 border-purple-900 shadow-lg shadow-purple-900/50",
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-col w-full">
        <SidebarInset>
        <header className="flex h-14 md:h-12 items-center px-4 w-full border-b shadow-sm">
        <SidebarTrigger className="mr-2" />
          <ModeToggle/>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Breadcrumb>
              <BreadcrumbList className="flex items-center space-x-2">
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Drag & Drop</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
        </SidebarInset>

        <div className="p-6 ">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl md:max-w-4xl mx-auto">
          {Object.keys(statusColors).map((status) => {
              const invoiceStatus = groupedInvoices[status] || [];
              const totalAmount = invoiceStatus.reduce((sum, invoice) => sum + invoice.amount, 0);

              return (
                <div
                  key={status}
                  className={`p-4  min-h-[300px] transition-all w-full border ${
                    draggedOver === status ? "border-gray-500 border-dashed" : "border-transparent"
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDraggedOver(status);
                  }}
                  onDragLeave={() => setDraggedOver(null)}
                >
                  <h2 className={`text-sm font-bold mb-4 px-5 py-2 rounded-lg ${statusColors[status]}`}>{status}</h2>
                  <div className="p-3 bg-[#FAF3DD] rounded-md shadow">
                    <p className="text-sm font-semibold text-black">Total Invoice: {invoiceStatus.length}</p>
                    <p className="text-sm font-semibold text-black">Total Amount: ₹{totalAmount}</p>
                  </div>

                  <div className="mt-4 space-y-3 min-h-[250px] max-h-[500px] overflow-auto">
                    {invoiceStatus.length === 0 ? (
                      <p className="text-gray-500 text-center">No invoices available</p>
                    ) : (
                      invoiceStatus.map((invoice) => (
                        <div
                          key={invoice._id}
                          className="border border-gray-300 rounded-lg shadow-md bg-white p-3 cursor-grab active:cursor-grabbing"
                          draggable
                        >
                          <p className="text-sm font-semibold text-black">Company Name: {invoice.companyName}</p>
                          <p className="text-sm font-semibold text-black">Product: {invoice.productName}</p>
                          <p className="text-sm font-semibold text-black">Next Date: {invoice.date}</p>
                          <p className="text-sm font-semibold text-black">Amount: ₹{invoice.amount}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
} 