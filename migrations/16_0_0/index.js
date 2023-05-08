"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var schematics_1 = require("@angular-devkit/schematics");
var schematics_core_1 = require("../../schematics-core");
var letModuleText = 'LetModule';
var letDirectiveText = 'LetDirective';
var pushModuleText = 'PushModule';
var pushPipeText = 'PushPipe';
var moduleLocations = {
    imports: ['NgModule', 'Component'],
    exports: ['NgModule'],
};
function migrateToStandaloneAPIs() {
    return function (tree) {
        (0, schematics_core_1.visitTSSourceFiles)(tree, function (sourceFile) {
            var componentImports = sourceFile.statements
                .filter(ts.isImportDeclaration)
                .filter(function (_a) {
                var moduleSpecifier = _a.moduleSpecifier;
                return moduleSpecifier.getText(sourceFile).includes('@ngrx/component');
            });
            if (componentImports.length === 0) {
                return;
            }
            var ngModuleReplacements = findNgModuleReplacements(sourceFile);
            var possibleModulesUsageCount = findPossibleModulesUsageCount(sourceFile);
            var importAdditionReplacements = findImportDeclarationAdditions(sourceFile, componentImports);
            var jsImportDeclarationReplacements = possibleModulesUsageCount >
                ngModuleReplacements.length + importAdditionReplacements.length
                ? importAdditionReplacements
                : findImportDeclarationReplacements(sourceFile, componentImports);
            var changes = __spreadArray(__spreadArray([], __read(jsImportDeclarationReplacements), false), __read(ngModuleReplacements), false);
            (0, schematics_core_1.commitChanges)(tree, sourceFile.fileName, changes);
        });
    };
}
function findImportDeclarationReplacements(sourceFile, imports) {
    return findImportDeclarations(sourceFile, imports)
        .map(function (_a) {
        var specifier = _a.specifier, oldText = _a.oldText, newText = _a.newText;
        return !!specifier && !!oldText
            ? (0, schematics_core_1.createReplaceChange)(sourceFile, specifier, oldText, newText)
            : undefined;
    })
        .filter(function (change) { return !!change; });
}
function findImportDeclarationAdditions(sourceFile, imports) {
    return findImportDeclarations(sourceFile, imports)
        .map(function (_a) {
        var specifier = _a.specifier, oldText = _a.oldText, newText = _a.newText;
        return !!specifier && !!oldText
            ? (0, schematics_core_1.createReplaceChange)(sourceFile, specifier, oldText, "".concat(oldText, ", ").concat(newText))
            : undefined;
    })
        .filter(function (change) { return !!change; });
}
function findImportDeclarations(sourceFile, imports) {
    return imports
        .map(function (p) { var _a, _b; return (_b = (_a = p === null || p === void 0 ? void 0 : p.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings) === null || _b === void 0 ? void 0 : _b.elements; })
        .reduce(function (imports, curr) { return imports.concat(curr !== null && curr !== void 0 ? curr : []); }, [])
        .map(function (specifier) {
        var _a, _b;
        if (!ts.isImportSpecifier(specifier)) {
            return { hit: false };
        }
        if (specifier.name.text === letModuleText) {
            return {
                hit: true,
                specifier: specifier,
                oldText: specifier.name.text,
                newText: letDirectiveText,
            };
        }
        if (specifier.name.text === pushModuleText) {
            return {
                hit: true,
                specifier: specifier,
                oldText: specifier.name.text,
                newText: pushPipeText,
            };
        }
        // if `LetModule` import is renamed
        if (((_a = specifier.propertyName) === null || _a === void 0 ? void 0 : _a.text) === letModuleText) {
            return {
                hit: true,
                specifier: specifier,
                oldText: specifier.propertyName.text,
                newText: letDirectiveText,
            };
        }
        // if `PushModule` import is renamed
        if (((_b = specifier.propertyName) === null || _b === void 0 ? void 0 : _b.text) === pushModuleText) {
            return {
                hit: true,
                specifier: specifier,
                oldText: specifier.propertyName.text,
                newText: pushPipeText,
            };
        }
        return { hit: false };
    })
        .filter(function (_a) {
        var hit = _a.hit;
        return hit;
    });
}
function findPossibleModulesUsageCount(sourceFile) {
    var count = 0;
    ts.forEachChild(sourceFile, function (node) { return countUsages(node); });
    return count;
    function countUsages(node) {
        if (ts.isIdentifier(node) &&
            (node.text === letModuleText || node.text === pushModuleText)) {
            count = count + 1;
        }
        ts.forEachChild(node, function (childNode) { return countUsages(childNode); });
    }
}
function findNgModuleReplacements(sourceFile) {
    var changes = [];
    ts.forEachChild(sourceFile, function (node) { return find(node, changes); });
    return changes;
    function find(node, changes) {
        var change = undefined;
        if (ts.isIdentifier(node) &&
            (node.text === letModuleText || node.text === pushModuleText) &&
            ts.isArrayLiteralExpression(node.parent) &&
            ts.isPropertyAssignment(node.parent.parent)) {
            var property = node.parent.parent;
            if (ts.isIdentifier(property.name)) {
                var propertyName = String(property.name.escapedText);
                if (Object.keys(moduleLocations).includes(propertyName)) {
                    var decorator = property.parent.parent.parent;
                    if (ts.isDecorator(decorator) &&
                        ts.isCallExpression(decorator.expression) &&
                        ts.isIdentifier(decorator.expression.expression) &&
                        moduleLocations[propertyName].includes(String(decorator.expression.expression.escapedText))) {
                        change = {
                            node: node,
                            oldText: node.text,
                            newText: node.text === letModuleText ? letDirectiveText : pushPipeText,
                        };
                    }
                }
            }
        }
        if (change) {
            changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, change.node, change.oldText, change.newText));
        }
        ts.forEachChild(node, function (childNode) { return find(childNode, changes); });
    }
}
function default_1() {
    return (0, schematics_1.chain)([migrateToStandaloneAPIs()]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map