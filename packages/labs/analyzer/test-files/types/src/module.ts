/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {ImportedClass} from './external.js';
import {LitElement} from 'lit';

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const testString: string = 'hi';
export const inferredString = 'hi';

export class LocalClass {}

export let localClass: LocalClass;
export let importedClass: ImportedClass;
export let externalClass: LitElement;

export const testStringNumberUnion: string | number = 'hi';
export const testStringClassUnion: string | LocalClass = 'hi';
export const testStringImportedClassUnion: string | ImportedClass = 'hi';
export const testStringImportedGlobalClassUnion:
  | string
  | ImportedClass
  | HTMLElement = 'hi';

export const inferredLocalClass = new LocalClass();
export const inferredImportedClass = new ImportedClass();
export const inferredExternalClass = new LitElement();

/** @type {string} */
export let jsdocString;
/** @type {LocalClass} */
export let jsdocLocalClass;
/** @type {ImportedClass} */
export let jsdocImportedClass;
/** @type {string | ImportedClass} */
export let jsdocStringExternalClassUnion;
/** @type {string | ImportedClass | HTMLElement} */
export let jsdocStringExternalGlobalClassUnion;

export let complexType: Promise<Map<keyof LitElement, ImportedClass[]>>[];
