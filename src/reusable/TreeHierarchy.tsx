import React, { Fragment, useState, useEffect, useMemo, useRef, useReducer } from 'react';

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
    children: TreeHierarchyNode[]
} 

interface TreeHierarchyProps {
    content: TreeHierarchyNode
}

export const TreeHierarchy = ({ content }: TreeHierarchyProps) => {
    const TreeHTMLCreator = (parent_node: TreeHierarchyNode) => {
        return (
            <ul className="parent-node-container">
                {parent_node.children.map((node, idx) => (
                    <Fragment>
                        <li id={node.id}>{node.label}</li>
                        {node.children.length > 0 && TreeHTMLCreator(node)}
                    </Fragment>
                ))}
            </ul>
        )
    };

    return (
        TreeHTMLCreator(content)
    );
}