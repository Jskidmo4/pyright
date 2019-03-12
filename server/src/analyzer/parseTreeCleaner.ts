/*
* parseTreeCleaner.ts
* Copyright (c) Microsoft Corporation. All rights reserved.
* Author: Eric Traut
*
* A parse tree walker that's used to clean any analysis
* information hanging off the parse tree. It's used when
* dependent files have been modified and the file requires
* reanalysis. Without this, we'd need to generate a fresh
* parse tree from scratch.
*/

import { ModuleNode, ParseNode } from '../parser/parseNodes';
import { AnalyzerNodeInfo } from './analyzerNodeInfo';
import { ParseTreeWalker } from './parseTreeWalker';

export class ParseTreeCleanerWalker extends ParseTreeWalker {
    private _parseTree: ModuleNode;

    constructor(parseTree: ModuleNode) {
        super();

        this._parseTree = parseTree;
    }

    clean() {
        this.walk(this._parseTree);
    }

    visitNode(node: ParseNode): boolean {
        AnalyzerNodeInfo.cleanNodeAnalysisInfo(node);
        return true;
    }
}
