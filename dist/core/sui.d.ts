/**
 * @license
 * Copyright 2015 Dániel Sipos (siposdani87@gmail.com),
 * SUI-JS
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/**
 * A component handler interface using the revealing module design pattern.
 * More details on this design pattern here
 *
 * @author Dániel Sipos
 */
/**
 * @export
 * @define {boolean}
 */
export declare const releaseMode = false;
/**
 * @export
 * @struct
 */
export declare const SUI: {
    title: string;
    description: string;
    version: string;
    const: {};
    config: {};
    res: {};
    coreRes: {};
};