export type TQuote = {
    id: number;
    quote: string;
    author: string;
};

export type TQuotesResponse = {
    quotes: TQuote[];
    total: number;
    skip: number;
    limit: number;
};

