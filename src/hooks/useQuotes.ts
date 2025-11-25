import { useEffect, useState } from "react";
import axios from "axios";
import type { TQuote } from "@customTypes/quote";
import type { TLoading } from "@customTypes/shared";

interface UseQuotesReturn {
    quotes: TQuote[];
    loading: TLoading;
    error: string | null;
}

export const useQuotes = (limit: number = 10): UseQuotesReturn => {
    const [quotes, setQuotes] = useState<TQuote[]>([]);
    const [loading, setLoading] = useState<TLoading>("idle");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                setLoading("pending");
                setError(null);
                const response = await axios.get<{ quotes: TQuote[]; total: number; skip: number; limit: number }>(
                    `/quotes?limit=${limit}`
                );
                setQuotes(response.data.quotes);
                setLoading("succeeded");
            } catch (err) {
                setLoading("failed");
                setError(err instanceof Error ? err.message : "Failed to fetch quotes");
            }
        };

        fetchQuotes();
    }, [limit]);

    return { quotes, loading, error };
};

    