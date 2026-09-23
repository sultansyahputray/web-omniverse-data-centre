import React, { useState, useEffect, createContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

import '../GlobalDashboard.css';
import './Reusable.css';

export interface TreeHierarchyNode {
    id: string;
    label: string;
    click_callback?: ((e: any) => void) | null;
    children?: TreeHierarchyNode[];
    defaultExpand?: boolean;
}

export interface TreeHierarchyProps {
    node: TreeHierarchyNode;
    is_expand?: boolean;
    activeId?: string;
}

const TreeItem = ({
    node,
    activeId,
    level = 0
}: {
    node: TreeHierarchyNode;
    activeId?: string;
    level?: number;
}) => {
    const { id, label, click_callback, children = [], defaultExpand = false } = node;
    const [isExpand, setIsExpand] = useState<boolean>(defaultExpand);

    useEffect(() => {
        if (defaultExpand) {
            setIsExpand(true);
        }
    }, [defaultExpand]);

    const handleButtonClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpand(!isExpand);
    };

    const handleLabelClick = (e: React.MouseEvent) => {
        if (click_callback != null) {
            click_callback(e);
        }
    };

    const hasChildren = children && children.length > 0;
    const isActive = activeId === id;

    return (
        <li className={`tree-node-item level-${level}`} id={id}>
            <div
                className={`tree-item-row ${isActive ? 'active' : ''}`}
                onClick={handleLabelClick}
            >
                {hasChildren ? (
                    <button
                        type="button"
                        onClick={handleButtonClick}
                        className="tree-content-expand-collapse-button"
                        aria-label={isExpand ? 'Collapse' : 'Expand'}
                    >
                        <FontAwesomeIcon
                            icon={isExpand ? 'fa-solid fa-caret-down' : 'fa-solid fa-caret-right'}
                            style={{ color: '#FFFFFF', fontSize: '11px' }}
                        />
                    </button>
                ) : (
                    <span className="tree-leaf-spacer" />
                )}
                <span
                    id={id}
                    className={`tree-item-label ${isActive ? 'active' : ''}`}
                >
                    {label}
                </span>
            </div>
            {hasChildren && isExpand && (
                <ul className="parent-node-container expand">
                    {children.map((child) => (
                        <TreeItem
                            key={child.id}
                            node={child}
                            activeId={activeId}
                            level={level + 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};

export const TreeHierarchy = ({ node, is_expand = true, activeId }: TreeHierarchyProps) => {
    if (!node || !node.children) return null;

    return (
        <ul className={is_expand ? 'parent-node-container root expand' : 'parent-node-container root collapse'}>
            {node.children.map((child) => (
                <TreeItem
                    key={child.id}
                    node={child}
                    activeId={activeId}
                    level={0}
                />
            ))}
        </ul>
    );
};
