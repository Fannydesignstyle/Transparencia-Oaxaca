export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Institution {
  id: string;
  name: string;
  description?: string;
  type: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
  _count?: {
    profiles: number;
    documents: number;
    qrCodes: number;
  };
}

export interface InstitutionalProfile {
  id: string;
  institutionId: string;
  title: string;
  content: string;
  category: string;
  publishDate: Date;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  institution?: {
    id: string;
    name: string;
    type: string;
  };
}

export interface QRCode {
  id: string;
  institutionId: string;
  code: string;
  title: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  institution?: {
    id: string;
    name: string;
    type: string;
  };
}

export interface Document {
  id: string;
  institutionId: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  category: string;
  publishDate: Date;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Inquiry {
  id: string;
  userId?: string;
  institutionId: string;
  subject: string;
  content: string;
  status: string;
  response?: string;
  responseDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  institution?: {
    id: string;
    name: string;
    type: string;
  };
  user?: {
    id: string;
    name?: string;
    email: string;
  };
}

export interface Consultation {
  id: string;
  institutionId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  institution?: {
    id: string;
    name: string;
    type: string;
  };
  _count?: {
    votes: number;
  };
}

export interface Vote {
  id: string;
  userId?: string;
  consultationId: string;
  option: string;
  createdAt: Date;
  consultation?: {
    id: string;
    title: string;
    institution?: {
      id: string;
      name: string;
    };
  };
  user?: {
    id: string;
    name?: string;
    email: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}