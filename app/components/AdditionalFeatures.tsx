import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useVilla } from "@/app/contexts/VillaContext";
import { translations } from "@/app/i18n/translations";

export default function AdditionalFeatures() {
    const { lang, additionalFeatures, setAdditionalFeatures } = useVilla();
    const t = translations[lang];

    return (
        <div className="space-y-4 p-4 rounded-lg border border-primary/20">
            <h3 className="font-semibold text-lg">{t.additionalFeatures}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 justify-items-start gap-3">
                {Object.entries(t.features).map(([key, value]) => (
                    <div key={key} className="w-full flex items-center justify-start space-x-2 border rounded-md h-full p-3">
                        <Checkbox
                            id={key}
                            checked={additionalFeatures.includes(key)}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    setAdditionalFeatures((prev) => [
                                        ...prev,
                                        key,
                                    ]);
                                } else {
                                    setAdditionalFeatures((prev) =>
                                        prev.filter(
                                            (feature) => feature !== key
                                        )
                                    );
                                }
                            }}
                        />
                        <Label htmlFor={key}>{value}</Label>
                    </div>
                ))}
            </div>
        </div>
    );
}
