"use client";
import * as React from "react";
import { format, parse, isValid } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function DatePicker({ selectedDate, onDateChange, disabled }) {
  // Handle the date parsing with error handling
  const parseSelectedDate = () => {
    if (!selectedDate) return null;
    
    try {
      if (typeof selectedDate === 'string') {
        const parsed = parse(selectedDate, 'yyyy-MM-dd', new Date());
        return isValid(parsed) ? parsed : null;
      }
      return selectedDate instanceof Date && isValid(selectedDate) ? selectedDate : null;
    } catch (error) {
      console.error("Date parsing error:", error);
      return null;
    }
  };

  const parsedDate = parseSelectedDate();

  const handleDateSelect = (date) => {
    try {
      onDateChange(date ? format(date, 'yyyy-MM-dd') : null);
    } catch (error) {
      console.error("Date selection error:", error);
      onDateChange(null);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center
            ${parsedDate
              ? "bg-[#D9F0F4] text-[#2a5f74] border-2 border-[#3298BA]"
              : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
            }`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span>
            {parsedDate && isValid(parsedDate) 
              ? format(parsedDate, "MMM d, yyyy") 
              : "Select a date"
            }
          </span>
          {parsedDate && (
            <X
              className="ml-2 h-4 w-4 text-gray-500 hover:text-[#2a5f74]"
              onClick={(e) => {
                e.stopPropagation();
                onDateChange(null);
              }}
            />
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-4 bg-[#F0F9FB] rounded-md shadow-md border-2 border-[#3298BA]">
        <Calendar
          mode="single"
          selected={parsedDate}
          onSelect={handleDateSelect}
          initialFocus
          disabled={disabled}
        />
      </PopoverContent>
    </Popover>
  );
}