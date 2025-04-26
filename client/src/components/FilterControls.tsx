import React from "react";
import { FilterControlsProps } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlignLeft, Grid } from "lucide-react";
import { GROUP_TRANSLATIONS } from "@/types";

const FilterControls: React.FC<FilterControlsProps> = ({
  groups,
  activeGroup,
  onGroupChange,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-auto mb-3 md:mb-0 md:ml-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">نمایش براساس</label>
          <Select
            value={activeGroup || "all"}
            onValueChange={(value) => onGroupChange(value === "all" ? undefined : value as any)}
          >
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="همه مخاطبین" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه مخاطبین</SelectItem>
              {groups.map((group) => (
                <SelectItem key={group} value={group}>
                  {GROUP_TRANSLATIONS[group]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto mb-3 md:mb-0 md:ml-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">مرتب‌سازی</label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="مرتب‌سازی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lastName-asc">نام خانوادگی (الف-ی)</SelectItem>
              <SelectItem value="lastName-desc">نام خانوادگی (ی-الف)</SelectItem>
              <SelectItem value="firstName-asc">نام (الف-ی)</SelectItem>
              <SelectItem value="firstName-desc">نام (ی-الف)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">نمایش</label>
          <div className="flex rounded-md shadow-sm">
            <Button
              type="button"
              variant={viewMode === "list" ? "default" : "outline"}
              className="px-4 py-2 border rounded-r-md"
              onClick={() => onViewModeChange("list")}
            >
              <AlignLeft className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant={viewMode === "grid" ? "default" : "outline"}
              className="px-4 py-2 border border-r-0 rounded-l-md"
              onClick={() => onViewModeChange("grid")}
            >
              <Grid className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;
