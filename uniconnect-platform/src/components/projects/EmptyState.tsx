// components/projects/EmptyState.tsx
import { motion } from "framer-motion";
import { ClipboardList, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  hasFilters: boolean;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ hasFilters, onClearFilters }) => {
  const navigate = useNavigate();

  if (hasFilters) {
    return (
      <div className="col-span-full flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <ClipboardList className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">No projects found</h3>
        <p className="text-sm text-gray-600 mb-6">Try adjusting your filters to see more results</p>
        <button
          onClick={onClearFilters}
          className="px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-colors"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center py-20"
    >
      <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mb-6">
        <ClipboardList className="h-10 w-10 text-primary-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No projects yet</h3>
      <p className="text-sm text-gray-600 mb-8 text-center max-w-md">
        Create your first project to start collaborating with talented students
      </p>
      <button
        onClick={() => navigate("/company/projects/new")}
        className="px-6 py-3 bg-primary-500 text-white font-semibold rounded-lg hover:bg-primary-600 shadow-md hover:shadow-lg transition-all flex items-center gap-2"
      >
        <Plus className="h-5 w-5" />
        Create Project
      </button>
    </motion.div>
  );
};
