import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { translations } from '../i18n/translations'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [lang] = useState<'en' | 'ar'>('ar')
  const t = translations[lang]

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle form submission logic here
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t.contactUs}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">{t.name}</Label>
            <Input id="name" required />
          </div>
          <div>
            <Label htmlFor="email">{t.email}</Label>
            <Input id="email" type="email" required />
          </div>
          <div>
            <Label htmlFor="phone">{t.phone}</Label>
            <Input id="phone" type="tel" required />
          </div>
          <div>
            <Label htmlFor="message">{t.message}</Label>
            <Textarea id="message" required />
          </div>
          <Button type="submit">{t.send}</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

