import { useMutation, useQuery } from "@tanstack/react-query";
import type { PortfolioItem } from "../backend.d";
import { useActor } from "./useActor";

export function usePortfolioItems() {
  const { actor, isFetching } = useActor();

  return useQuery<PortfolioItem[]>({
    queryKey: ["portfolioItems"],
    queryFn: async () => {
      if (!actor) return [];
      await actor.initializePortfolio();
      return actor.getAllPortfolioItems();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      subject,
      message,
    }: {
      name: string;
      email: string;
      subject: string | null;
      message: string;
    }) => {
      if (!actor) throw new Error("Actor not initialized");
      const result = await actor.submitContactForm(
        name,
        email,
        subject,
        message,
      );
      if (!result) throw new Error("Form submission failed");
      return result;
    },
  });
}
