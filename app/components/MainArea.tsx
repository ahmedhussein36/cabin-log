import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { useVilla } from '../contexts/VillaContext'
import { translations } from '../i18n/translations'

export default function MainArea() {
  const { lang, length, setLength, width, setWidth } = useVilla();
  const t = translations[lang];

  return (
    <div className="space-y-4 p-4 rounded-lg border border-primary/20">
      <h3 className="font-semibold text-lg flex justify-between items-center">{t.mainArea} <span>({length * width} m<sup>2</sup>)</span></h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>{t.length}</Label>
          <Slider
            className="transition-all duration-300 hover:opacity-80"
            value={[length]}
            onValueChange={(value) => setLength(value[0])}
            min={4}
            max={50}
            step={1}
          />
          <div className="flex justify-end">
            <div className="inline-block px-3 py-1 rounded-full border border-primary/20">
              {length} {t.meters}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label>{t.width}</Label>
          <Slider
            className="transition-all duration-300 hover:opacity-80"
            value={[width]}
            onValueChange={(value) => setWidth(value[0])}
            min={3}
            max={20}
            step={1}
          />
          <div className="flex justify-end">
            <div className="inline-block px-3 py-1 rounded-full border border-primary/20">
              {width} {t.meters}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

