import { Label } from '@/components/ui/label'
import { useVilla } from '../contexts/VillaContext'
import { translations } from '../i18n/translations'
import { ChoiceBox } from './ChoiceBox'
import { IncrementalCounter } from './IncrementalCounter'
import Image from 'next/image'

export default function Windows() {
  const { lang, windows, setWindows, windowType, setWindowType } = useVilla();
  const t = translations[lang];

  return (
    <div className="space-y-4 p-4 rounded-lg border border-primary/20">
      <h3 className="font-semibold text-lg">{t.windows}</h3>
      <div className="space-y-2">
        <Label>{t.windowsCount}</Label>
        <IncrementalCounter value={windows} setValue={setWindows} min={1} max={8} />
      </div>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(t.windowTypes).map(([key, value], index) => (
          <ChoiceBox
            key={key}
            selected={windowType === key}
            onClick={() => setWindowType(key)}
            className=' justify-center items-center flex flex-col'
          >
            <Image src={`/assets/win-${index + 1}.jpg`} alt={value} width={100} height={100} />
            <p className="mt-2 text-center">{value}</p>
          </ChoiceBox>
        ))}
      </div>
    </div>
  );
}

