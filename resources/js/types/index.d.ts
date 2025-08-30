import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role: 'admin' | 'staf_tata_usaha' | 'pimpinan';
    role_display?: string;
    letters_count?: number;
    [key: string]: unknown; // This allows for additional properties...
}

export interface LetterCategory {
    id: number;
    name: string;
    description?: string;
    is_active: boolean;
    letters_count?: number;
    created_at: string;
    updated_at: string;
}

export interface Letter {
    id: number;
    type: 'incoming' | 'outgoing';
    type_display?: string;
    number: string;
    letter_date: string;
    subject: string;
    sender_recipient: string;
    description?: string;
    file_path?: string;
    file_url?: string;
    original_filename?: string;
    category_id?: number;
    created_by: number;
    created_at: string;
    updated_at: string;
    category?: LetterCategory;
    creator?: User;
}
