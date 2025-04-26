import React from "react";
import { SearchBarProps } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onAddContact }) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 sm:space-x-reverse">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          type="text"
          className="pr-10"
          placeholder="جستجوی مخاطب..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      
      <Button
        className="bg-primary hover:bg-blue-600 text-white transition duration-150 justify-center"
        onClick={onAddContact}
      >
        <Plus className="h-5 w-5 ml-1" />
        افزودن مخاطب
      </Button>
    </div>
  );
};

export default SearchBar;
