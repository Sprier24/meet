export interface Lead {
  _id: string;
  companyName: string;
  customerName: string;
  contactNumber: string;
  emailAddress: string;
  address: string;
  productName: string;
  amount: string;
  gstNumber: string;
  status: LeadStatus;
  date: string;
  endDate: string;
  notes: string;
  isActive: string;
}

export interface Invoice {
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
  status: InvoiceStatus;
  date: Date;
  endDate: Date;
  totalWithoutGst: number;
  totalWithGst: number;
  paidAmount: number;
  remainingAmount: number;
}

export interface Deal {
  _id: string;
  companyName: string;
  customerName: string;
  contactNumber: string;
  emailAddress: string;
  address: string;
  productName: string;
  amount: string;
  gstNumber: string;
  status: DealStatus;
  date: string;
  endDate: string;
  notes: string;
  isActive: string;
}

export type LeadStatus = 'Proposal' | 'New' | 'Demo' | 'Discussion' | 'Decided';
export type InvoiceStatus = 'Pending' | 'Unpaid' | 'Paid';
export type DealStatus = 'Proposal' | 'Demo' | 'Discussion' | 'Decided';

export type StatusColorMap = {
  [key in LeadStatus | InvoiceStatus | DealStatus]: string;
};
