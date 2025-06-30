
import { useState } from 'react';
import { 
  Home, 
  Calendar, 
  BookOpen, 
  CreditCard, 
  FileText, 
  MessageSquare,
  User,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  menuItems: Array<{
    id: string;
    name: string;
    icon: any;
  }>;
}

const MobileNavigation = ({ activeSection, onSectionChange, menuItems }: MobileNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Mobile Bottom Navigation - Always visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50 md:hidden safe-bottom">
        <div className="grid grid-cols-5 h-16">
          {menuItems.slice(0, 4).map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`flex flex-col items-center justify-center space-y-1 px-1 transition-colors ${
                activeSection === item.id
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600'
              }`}
            >
              <div className="flex items-center justify-center w-6 h-6">
                <item.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-medium truncate max-w-full text-center leading-tight">
                {item.name}
              </span>
            </button>
          ))}
          <button
            onClick={toggleMenu}
            className="flex flex-col items-center justify-center space-y-1 px-1 text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
          >
            <div className="flex items-center justify-center w-6 h-6">
              <Menu className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-lg">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
                <Button variant="ghost" size="sm" onClick={toggleMenu}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="p-4 space-y-2 overflow-y-auto max-h-full">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavigation;
