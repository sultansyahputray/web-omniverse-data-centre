import React, { Fragment, useState, useEffect, useMemo, useRef, useContext, createContext } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)

import '../GlobalDashboard.css';
import './Reusable.css';

export interface TreeHierarchyNode {
    id: string,
    label: string,
    click_callback: (e: Event) => void | null
    children: TreeHierarchyNode[]
} 

interface TreeHierarchyProps {
    node: TreeHierarchyNode,
    is_expand: boolean
}

const IsExpandContext = createContext<boolean>(true);

const TreeItem = ({ id, label, click_callback, children }: TreeHierarchyNode) => {
    const [isExpand, setIsExpand] = useState<boolean>(true);
    
    const handleButtonClick = () => {
        setIsExpand(!isExpand)
    };

    const handleLabelClick = (e) => {
        if (click_callback != null) {
            click_callback(e);
        }
    }

    return (
        <IsExpandContext.Provider value={isExpand}>
            <li id={id}>
                {children.length > 0 && <button onClick={handleButtonClick} className="tree-content-expand-collapse-button"><FontAwesomeIcon icon={isExpand ? "fa-solid fa-caret-right" : "fa-solid fa-caret-down"} style={{color: "#FFFFFF",}} /></button>}
                <label id={id} onClick={handleLabelClick}>{label}</label>
            </li>
            {(children.length > 0 && isExpand) && <TreeHierarchy node={{id: id, label: label, children: children}} is_expand={isExpand}></TreeHierarchy>}
        </IsExpandContext.Provider>
    );
}

export const TreeHierarchy = ({ node, is_expand }: TreeHierarchyProps) => {
    return (
        <ul className={is_expand ? "parent-node-container expand" : "parent-node-container collapse"}>
            {node.children.map((child, idx) => (
                <TreeItem id={child.id} label={child.label} children={child.children} click_callback={child.click_callback}></TreeItem>
            ))}
        </ul>
    );
}
