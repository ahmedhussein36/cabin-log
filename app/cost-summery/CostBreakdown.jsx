"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { translations } from "../i18n/translations";
import ContactModal from "../components/ContactModal";
import { useVilla } from "../contexts/VillaContext";
import { VillaProvider } from "../contexts/VillaContext";
import React from "react";

const METER_PRICE = 1200;
const ADDITIONAL_ROOM_AREA = 12;
const BATHROOM_AREA = 6;

export default function CostBreakdown() {
    const {
        lang,
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
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);

    const calculatePrice = () => {
        const basePrice = length * width * METER_PRICE;
        const doorsPrice = doors * 100;
        const windowsPrice = windows * 100;
        const roomsPrice =
            additionalRoom === "yes" ? additionalRoomCount * 1000 : 0;
        const bathroomPrice =
            bathroomLocation === "outside" ? BATHROOM_AREA * METER_PRICE : 0;
        const featuresPrice = additionalFeatures.length * 1000;
        return (
            basePrice +
            doorsPrice +
            windowsPrice +
            roomsPrice +
            bathroomPrice +
            featuresPrice
        );
    };

    const totalArea = length * width;
    const additionalRoomsArea =
        additionalRoom === "yes"
            ? additionalRoomCount * ADDITIONAL_ROOM_AREA
            : 0;
    const totalAreaWithExtras =
        totalArea +
        additionalRoomsArea +
        (bathroomLocation === "outside" ? BATHROOM_AREA : 0);

    const costSections = [
        {
            title: t.mainArea,
            items: [
                {
                    name: `${length} x ${width} m²`,
                    quantity: 1,
                    unitPrice: length * width * METER_PRICE,
                    totalPrice: length * width * METER_PRICE,
                },
            ],
        },
        {
            title: t.doors,
            items: [
                {
                    name: t.doorTypes[doorType],
                    quantity: doors,
                    unitPrice: 100,
                    totalPrice: doors * 500,
                },
            ],
        },
        {
            title: t.windows,
            items: [
                {
                    name: (t.windowTypes[windowType]),
                    quantity: windows,
                    unitPrice: 100,
                    totalPrice: windows * 300,
                },
            ],
        },
        ...(additionalRoom === "yes"
            ? [
                  {
                      title: t.additionalRooms,
                      items: [
                          {
                              name: t.additionalRooms,
                              quantity: additionalRoomCount,
                              unitPrice: 2000,
                              totalPrice: additionalRoomCount * 2000,
                          },
                      ],
                  },
              ]
            : []),
        ...(bathroomLocation === "outside"
            ? [
                  {
                      title: t.bathroom,
                      items: [
                          {
                              name: t.bathroomLocationOutside,
                              quantity: 1,
                              unitPrice: BATHROOM_AREA * METER_PRICE,
                              totalPrice: BATHROOM_AREA * METER_PRICE,
                          },
                      ],
                  },
              ]
            : []),
        ...(additionalFeatures.length > 0
            ? [
                  {
                      title: t.additionalFeaturesTitle,
                      items: additionalFeatures.map((feature) => ({
                          name: t.features[feature],
                          quantity: 1,
                          unitPrice: 0,
                          totalPrice: 0,
                      })),
                  },
              ]
            : []),
    ];

    return (
        <VillaProvider>
            <div
                className={`min-h-screen p-4 bg-background ${
                    lang === "ar" ? "rtl" : "ltr"
                }`}
            >
                <Card className="max-w-4xl mx-auto">
                    <CardHeader className="bg-orange-800 rounded-t-lg">
                        <CardTitle className="text-2xl font-bold text-white">
                            {t.costBreakdown}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 p-6">
                        <div className="grid md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                            <div>
                                <h3 className="font-semibold">
                                    {t.projectDetails}
                                </h3>
                                <p>
                                    {t.totalArea}: {totalAreaWithExtras} m²
                                </p>
                                <p>
                                    {t.doorType}: {t.doorTypes[doorType] || "-"}
                                </p>
                                <p>
                                    {t.windowType}:{" "}
                                    {t.windowTypes[windowType] || "-"}
                                </p>
                            </div>
                            <div>
                                {additionalRoom === "yes" && (
                                    <>
                                        <p>
                                            {t.additionalRoomsArea}:{" "}
                                            {additionalRoomsArea} m²
                                        </p>
                                        <p>
                                            {t.additionalRoomsCount}:{" "}
                                            {additionalRoomCount}
                                        </p>
                                    </>
                                )}
                                <p>
                                    {t.bathroomLocation}:{" "}
                                    {bathroomLocation === "inside"
                                        ? t.bathroomLocationInside
                                        : t.bathroomLocationOutside}
                                </p>
                            </div>
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow className="bg-gray-100">
                                    <TableHead className="w-1/3">
                                        {t.description}
                                    </TableHead>
                                    <TableHead className="w-1/6 text-center">
                                        {t.quantity}
                                    </TableHead>
                                    <TableHead className="w-1/6 text-center">
                                        {t.unitPrice}
                                    </TableHead>
                                    <TableHead className="w-1/3 text-center">
                                        {t.total}
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {costSections.map((section, sectionIndex) => (
                                    <React.Fragment key={sectionIndex}>
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="bg-gray-50 font-bold"
                                            >
                                                {section.title}
                                            </TableCell>
                                        </TableRow>
                                        {section.items.map(
                                            (item, itemIndex) => (
                                                <TableRow key={itemIndex}>
                                                    <TableCell>
                                                        {item.name}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {item.quantity}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {item.unitPrice.toLocaleString()}{" "}
                                                        {t.price}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        {item.totalPrice.toLocaleString()}{" "}
                                                        {t.price}
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </React.Fragment>
                                ))}
                                <TableRow className="font-bold bg-gray-100">
                                    <TableCell colSpan={3}>{t.total}</TableCell>
                                    <TableCell className="text-center">
                                        {calculatePrice().toLocaleString()}{" "}
                                        {t.price}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                        <div className="flex justify-between mt-6">
                            <Button onClick={() => setIsContactModalOpen(true)}>
                                {t.sendRequest}
                            </Button>
                            <Button>{t.buyNow}</Button>
                        </div>
                    </CardContent>
                </Card>
                <ContactModal
                    isOpen={isContactModalOpen}
                    onClose={() => setIsContactModalOpen(false)}
                />
            </div>
        </VillaProvider>
    );
}
