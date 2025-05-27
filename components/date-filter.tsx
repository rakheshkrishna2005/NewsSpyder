"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { X, Filter } from "lucide-react"
import { format } from "date-fns"

interface DateFilterProps {
  selectedDate: Date | undefined
  onDateChange: (date: Date | undefined) => void
}

export function DateFilter({ selectedDate, onDateChange }: DateFilterProps) {
  const [open, setOpen] = useState(false)

  const clearDate = () => {
    onDateChange(undefined)
    setOpen(false)
  }

  return (
    <div className="flex items-center gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-auto min-w-[120px] max-w-[200px] justify-start text-left font-normal truncate hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950 dark:hover:to-purple-950 transition-all duration-300"
          >
            <Filter className="mr-2 h-4 w-4 text-blue-500" />
            {selectedDate ? format(selectedDate, "PPP") : "Date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              onDateChange(date)
              setOpen(false)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {selectedDate && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearDate}
          className="h-8 w-8 p-0 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
        >
          <X className="h-4 w-4 text-red-500" />
        </Button>
      )}
    </div>
  )
}
