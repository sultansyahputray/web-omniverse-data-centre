import React, { useMemo } from 'react';
import { MicrochipIcon } from '../../Icons';
import { TreeHierarchy, TreeHierarchyNode } from '../../reusable/TreeHierarchy';
import './Level7Server.css';

interface Level7ComputeTrayListCardProps {
    activeServerNum: number;
    onSelectServer?: (serverId: string, serverNum: number) => void;
}

export const Level7ComputeTrayListCard: React.FC<Level7ComputeTrayListCardProps> = ({
    activeServerNum,
    onSelectServer
}) => {
    // Generate 18 compute trays hierarchy
    const treeData: TreeHierarchyNode = useMemo(() => {
        const trays: TreeHierarchyNode[] = [];

        for (let i = 1; i <= 18; i++) {
            const trayId = `tray_${i}`;
            const isActiveTray = i === activeServerNum;

            const superChips: TreeHierarchyNode[] = [1, 2].map((scNum) => {
                const scId = `${trayId}_sc_${scNum}`;
                return {
                    id: scId,
                    label: `Super Chip ${scNum}`,
                    defaultExpand: false,
                    children: [
                        {
                            id: `${scId}_cpu_1`,
                            label: 'Vera CPU 1',
                            children: []
                        },
                        {
                            id: `${scId}_gpu_1`,
                            label: 'Rubin GPU 1',
                            children: []
                        },
                        {
                            id: `${scId}_gpu_2`,
                            label: 'Rubin GPU 2',
                            children: []
                        }
                    ]
                };
            });

            trays.push({
                id: trayId,
                label: `Compute Tray ${i}`,
                defaultExpand: isActiveTray,
                click_callback: () => {
                    if (onSelectServer) {
                        onSelectServer(`VR_${i}`, i);
                    }
                },
                children: superChips
            });
        }

        return {
            id: 'root',
            label: 'root',
            children: trays
        };
    }, [activeServerNum, onSelectServer]);

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
                    activeId={`tray_${activeServerNum}`}
                />
            </div>
        </div>
    );
};
