
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-800 border-gray-600 text-white placeholder:text-gray-400 min-w-[200px]"
        />
      </div>

      <Select value={statusFilter} onValueChange={onStatusFilterChange}>
        <SelectTrigger className="bg-gray-800 border-gray-600 text-white min-w-[120px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-600">
          <SelectItem value="all" className="text-white hover:bg-gray-700">Todos</SelectItem>
          <SelectItem value="pending" className="text-white hover:bg-gray-700">Pendente</SelectItem>
          <SelectItem value="in-progress" className="text-white hover:bg-gray-700">Realizando</SelectItem>
          <SelectItem value="completed" className="text-white hover:bg-gray-700">Concluída</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
