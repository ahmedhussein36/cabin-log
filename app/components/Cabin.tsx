/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { translations } from "@/app/i18n/translations";
import { Languages } from "lucide-react";
import { useVilla } from "@/app/contexts/VillaContext";
import { useRouter } from "next/navigation";
import MainArea from "@/app/components/MainArea";
import ExtraRoom from "@/app/components/ExtraRoom";
import Bathroom from "@/app/components/Bathroom";
import Doors from "@/app/components/Doors";
import Windows from "@/app/components/Windows";
import AdditionalFeatures from "@/app/components/AdditionalFeatures";

const METER_PRICE = 1200;

export default function Cabin() {
    const router = useRouter();
    const {
        lang,
        setLang,
        length,
        width,
        doors,
        windows,
        additionalRoom,
        additionalRoomCount,
        doorType,
        windowType,
        bathroomLocation,
        additionalFeatures,
    } = useVilla();
    const t = translations[lang];

    const calculatePrice = () => {
        const basePrice = length * width * METER_PRICE;
        const doorsPrice = doors * 0;
        const windowsPrice = windows * 0;
        const roomsPrice =
            additionalRoom === "yes" ? additionalRoomCount * 1000 : 0;
        return basePrice + doorsPrice + windowsPrice + roomsPrice;
    };

    const handleContinue = () => {
        router.push("/cost-summery");
    };

    return (
        <div
            className={`min-h-screen p-4 bg-background to-primary/10 transition-all duration-300 ${
                lang === "ar" ? "rtl" : "ltr"
            }`}
        >
            <Card className="max-w-2xl mx-auto backdrop-blur-sm border-0 bg-background/80 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between rounded-t-lg">
                    <CardTitle className="text-2xl font-bold">
                        {t.title}
                    </CardTitle>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setLang(lang === "en" ? "ar" : "en")}
                    >
                        <Languages className="h-5 w-5" />
                    </Button>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="bg-primary text-primary-foreground p-4 rounded-lg text-center">
                        <span className="font-bold">{t.meterPrice}: </span>
                        <span>
                            {METER_PRICE} {t.price}
                        </span>
                    </div>

                    <MainArea />
                    <ExtraRoom />
                    <Bathroom />
                    <Doors />
                    <Windows />
                    <AdditionalFeatures />

                    {/* Total Price */}
                    <div className="pt-6 border-t border-primary/20">
                        <div className="flex justify-between items-center p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/20 transition-all duration-300">
                            <span className="text-xl font-bold text-primary">
                                {t.total}:
                            </span>
                            <span className="text-xl font-bold text-primary">
                                {calculatePrice().toLocaleString()} {t.price}
                            </span>
                        </div>
                    </div>

                    {/* Continue Button */}
                    <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300"
                        size="lg"
                        onClick={handleContinue}
                    >
                        {t.continue}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
