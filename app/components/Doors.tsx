/* eslint-disable @next/next/no-img-element */
import { Label } from '@/components/ui/label'
import { useVilla } from '../contexts/VillaContext'
import { translations } from '../i18n/translations'
import { ChoiceBox } from './ChoiceBox'
import { IncrementalCounter } from './IncrementalCounter'

export default function Doors() {
  const { lang, doors, setDoors, doorType, setDoorType } = useVilla();
  const t = translations[lang];

  return (
    <div className="space-y-4 p-4 rounded-lg border border-primary/20">
      <h3 className="font-semibold text-lg">{t.doors}</h3>
      <div className="space-y-2">
        <Label>{t.doorsCount}</Label>
        <IncrementalCounter value={doors} setValue={setDoors} min={1} max={3} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(t.doorTypes).map(([key, value] , index) => (
          <ChoiceBox
            key={key}
            selected={doorType === key}
            onClick={() => setDoorType(key)}
            className=' justify-center items-center flex flex-col'
          >
            <img src={`/assets/door-${index+1}.jpg`} alt={value} width={100} height={100} />
            <p className="mt-2 text-center">{value}</p>
          </ChoiceBox>
        ))}
      </div>
    </div>
  );
}

