import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useVilla } from '../contexts/VillaContext'
import { translations } from '../i18n/translations'
import { IncrementalCounter } from './IncrementalCounter'

export default function ExtraRoom() {
  const { lang, additionalRoom, setAdditionalRoom, additionalRoomCount, setAdditionalRoomCount } = useVilla();
  const t = translations[lang];

  return (
    <div className="space-y-4 p-4 rounded-lg border border-primary/20">
      <h3 className="font-semibold text-lg">{t.additionalRooms}</h3>
      <RadioGroup
        className="grid grid-cols-2 gap-3"
        value={additionalRoom}
        onValueChange={(value: 'yes' | 'no') => {
          setAdditionalRoom(value);
          if (value === 'no') setAdditionalRoomCount(0);
        }}
      >
        <div className="flex items-center space-x-2 border p-2 rounded-full">
          <RadioGroupItem value="yes" id="room-yes" />
          <Label htmlFor="room-yes">{t.yes}</Label>
        </div>
        <div className="flex items-center space-x-2 border p-2 rounded-full">
          <RadioGroupItem value="no" id="room-no" />
          <Label htmlFor="room-no">{t.no}</Label>
        </div>
      </RadioGroup>
      {additionalRoom === 'yes' && (
        <div className="space-y-2">
          <Label>{t.roomTypes.bedroom}</Label>
          <IncrementalCounter value={additionalRoomCount} setValue={setAdditionalRoomCount} min={0} max={3} />
        </div>
      )}
    </div>
  );
}

