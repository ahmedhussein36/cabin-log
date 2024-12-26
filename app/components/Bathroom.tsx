import { useVilla } from '../contexts/VillaContext'
import { translations } from '../i18n/translations'
import { ChoiceBox } from './ChoiceBox'

export default function Bathroom() {
  const { lang, bathroomLocation, setBathroomLocation } = useVilla();
  const t = translations[lang];

  return (
    <div className="space-y-4 p-4 rounded-lg border border-primary/20">
      <h3 className="font-semibold text-lg">{t.bathroom}</h3>
      <div className="grid grid-cols-2 gap-4 w-full">
        <ChoiceBox
          selected={bathroomLocation === 'inside'}
          onClick={() => setBathroomLocation('inside')}
        >
          {t.bathroomInside}
        </ChoiceBox>
        <ChoiceBox
          selected={bathroomLocation === 'outside'}
          onClick={() => setBathroomLocation('outside')}
        >
          {t.bathroomOutside}
        </ChoiceBox>
      </div>
    </div>
  );
}

