import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    subject?: string;
    name: string;
    email: string;
    message: string;
}
export interface PortfolioItem {
    title: string;
    description: string;
    imageUrl: string;
    category: string;
}
export interface backendInterface {
    addPortfolioItem(title: string, category: string, description: string, imageUrl: string): Promise<void>;
    getAllMessages(): Promise<Array<Message>>;
    getAllPortfolioItems(): Promise<Array<PortfolioItem>>;
    initializePortfolio(): Promise<void>;
    submitContactForm(name: string, email: string, subject: string | null, message: string): Promise<boolean>;
}
