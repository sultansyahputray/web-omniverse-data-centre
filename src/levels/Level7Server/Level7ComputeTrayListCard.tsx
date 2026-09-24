import React, { useMemo } from 'react';
import { MicrochipIcon } from '../../Icons';
import { TreeHierarchy, TreeHierarchyNode } from '../../reusable/TreeHierarchy';
import './Level7Server.css';

interface Level7ComputeTrayListCardProps {
    activeServerNum: number;
    activeSuperchipNum?: number;
    onSelectServer?: (serverId: string, serverNum: number) => void;
    onSelectSuperChip?: (chipNum: number, trayNum?: number) => void;
    onSelectPrim?: (primPath: string) => void;
}

export const Level7ComputeTrayListCard: React.FC<Level7ComputeTrayListCardProps> = ({
    activeServerNum,
    activeSuperchipNum,
    onSelectServer,
    onSelectSuperChip,
    onSelectPrim
}) => {
    // Generate compute trays hierarchy matching exact stage structure:
    // compute_tray
    //   -> CT_01
    //      -> super_chip_01_1
    //         -> SP_01_1
    //         -> vera_01_1_1
    //         -> rubin_01_1_1
    //         -> rubin_01_1_2
    //      -> super_chip_01_2
    //         -> SP_01_2
    //         -> vera_01_2_1
    //         -> rubin_01_2_1
    //         -> rubin_01_2_2
    //   -> CT_02 ...
    const treeData: TreeHierarchyNode = useMemo(() => {
        const trays: TreeHierarchyNode[] = [];

        for (let i = 1; i <= 18; i++) {
            const formattedTray = String(i).padStart(2, '0');
            const isActiveTray = i === activeServerNum;
            const trayPrimPath = `/World/compute_tray/CT_${formattedTray}`;

            const superChips: TreeHierarchyNode[] = [1, 2].map((scNum) => {
                const scPrimName = `super_chip_${formattedTray}_${scNum}`;
                const scPrimPath = `${trayPrimPath}/${scPrimName}`;

                const veraPrimName = `vera_${formattedTray}_${scNum}_1`;
                const veraPrimPath = `${scPrimPath}/${veraPrimName}`;

                const rubin1PrimName = `rubin_${formattedTray}_${scNum}_1`;
                const rubin1PrimPath = `${scPrimPath}/${rubin1PrimName}`;

                const rubin2PrimName = `rubin_${formattedTray}_${scNum}_2`;
                const rubin2PrimPath = `${scPrimPath}/${rubin2PrimName}`;

                return {
                    id: scPrimPath,
                    label: `Super Chip ${scNum}`,
                    defaultExpand: isActiveTray && (activeSuperchipNum === scNum),
                    click_callback: () => {
                        if (onSelectSuperChip) {
                            onSelectSuperChip(scNum, i);
                        }
                        onSelectPrim?.(scPrimPath);
                    },
                    children: [
                        {
                            id: veraPrimPath,
                            label: 'Vera CPU 1',
                            click_callback: () => {
                                onSelectSuperChip?.(scNum, i);
                                onSelectPrim?.(veraPrimPath);
                            },
                            children: []
                        },
                        {
                            id: rubin1PrimPath,
                            label: 'Rubin GPU 1',
                            click_callback: () => {
                                onSelectSuperChip?.(scNum, i);
                                onSelectPrim?.(rubin1PrimPath);
                            },
                            children: []
                        },
                        {
                            id: rubin2PrimPath,
                            label: 'Rubin GPU 2',
                            click_callback: () => {
                                onSelectSuperChip?.(scNum, i);
                                onSelectPrim?.(rubin2PrimPath);
                            },
                            children: []
                        }
                    ]
                };
            });

            trays.push({
                id: trayPrimPath,
                label: `Compute Tray ${i}`,
                defaultExpand: isActiveTray,
                click_callback: () => {
                    if (onSelectServer) {
                        onSelectServer(`VR_${i}`, i);
                    }
                    onSelectPrim?.(trayPrimPath);
                },
                children: superChips
            });
        }

        return {
            id: 'root',
            label: 'root',
            children: trays
        };
    }, [activeServerNum, activeSuperchipNum, onSelectServer, onSelectSuperChip, onSelectPrim]);

    const activeNodeId = activeSuperchipNum
        ? `/World/compute_tray/CT_${String(activeServerNum).padStart(2, '0')}/super_chip_${String(activeServerNum).padStart(2, '0')}_${activeSuperchipNum}`
        : `/World/compute_tray/CT_${String(activeServerNum).padStart(2, '0')}`;

    return (
        <div className="level7-compute-tray-card">
            {/* Header: Microchip Icon + Title */}
            <div className="compute-tray-card-header">
                <MicrochipIcon size={20} color="rgba(113, 246, 255, 1)" />
                <h3 className="compute-tray-card-title">Compute Tray List</h3>
            </div>

            {/* HORIZONTAL DIVIDER */}
            <div className="title-h-divider"></div>

            {/* Tree Scroll Area */}
            <div className="compute-tray-tree-scroll">
                <TreeHierarchy
                    node={treeData}
                    is_expand={true}
                    activeId={activeNodeId}
                />
            </div>
        </div>
    );
};
