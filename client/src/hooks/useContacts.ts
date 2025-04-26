import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Contact, ContactGroup, type ContactFilters } from "@shared/schema";
import { debounce } from "@/lib/utils";

interface UseContactsParams {
  searchTerm?: string;
  group?: ContactGroup;
  sortBy?: 'lastName' | 'firstName';
  sortDirection?: 'asc' | 'desc';
}

export function useContacts(params: UseContactsParams = {}) {
  const { searchTerm = "", group, sortBy = "lastName", sortDirection = "asc" } = params;
  
  // Build query string for filtering
  const buildQueryString = () => {
    const queryParams = new URLSearchParams();
    
    if (searchTerm) {
      queryParams.append("searchTerm", searchTerm);
    }
    
    if (group) {
      queryParams.append("group", group);
    }
    
    if (sortBy) {
      queryParams.append("sortBy", sortBy);
    }
    
    if (sortDirection) {
      queryParams.append("sortDirection", sortDirection);
    }
    
    const queryString = queryParams.toString();
    return queryString ? `?${queryString}` : "";
  };
  
  // Fetch contacts
  const { 
    data = [], 
    isLoading,
    isError, 
    refetch
  } = useQuery<Contact[]>({
    queryKey: [`/api/contacts${buildQueryString()}`],
    refetchOnWindowFocus: false,
  });
  
  // Create contact mutation
  const createMutation = useMutation({
    mutationFn: (contactData: Omit<Contact, "id">) => 
      apiRequest("POST", "/api/contacts", contactData)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
  });
  
  // Update contact mutation
  const updateMutation = useMutation({
    mutationFn: (contactData: Contact) => 
      apiRequest("PATCH", `/api/contacts/${contactData.id}`, contactData)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
  });
  
  // Delete contact mutation
  const deleteMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest("DELETE", `/api/contacts/${id}`)
        .then(res => {
          if (res.status === 204) {
            return true;
          }
          return res.json();
        }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
    },
  });
  
  // Debounced search
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    
    debouncedSearch();
    
    return () => {
      // Cleanup
    };
  }, [searchTerm]);
  
  useEffect(() => {
    refetch();
  }, [debouncedSearchTerm, group, sortBy, sortDirection, refetch]);
  
  return {
    contacts: data,
    isLoading,
    isError,
    createContact: createMutation.mutate,
    updateContact: updateMutation.mutate,
    deleteContact: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
