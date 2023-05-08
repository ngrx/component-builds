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
var reactiveComponentModuleText = 'ReactiveComponentModule';
var reactiveComponentModuleReplacement = 'LetModule, PushModule';
var moduleLocations = {
    imports: ['NgModule', 'Component'],
    exports: ['NgModule'],
};
function migrateReactiveComponentModule() {
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
            var ngModuleReplacements = findReactiveComponentModuleNgModuleReplacements(sourceFile);
            var possibleUsagesOfReactiveComponentModuleCount = findPossibleReactiveComponentModuleUsageCount(sourceFile);
            var importAdditionReplacements = findReactiveComponentModuleImportDeclarationAdditions(sourceFile, componentImports);
            var importUsagesCount = importAdditionReplacements.length;
            var jsImportDeclarationReplacements = possibleUsagesOfReactiveComponentModuleCount >
                ngModuleReplacements.length + importUsagesCount
                ? importAdditionReplacements
                : findReactiveComponentModuleImportDeclarationReplacements(sourceFile, componentImports);
            var changes = __spreadArray(__spreadArray([], __read(jsImportDeclarationReplacements), false), __read(ngModuleReplacements), false);
            (0, schematics_core_1.commitChanges)(tree, sourceFile.fileName, changes);
        });
    };
}
function findReactiveComponentModuleImportDeclarationReplacements(sourceFile, imports) {
    var changes = imports
        .map(function (p) { var _a, _b; return (_b = (_a = p === null || p === void 0 ? void 0 : p.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings) === null || _b === void 0 ? void 0 : _b.elements; })
        .reduce(function (imports, curr) { return imports.concat(curr !== null && curr !== void 0 ? curr : []); }, [])
        .map(function (specifier) {
        if (!ts.isImportSpecifier(specifier)) {
            return { hit: false };
        }
        if (specifier.name.text === reactiveComponentModuleText) {
            return { hit: true, specifier: specifier, text: specifier.name.text };
        }
        // if import is renamed
        if (specifier.propertyName &&
            specifier.propertyName.text === reactiveComponentModuleText) {
            return { hit: true, specifier: specifier, text: specifier.propertyName.text };
        }
        return { hit: false };
    })
        .filter(function (_a) {
        var hit = _a.hit;
        return hit;
    })
        .map(function (_a) {
        var specifier = _a.specifier, text = _a.text;
        return !!specifier && !!text
            ? (0, schematics_core_1.createReplaceChange)(sourceFile, specifier, text, reactiveComponentModuleReplacement)
            : undefined;
    })
        .filter(function (change) { return !!change; });
    return changes;
}
function findReactiveComponentModuleImportDeclarationAdditions(sourceFile, imports) {
    var changes = imports
        .map(function (p) { var _a, _b; return (_b = (_a = p === null || p === void 0 ? void 0 : p.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings) === null || _b === void 0 ? void 0 : _b.elements; })
        .reduce(function (imports, curr) { return imports.concat(curr !== null && curr !== void 0 ? curr : []); }, [])
        .map(function (specifier) {
        if (!ts.isImportSpecifier(specifier)) {
            return { hit: false };
        }
        if (specifier.name.text === reactiveComponentModuleText) {
            return { hit: true, specifier: specifier, text: specifier.name.text };
        }
        // if import is renamed
        if (specifier.propertyName &&
            specifier.propertyName.text === reactiveComponentModuleText) {
            return { hit: true, specifier: specifier, text: specifier.propertyName.text };
        }
        return { hit: false };
    })
        .filter(function (_a) {
        var hit = _a.hit;
        return hit;
    })
        .map(function (_a) {
        var specifier = _a.specifier, text = _a.text;
        return !!specifier && !!text
            ? (0, schematics_core_1.createReplaceChange)(sourceFile, specifier, text, "".concat(text, ", ").concat(reactiveComponentModuleReplacement))
            : undefined;
    })
        .filter(function (change) { return !!change; });
    return changes;
}
function findPossibleReactiveComponentModuleUsageCount(sourceFile) {
    var count = 0;
    ts.forEachChild(sourceFile, function (node) { return countUsages(node); });
    return count;
    function countUsages(node) {
        if (ts.isIdentifier(node) && node.text === reactiveComponentModuleText) {
            count = count + 1;
        }
        ts.forEachChild(node, function (childNode) { return countUsages(childNode); });
    }
}
function findReactiveComponentModuleNgModuleReplacements(sourceFile) {
    var changes = [];
    ts.forEachChild(sourceFile, function (node) { return find(node, changes); });
    return changes;
    function find(node, changes) {
        var change = undefined;
        if (ts.isIdentifier(node) &&
            node.text === reactiveComponentModuleText &&
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
                            text: node.text,
                        };
                    }
                }
            }
        }
        if (change) {
            changes.push((0, schematics_core_1.createReplaceChange)(sourceFile, change.node, change.text, reactiveComponentModuleReplacement));
        }
        ts.forEachChild(node, function (childNode) { return find(childNode, changes); });
    }
}
function default_1() {
    return (0, schematics_1.chain)([migrateReactiveComponentModule()]);
}
exports.default = default_1;
//# sourceMappingURL=index.js.map