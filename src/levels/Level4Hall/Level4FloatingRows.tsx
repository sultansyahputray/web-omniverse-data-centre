import React from 'react';
import { ScreenPosition } from '../../types';
import { ChevronRightIcon } from '../../Icons';

export interface HallRowItem {
    id: string;
    label: string;
    rowNum: number;
    rack1Key: string;
    rack10Key: string;
    defaultPos1: { x: number; y: number };
    defaultPos10: { x: number; y: number };
    offsetX?: number;
    offsetY?: number;
    anchor?: 'rack1' | 'rack10' | 'auto';
}

export interface RowPlacement {
    offsetX?: number;
    offsetY?: number;
    anchor?: 'rack1' | 'rack10' | 'auto';
    visible?: boolean;
}

/**
 * =========================================================================
 * KONFIGURASI POSISI FLOATING BUTTON ROW (ROW A s/d ROW F) DI LEVEL 4 DATA HALL
 * =========================================================================
 * Anda dapat menggeser masing-masing tombol row di layar secara bebas di sini:
 * 
 * - offsetX: Geser horizontal dalam satuan PERSEN (%) lebar layar:
 *            Nilai POSITIF (+) = geser ke KANAN (contoh: 2, 4, 8)
 *            Nilai NEGATIF (-) = geser ke KIRI (contoh: -2, -4, -8)
 * 
 * - offsetY: Geser vertikal dalam satuan PERSEN (%) tinggi layar:
 *            Nilai POSITIF (+) = geser ke BAWAH (contoh: 2, 5)
 *            Nilai NEGATIF (-) = geser ke ATAS (contoh: -2, -5)
 * 
 * - anchor:  'rack1'  -> Mengikuti posisi rack depan (Rack 01)
 *            'rack10' -> Mengikuti posisi rack belakang (Rack 10)
 *            'auto'   -> Otomatis pindah jika tertutup card Computing
 * 
 * Perubahan di sini langsung terupdate otomatis di browser (Vite Hot Reload)!
 */
export const DEFAULT_HALL_ROW_PLACEMENTS: Record<string, RowPlacement> = {
    row_01: { offsetX: -5, offsetY: 0, anchor: 'rack1' },  // Row A
    row_02: { offsetX: -8, offsetY: -10, anchor: 'rack1' },  // Row B
    row_03: { offsetX: -10, offsetY: -9, anchor: 'rack1' }, // Row C (dipisah ke kiri)
    row_04: { offsetX: -3, offsetY: -15, anchor: 'rack1' },  // Row D (dipisah ke kanan)
    row_05: { offsetX: -5, offsetY: -11, anchor: 'rack1' }, // Row E (dipisah ke kiri)
    row_06: { offsetX: 2, offsetY: -15, anchor: 'rack1' },  // Row F (dipisah ke kanan)
};

export const HALL_ROW_ITEMS: HallRowItem[] = [
    {
        id: 'row_01',
        label: 'Row A',
        rowNum: 1,
        rack1Key: 'rack_01_01',
        rack10Key: 'rack_01_10',
        defaultPos1: { x: 16.5, y: 88.5 },
        defaultPos10: { x: 74.0, y: 88.5 }
    },
    {
        id: 'row_02',
        label: 'Row B',
        rowNum: 2,
        rack1Key: 'rack_02_01',
        rack10Key: 'rack_02_10',
        defaultPos1: { x: 18.5, y: 76.5 },
        defaultPos10: { x: 71.0, y: 76.5 }
    },
    {
        id: 'row_03',
        label: 'Row C',
        rowNum: 3,
        rack1Key: 'rack_03_01',
        rack10Key: 'rack_03_10',
        defaultPos1: { x: 21.0, y: 62.5 },
        defaultPos10: { x: 67.5, y: 62.5 }
    },
    {
        id: 'row_04',
        label: 'Row D',
        rowNum: 4,
        rack1Key: 'rack_04_01',
        rack10Key: 'rack_04_10',
        defaultPos1: { x: 23.5, y: 50.5 },
        defaultPos10: { x: 64.0, y: 50.5 }
    },
    {
        id: 'row_05',
        label: 'Row E',
        rowNum: 5,
        rack1Key: 'rack_05_01',
        rack10Key: 'rack_05_10',
        defaultPos1: { x: 26.0, y: 38.5 },
        defaultPos10: { x: 61.0, y: 38.5 }
    },
    {
        id: 'row_06',
        label: 'Row F',
        rowNum: 6,
        rack1Key: 'rack_06_01',
        rack10Key: 'rack_06_10',
        defaultPos1: { x: 28.5, y: 28.0 },
        defaultPos10: { x: 58.5, y: 19.5 }
    }
];

export interface Level4FloatingRowsProps {
    screenPositions?: Record<string, ScreenPosition>;
    rowPlacements?: Record<string, RowPlacement>;
    onSelectRow?: (row: HallRowItem) => void;
}

export const Level4FloatingRows: React.FC<Level4FloatingRowsProps> = ({
    screenPositions,
    rowPlacements = DEFAULT_HALL_ROW_PLACEMENTS,
    onSelectRow
}) => {
    // Helper to detect if a screen coordinate is occluded by the Computing Summary card
    const isUnderComputingCard = (x: number, y: number) => {
        return x <= 30.0 && y <= 25.0;
    };

    return (
        <div className="level4-floating-rows-layer">
            {HALL_ROW_ITEMS.map((row) => {
                const placement: RowPlacement =
                    (rowPlacements && (rowPlacements[row.id] || rowPlacements[row.label])) || {
                        offsetX: row.offsetX ?? 0,
                        offsetY: row.offsetY ?? 0,
                        anchor: row.anchor ?? 'rack1'
                    };

                const pos1 = screenPositions ? screenPositions[row.rack1Key] : undefined;
                const pos10 = screenPositions ? screenPositions[row.rack10Key] : undefined;
                const anchor = placement.anchor || row.anchor || 'rack1';

                let chosenX: number;
                let chosenY: number;
                let isVisible: boolean;

                if (anchor === 'rack10') {
                    chosenX = pos10 ? pos10.x : row.defaultPos10.x;
                    chosenY = pos10 ? pos10.y : row.defaultPos10.y;
                    isVisible = pos10 !== undefined ? pos10.visible : true;
                } else if (anchor === 'auto') {
                    const c1X = pos1 ? pos1.x : row.defaultPos1.x;
                    const c1Y = pos1 ? pos1.y : row.defaultPos1.y;
                    const occluded = isUnderComputingCard(c1X, c1Y);

                    if (occluded && pos10 && pos10.visible) {
                        chosenX = pos10.x;
                        chosenY = pos10.y;
                        isVisible = true;
                    } else {
                        chosenX = c1X;
                        chosenY = c1Y;
                        isVisible = pos1 !== undefined ? pos1.visible : true;
                    }
                } else {
                    // Default: 'rack1' (front aisle/rack of each row)
                    chosenX = pos1 ? pos1.x : row.defaultPos1.x;
                    chosenY = pos1 ? pos1.y : row.defaultPos1.y;
                    isVisible = pos1 !== undefined ? pos1.visible : true;
                }

                // Explicit override from placement config if set
                if (placement.visible !== undefined) {
                    isVisible = placement.visible;
                }

                // Apply user-configured offsets (just like Country Level)
                const offsetX = placement.offsetX ?? row.offsetX ?? 0;
                const offsetY = placement.offsetY ?? row.offsetY ?? 0;

                const finalX = chosenX + offsetX;
                const finalY = chosenY + offsetY;

                return (
                    <div
                        key={row.id}
                        className="floating-row-btn-container"
                        style={{
                            left: `${finalX}%`,
                            top: `${finalY}%`,
                            opacity: isVisible ? 1 : 0,
                            pointerEvents: isVisible ? 'auto' : 'none',
                            visibility: isVisible ? 'visible' : 'hidden'
                        }}
                    >
                        <button
                            className="floating-row-pill-btn"
                            onClick={() => (onSelectRow ? onSelectRow(row) : undefined)}
                            title={`Select ${row.label} (${row.id})`}
                        >
                            <span className="floating-row-text">{row.label}</span>
                            <span className="floating-row-arrow">
                                <ChevronRightIcon size={14} color="#ffffff" />
                            </span>
                        </button>
                    </div>
                );
            })}
        </div>
    );
};
