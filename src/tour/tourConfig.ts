// SPDX-FileCopyrightText: Copyright (c) 2024 NVIDIA CORPORATION & AFFILIATES. All rights reserved.
// SPDX-License-Identifier: LicenseRef-NvidiaProprietary

export interface TourStepActionContext {
    // Level 1 & Country
    selectRegionFromEarth: (regionKey: string) => Promise<void>;
    selectCountry: (countryKey: string) => Promise<void>;
    backToGlobal: () => Promise<void>;
    backFromRegion: () => Promise<void>;

    // Level 3 Building
    selectBuilding: () => Promise<void>;
    backToRegion: () => Promise<void>;
    setBuildingSubView: (subView: 'cutaway' | 'power_details' | 'cooling_details', coolingMode?: 'liquid' | 'air') => void;

    // ViewCube / Camera views
    selectCameraView: (view: 'iso' | 'front' | 'back' | 'left' | 'right' | 'top') => Promise<void>;

    // Level 4 Data Hall
    enterHall: (hallId: string) => Promise<void>;
    backToBuilding: () => Promise<void>;

    // Level 5 Row
    selectRow: (rowNum: number) => Promise<void>;
    backToHall: () => Promise<void>;

    // Level 6 Rack
    selectRack: (rackId: string, rackNum: number) => Promise<void>;
    backToRowFromRack: () => Promise<void>;

    // Level 7 Server / Compute Tray
    selectServer: (serverId: string, serverNum: number) => Promise<void>;
    backToRackFromServer: () => Promise<void>;

    // Level 8 Superchip
    selectSuperChip: (chipNum: number) => Promise<void>;
    backToServerFromSuperchip: () => Promise<void>;

    // Heatmap
    toggleHeatmap: (checked: boolean) => Promise<void>;

    // Load Scenario
    selectScenario: (scenario: string) => Promise<void>;
}

export interface TourStep {
    id: string;
    label: string;
    durationMs: number;
    action: (ctx: TourStepActionContext) => Promise<void> | void;
}

export const AUTO_TOUR_STEPS: TourStep[] = [
    // 1. Globe (Earth)
    {
        id: 'step_1_globe',
        label: 'Level 1: Global Earth Inspection',
        durationMs: 7000,
        action: async (ctx) => {
            await ctx.backToGlobal();
        }
    },
    // 2. Click Southeast Asia
    {
        id: 'step_2_sea',
        label: 'Select Southeast Asia Cluster',
        durationMs: 7000,
        action: async (ctx) => {
            await ctx.selectRegionFromEarth('SEA');
        }
    },
    // 3. Click Batam
    {
        id: 'step_3_batam',
        label: 'Level 2: Batam Region Campus',
        durationMs: 5000,
        action: async (ctx) => {
            await ctx.selectCountry('BTM');
        }
    },
    // 4. Click Main Hall (Building Cutaway)
    {
        id: 'step_4_building',
        label: 'Level 3: Building Cutaway',
        durationMs: 5000,
        action: async (ctx) => {
            await ctx.selectBuilding();
        }
    },
    // 5. Click Power Details
    {
        id: 'step_5_power_details',
        label: 'Level 3: Electrical Power Path',
        durationMs: 3000,
        action: async (ctx) => {
            ctx.setBuildingSubView('power_details');
        }
    },
    // 6. Click Dice Left
    {
        id: 'step_6_view_left',
        label: 'Building View: Left Side View',
        durationMs: 3000,
        action: async (ctx) => {
            await ctx.selectCameraView('left');
        }
    },
    // 7. Click Dice Init (Iso)
    {
        id: 'step_7_view_iso_1',
        label: 'Building View: Isometric Init',
        durationMs: 3000,
        action: async (ctx) => {
            await ctx.selectCameraView('iso');
        }
    },
    // 8. Back to Cutaway
    {
        id: 'step_8_back_cutaway_1',
        label: 'Return to Building Cutaway',
        durationMs: 2000,
        action: async (ctx) => {
            ctx.setBuildingSubView('cutaway');
        }
    },
    // 9. Click Cooling Details
    {
        id: 'step_9_cooling_details',
        label: 'Level 3: Cooling Distribution',
        durationMs: 3000,
        action: async (ctx) => {
            ctx.setBuildingSubView('cooling_details', 'liquid');
        }
    },
    // 10. Click Dice Top
    {
        id: 'step_10_view_top',
        label: 'Cooling View: Top-Down Plan',
        durationMs: 5000,
        action: async (ctx) => {
            await ctx.selectCameraView('top');
        }
    },
    // 11. Click button bar Air Cooling
    {
        id: 'step_11_air_cooling',
        label: 'Toggle Mode: Air Cooling Loop',
        durationMs: 3000,
        action: async (ctx) => {
            ctx.setBuildingSubView('cooling_details', 'air');
        }
    },
    // 12. Click Dice Init
    {
        id: 'step_12_view_iso_2',
        label: 'Cooling View: Isometric Init',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectCameraView('iso');
        }
    },
    // 13. Back to Cutaway
    {
        id: 'step_13_back_cutaway_2',
        label: 'Return to Building Cutaway',
        durationMs: 2000,
        action: async (ctx) => {
            ctx.setBuildingSubView('cutaway');
        }
    },
    // 14. Click Hall L1-A
    {
        id: 'step_14_hall_l1_a',
        label: 'Level 4: Data Hall L1-A',
        durationMs: 5000,
        action: async (ctx) => {
            await ctx.enterHall('hall_l1_a');
        }
    },
    // 15. Click Row A
    {
        id: 'step_15_row_a',
        label: 'Level 5: Corridor Row A',
        durationMs: 5000,
        action: async (ctx) => {
            await ctx.selectRow(1);
        }
    },
    // 16. Enter Rack Level (Inject state: Rack 01)
    {
        id: 'step_16_rack_01',
        label: 'Level 6: NVL72 Rack 01',
        durationMs: 5000,
        action: async (ctx) => {
            await ctx.selectRack('rack_01_01', 1);
        }
    },
    // 17. Rack Heatmap ON (Low Load)
    {
        id: 'step_17_rack_heatmap_on',
        label: 'Rack 01: Heatmap ON (Low Load)',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('Normal Load');
            await ctx.toggleHeatmap(true);
        }
    },
    // 18. Rack Load Scenario -> Medium Load
    {
        id: 'step_18_rack_scenario_medium',
        label: 'Rack 01: Medium Load Simulation',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('Medium Load');
        }
    },
    // 19. Rack Load Scenario -> High Load
    {
        id: 'step_19_rack_scenario_high',
        label: 'Rack 01: High Load Simulation',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('High Load');
        }
    },
    // 20. Rack Load Scenario -> Low Load
    {
        id: 'step_20_rack_scenario_low',
        label: 'Rack 01: Return to Low Load',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('Normal Load');
        }
    },
    // 21. Rack Heatmap OFF
    {
        id: 'step_21_rack_heatmap_off',
        label: 'Rack 01: Thermal Heatmap OFF',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.toggleHeatmap(false);
        }
    },
    // 22. Enter Compute Tray Level (Inject state: Compute Tray 01)
    {
        id: 'step_22_tray_01',
        label: 'Level 7: Compute Tray 01',
        durationMs: 5000,
        action: async (ctx) => {
            await ctx.selectServer('VR_1', 1);
        }
    },
    // 23. Compute Tray Heatmap ON (Low Load)
    {
        id: 'step_23_tray_heatmap_on',
        label: 'Compute Tray 01: Heatmap ON (Low Load)',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('Normal Load');
            await ctx.toggleHeatmap(true);
        }
    },
    // 24. Compute Tray Load Scenario -> Medium Load
    {
        id: 'step_24_tray_scenario_medium',
        label: 'Compute Tray 01: Medium Load Simulation',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('Medium Load');
        }
    },
    // 25. Compute Tray Load Scenario -> High Load
    {
        id: 'step_25_tray_scenario_high',
        label: 'Compute Tray 01: High Load Simulation',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('High Load');
        }
    },
    // 26. Compute Tray Load Scenario -> Low Load
    {
        id: 'step_26_tray_scenario_low',
        label: 'Compute Tray 01: Return to Low Load',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('Normal Load');
        }
    },
    // 27. Compute Tray Heatmap OFF
    {
        id: 'step_27_tray_heatmap_off',
        label: 'Compute Tray 01: Heatmap OFF',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.toggleHeatmap(false);
        }
    },
    // 28. Click Super Chip 1
    {
        id: 'step_28_superchip_1',
        label: 'Level 8: Superchip 1 (Vera & Rubin)',
        durationMs: 5000,
        action: async (ctx) => {
            await ctx.selectSuperChip(1);
        }
    },
    // 29. Superchip Heatmap ON (Low Load)
    {
        id: 'step_29_sc_heatmap_on',
        label: 'Superchip 1: Heatmap ON (Low Load)',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('Normal Load');
            await ctx.toggleHeatmap(true);
        }
    },
    // 30. Superchip Load Scenario -> Medium Load
    {
        id: 'step_30_sc_scenario_medium',
        label: 'Superchip 1: Medium Load Simulation',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('Medium Load');
        }
    },
    // 31. Superchip Load Scenario -> High Load
    {
        id: 'step_31_sc_scenario_high',
        label: 'Superchip 1: High Load Simulation',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('High Load');
        }
    },
    // 32. Superchip Load Scenario -> Low Load
    {
        id: 'step_32_sc_scenario_low',
        label: 'Superchip 1: Return to Low Load',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.selectScenario('Normal Load');
        }
    },
    // 33. Superchip Heatmap OFF
    {
        id: 'step_33_sc_heatmap_off',
        label: 'Superchip 1: Thermal Heatmap OFF',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.toggleHeatmap(false);
        }
    },
    // 34. Back to Compute Tray
    {
        id: 'step_34_back_to_tray',
        label: 'Back: Compute Tray 01',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.backToServerFromSuperchip();
        }
    },
    // 35. Back to Rack
    {
        id: 'step_35_back_to_rack',
        label: 'Back: NVL72 Rack 01',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.backToRackFromServer();
        }
    },
    // 36. Back to Row
    {
        id: 'step_36_back_to_row',
        label: 'Back: Corridor Row A',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.backToRowFromRack();
        }
    },
    // 37. Back to Hall
    {
        id: 'step_37_back_to_hall',
        label: 'Back: Data Hall L1-A',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.backToHall();
        }
    },
    // 38. Back to Building Cutaway
    {
        id: 'step_38_back_to_building',
        label: 'Back: Building Cutaway',
        durationMs: 2000,
        action: async (ctx) => {
            await ctx.backToBuilding();
        }
    },
    // 39. Back to Batam Region (End of cycle, pauses at region then loops to Main Hall)
    {
        id: 'step_39_back_to_region',
        label: 'Back: Batam Region Site',
        durationMs: 5000,
        action: async (ctx) => {
            await ctx.backToRegion();
        }
    }
];

// Restart loop index: Building Cutaway (Globe & Southeast Asia only execute once at the beginning)
export const TOUR_LOOP_START_INDEX = AUTO_TOUR_STEPS.findIndex((s) => s.id === 'step_4_building');
