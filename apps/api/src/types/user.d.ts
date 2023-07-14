export type UserTokenPayload = {
    id: number
    name: string;
    email: string;
    mobile: number;
    userName: string;
    subscription: {
        premium: 1 | 0;
        endDate: string;
        planType: "Monthly" | "Yearly" | "InitialOffer" | null
    }
}