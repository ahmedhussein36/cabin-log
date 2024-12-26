import { Check } from 'lucide-react'

interface ChoiceBoxProps {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export function ChoiceBox({ selected, onClick, children, className = '' }: ChoiceBoxProps) {
  return (
    <div
      className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-300 ${
        selected ? 'border-blue-500' : 'border-border'
      } ${className}`}
      onClick={onClick}
    >
      {selected && (
        <div className="absolute top-2 right-2 text-white bg-blue-500 rounded-full p-1">
          <Check size={16} />
        </div>
      )}
      {children}
    </div>
  )
}

