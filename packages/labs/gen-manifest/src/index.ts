/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {
  ClassDeclaration,
  Declaration,
  Event,
  LitElementDeclaration,
  Module,
  Package,
  Reference,
  Type,
  VariableDeclaration,
} from '@lit-labs/analyzer/lib/model.js';
import {FileTree} from '@lit-labs/gen-utils/lib/file-utils.js';
import type * as cem from 'custom-elements-manifest/schema';

export const generateManifest = async (
  analysis: Package
): Promise<FileTree> => {
  return {
    'custom-elements.json': JSON.stringify(convertPackage(analysis)),
  };
};

const convertPackage = (pkg: Package): cem.Package => {
  return {
    schemaVersion: '1.0.0',
    modules: [...pkg.modules.map(convertModule)],
  };
};

const convertModule = (module: Module): cem.Module => {
  return {
    kind: 'javascript-module',
    path: module.jsPath,
    summary: 'TODO', // TODO
    description: 'TODO', // TODO
    declarations: [...module.declarations.map(convertDeclaration)],
    exports: [
      // TODO
    ],
    deprecated: false, // TODO
  };
};

const convertDeclaration = (declaration: Declaration): cem.Declaration => {
  if (declaration instanceof LitElementDeclaration) {
    return convertLitElementDeclaration(declaration);
  } else if (declaration instanceof ClassDeclaration) {
    return convertClassDeclaration(declaration);
  } else if (declaration instanceof VariableDeclaration) {
    return convertVariableDeclaration(declaration);
  } else {
    // TODO: FunctionDeclaration
    // TODO: MixinDeclaration
    // TODO: CustomElementMixinDeclaration;
    throw new Error(
      `Unknown declaration: ${(declaration as Object).constructor.name}`
    );
  }
};

const convertLitElementDeclaration = (
  declaration: LitElementDeclaration
): cem.CustomElementDeclaration => {
  return {
    ...convertClassDeclaration(declaration),
    tagName: declaration.tagname,
    attributes: [
      // TODO
    ],
    events: [...Array.from(declaration.events.values()).map(convertEvent)],
    slots: [
      // TODO
    ],
    cssParts: [
      // TODO
    ],
    cssProperties: [
      // TODO
    ],
    demos: [
      // TODO
    ],
    customElement: true,
  };
};

const convertClassDeclaration = (
  declaration: ClassDeclaration
): cem.ClassDeclaration => {
  return {
    kind: 'class',
    name: declaration.name!, // TODO(kschaaf) name isn't optional in CEM
    summary: 'TODO', // TODO
    description: 'TODO', // TODO
    superclass: undefined, // TODO
    mixins: [], // TODO
    members: [
      // TODO: ClassField
      // TODO: ClassMethod
    ],
    source: {href: 'TODO'}, // TODO
    deprecated: false, // TODO
  };
};

const convertVariableDeclaration = (
  declaration: VariableDeclaration
): cem.VariableDeclaration => {
  return {
    kind: 'variable',
    name: declaration.name,
    summary: 'TODO', // TODO
    description: 'TODO', // TODO
    type: declaration.type ? convertType(declaration.type) : {text: 'TODO'}, // TODO(kschaaf) type isn't optional in CEM
  };
};

const convertEvent = (event: Event): cem.Event => {
  return {
    name: event.name,
    type: event.type ? convertType(event.type) : {text: 'TODO'}, // TODO(kschaaf) type isn't optional in CEM
  };
};

const convertType = (type: Type): cem.Type => {
  return {
    text: type.text,
    references: convertTypeReference(type.text, type.references),
  };
};

const convertTypeReference = (
  text: string,
  references: Reference[]
): cem.TypeReference[] => {
  const cemReferences: cem.TypeReference[] = [];
  let curr = 0;
  for (const ref of references) {
    const start = text.indexOf(ref.name, curr);
    if (start < 0) {
      throw new Error(
        `Could not find type reference '${ref.name}' in type '${text}'`
      );
    }
    curr = start + ref.name.length;
    cemReferences.push({
      ...convertReference(ref),
      start,
      end: curr,
    });
  }
  return cemReferences;
};

const convertReference = (reference: Reference): cem.TypeReference => {
  return {
    name: reference.name,
    ...(reference.package
      ? {package: reference.isGlobal ? 'global:' : reference.package}
      : {}),
    ...(reference.name ? {name: reference.name} : {}),
  };
};
