/*
 * testLocaleData.js - test the locale data class
 *
 * Copyright © 2022 JEDLSoft
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Path } from 'ilib-common';
import { setPlatform, getPlatform } from 'ilib-env';
import { registerLoader } from 'ilib-loader';

import MockLoader from './MockLoader';
import LocaleData from '../src/LocaleData';

module.exports.testLocaleData = {
    testLocaleDataConstructor: function(test) {
        test.expect(1);
        const locData = new LocaleData("test", {
            path: "./test/files",
            name: "test"
        });
        test.ok(locData);
        test.done();
    },

    testLocaleDataConstructorNoPath: function(test) {
        test.expect(1);
        const locData = new LocaleData("test", {
            name: "test"
        });
        test.equalIgnoringOrder(locData.getRoots(), [Path.dirname(Path.dirname(module.id))]);
        test.done();
    },

    testLocaleDataConstructorEmptyPackage: function(test) {
        test.expect(1);
        test.throws(() => {
            new LocaleData("", {
                path: "./test/files"
            });
        });
        test.done();
    },

    testLocaleDataConstructorNoPackage: function(test) {
        test.expect(1);
        test.throws(() => {
            new LocaleData(undefined, {
                path: "./test/files"
            });
        });
        test.done();
    },

    testLocaleDataConstructorNoSync: function(test) {
        test.expect(1);
        const locData = new LocaleData("test", {
            path: "./test/files",
            name: "test"
        });
        test.ok(!locData.isSync());

        test.done();
    },

    testLocaleDataConstructorLoaderDoesntSupportSync: function(test) {
        test.expect(1);
        registerLoader(MockLoader);
        setPlatform("mock");

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });
        test.ok(!locData.isSync());

        // clean up
        setPlatform(undefined);

        test.done();
    },

    testLocaleDataNodeSyncRoot: function(test) {
       test.expect(3);

       setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(2);

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });

        test.ok(locData);
        const actual = locData.loadData({
            basename: "tester",
            locale: "root"
        });

        test.deepEqual(actual, {
            "a": "b",
            "c": "d",
            "x": {
                "m": "n",
                "o": "p"
            }
        });
        test.done();
    },

    testLocaleDataNodeSyncen: function(test) {
        test.expect(3);

        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(2);

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });

        test.ok(locData);
        const actual = locData.loadData({
            basename: "tester",
            locale: "en"
        });

        test.deepEqual(actual, {
            "a": "b en",
            "c": "d",
            "x": {
                "m": "n",
                "o": "p en"
            }
        });
        test.done();
    },

    testLocaleDataNodeSyncenUS: function(test) {
        test.expect(3);

        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(2);

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });

        test.ok(locData);
        const actual = locData.loadData({
            basename: "tester",
            locale: "en-US"
        });

        test.deepEqual(actual, {
            "a": "b en",
            "c": "d en-US",
            "x": {
                "m": "n",
                "o": "p en-US"
            }
        });
        test.done();
    },

    testLocaleDataNodeAsyncRoot: function(test) {
        test.expect(3);

        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(2);

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: false
        });

        test.ok(locData);
        locData.loadData({
            basename: "tester",
            locale: "root"
        }).then((actual) => {
            test.deepEqual(actual, {
                "a": "b",
                "c": "d",
                "x": {
                    "m": "n",
                    "o": "p"
                }
            });
            test.done();
        });
    },

    testLocaleDataNodeAsyncen: function(test) {
        test.expect(3);

        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(2);

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: false
        });

        test.ok(locData);
        locData.loadData({
            basename: "tester",
            locale: "en"
        }).then((actual) => {
            test.deepEqual(actual, {
                "a": "b en",
                "c": "d",
                "x": {
                    "m": "n",
                    "o": "p en"
                }
            });
            test.done();
        });
    },

    testLocaleDataNodeAsyncenUS: function(test) {
        test.expect(3);

        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(2);

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: false
        });
        test.ok(locData);

        locData.loadData({
            basename: "tester",
            locale: "en-US"
        }).then((actual) => {
            test.deepEqual(actual, {
                "a": "b en",
                "c": "d en-US",
                "x": {
                    "m": "n",
                    "o": "p en-US"
                }
            });
            test.done();
        });
    },

    testLocaleDataGetGlobalRootsEmpty: function(test) {
        test.expect(1);

        setPlatform();

        // should have the path of caller in it only
        test.deepEqual(LocaleData.getGlobalRoots(), []);

        test.done();
    },


    testLocaleDataGetRootsEmpty: function(test) {
        test.expect(2);

        setPlatform();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: false
        });
        test.ok(locData);

        // should have the path of caller in it only
        test.deepEqual(locData.getRoots(), ["./test/files"]);

        test.done();
    },

    testLocaleDataAddGlobalRoot: function(test) {
        test.expect(2);

        setPlatform();

        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");

        test.deepEqual(LocaleData.getGlobalRoots(), ["foobar/asf"]);

        test.done();
    },

    testLocaleDataAddGlobalRoot: function(test) {
        test.expect(2);

        setPlatform();

        LocaleData.clearGlobalRoots();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: false
        });
        test.ok(locData);

        LocaleData.addGlobalRoot("foobar/asf");

        test.deepEqual(locData.getRoots(), ["foobar/asf", "./test/files"]);

        test.done();
    },

    testLocaleDataAddGlobalRootMultiple: function(test) {
        test.expect(1);

        setPlatform();

        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot("a/b/c");

        // in reverse order
        test.deepEqual(LocaleData.getGlobalRoots(), ["a/b/c", "foobar/asf"]);

        test.done();
    },

    testLocaleDataAddGlobalRootUndefined: function(test) {
        test.expect(1);

        setPlatform();

        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot(undefined);

        test.deepEqual(LocaleData.getGlobalRoots(), ["foobar/asf"]);

        test.done();
    },

    testLocaleDataAddGlobalRootNull: function(test) {
        test.expect(1);

        setPlatform();

        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot(null);

        test.deepEqual(LocaleData.getGlobalRoots(), ["foobar/asf"]);

        test.done();
    },

    testLocaleDataAddGlobalRootNumber: function(test) {
        test.expect(1);

        setPlatform();

        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot(3);

        test.deepEqual(LocaleData.getGlobalRoots(), ["foobar/asf"]);

        test.done();
    },

    testLocaleDataClearGlobalRoot: function(test) {
        test.expect(1);

        setPlatform();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot("a/b/c");

        LocaleData.clearGlobalRoots();

        // should only have the path of the caller left over
        test.deepEqual(LocaleData.getGlobalRoots(), []);

        test.done();
    },

    testLocaleDataRemoveGlobalRoot: function(test) {
        test.expect(2);

        setPlatform();

        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot("a/b/c");

        test.deepEqual(LocaleData.getGlobalRoots(), ["a/b/c", "foobar/asf"]);

        LocaleData.removeGlobalRoot("foobar/asf");

        test.deepEqual(LocaleData.getGlobalRoots(), ["a/b/c"]);
        test.done();
    },

    testLocaleDataRemoveGlobalRootMultiple: function(test) {
        test.expect(2);

        setPlatform();

        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot("a/b/c");
        LocaleData.addGlobalRoot("x/y");
        LocaleData.addGlobalRoot("man/woman");

        test.deepEqual(LocaleData.getGlobalRoots(), ["man/woman", "x/y", "a/b/c", "foobar/asf"]);

        LocaleData.removeGlobalRoot("foobar/asf");
        LocaleData.removeGlobalRoot("x/y");

        test.deepEqual(LocaleData.getGlobalRoots(), ["man/woman", "a/b/c"]);
        test.done();
    },

    testLocaleDataRemoveGlobalRootNotThere: function(test) {
        test.expect(2);

        setPlatform();

        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot("a/b/c");

        test.deepEqual(LocaleData.getGlobalRoots(), ["a/b/c", "foobar/asf"]);

        LocaleData.removeGlobalRoot("ff");

        test.deepEqual(LocaleData.getGlobalRoots(), ["a/b/c", "foobar/asf"]);
        test.done();
    },

    testLocaleDataRemoveGlobalRootUndefined: function(test) {
        test.expect(2);

        setPlatform();

        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot("a/b/c");

        test.deepEqual(LocaleData.getGlobalRoots(), ["a/b/c", "foobar/asf"]);

        LocaleData.removeGlobalRoot(undefined);

        test.deepEqual(LocaleData.getGlobalRoots(), ["a/b/c", "foobar/asf"]);
        test.done();
    },

    testLocaleDataRemoveGlobalRootNull: function(test) {
        test.expect(2);

        setPlatform();

        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot("a/b/c");

        test.deepEqual(LocaleData.getGlobalRoots(), ["a/b/c", "foobar/asf"]);

        LocaleData.removeGlobalRoot(null);

        test.deepEqual(LocaleData.getGlobalRoots(), ["a/b/c", "foobar/asf"]);
        test.done();
    },

    testLocaleDataRemoveGlobalRootNumber: function(test) {
        test.expect(2);

        setPlatform();

        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot("a/b/c");

        test.deepEqual(LocaleData.getGlobalRoots(), ["a/b/c", "foobar/asf"]);

        LocaleData.removeGlobalRoot(1);

        test.deepEqual(LocaleData.getGlobalRoots(), ["a/b/c", "foobar/asf"]);
        test.done();
    },

    testLocaleDataRemoveGlobalRootCantRemoveBasePath: function(test) {
        test.expect(3);

        setPlatform();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: false
        });
        test.ok(locData);
        LocaleData.clearGlobalRoots();

        LocaleData.addGlobalRoot("foobar/asf");
        LocaleData.addGlobalRoot("a/b/c");

        test.deepEqual(locData.getRoots(), ["a/b/c", "foobar/asf", "./test/files"]);

        // can't remove this because it's not a global root
        LocaleData.removeGlobalRoot("./test/files");

        test.deepEqual(locData.getRoots(), ["a/b/c", "foobar/asf", "./test/files"]);
        test.done();
    },

    testLocaleDataNodeSyncWithRoots: function(test) {
        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(2);
        LocaleData.clearCache();
        LocaleData.clearGlobalRoots();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });
        LocaleData.addGlobalRoot("./test/files2");

        test.ok(locData);
        const actual = locData.loadData({
            basename: "tester",
            locale: "en-US"
        });

        test.deepEqual(actual, {
            "a": "b en from files2",
            "c": "d en-US",
            "x": {
                "m": "n",
                "o": "p en-US"
            }
        });
        test.done();
    },

    testLocaleDataNodeAsyncWithRoots: function(test) {
        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(2);
        LocaleData.clearCache();
        LocaleData.clearGlobalRoots();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: false
        });
        test.ok(locData);

        LocaleData.addGlobalRoot("./test/files2");

        locData.loadData({
            basename: "tester",
            locale: "en-US"
        }).then((actual) => {
            test.deepEqual(actual, {
                "a": "b en from files2",
                "c": "d en-US",
                "x": {
                    "m": "n",
                    "o": "p en-US"
                }
            });
            test.done();
        });
    },

    testLocaleDataNodeSyncWithRootsjaJP: function(test) {
        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(2);
        LocaleData.clearCache();
        LocaleData.clearGlobalRoots();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });
        LocaleData.addGlobalRoot("./test/files2");

        test.ok(locData);
        const actual = locData.loadData({
            basename: "tester",
            locale: "ja-JP"
        });

        test.deepEqual(actual, {
            "a": "b ja-JP from files2",
            "c": "d ja",
            "x": {
                "m": "n ja-JP from files2",
                "o": "p ja"
            }
        });
        test.done();
    },

    testLocaleDataNodeAsyncWithRootsjaJP: function(test) {
        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(2);
        LocaleData.clearCache();
        LocaleData.clearGlobalRoots();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: false
        });
        test.ok(locData);

        LocaleData.addGlobalRoot("./test/files2");

        locData.loadData({
            basename: "tester",
            locale: "ja-JP"
        }).then((actual) => {
            test.deepEqual(actual, {
                "a": "b ja-JP from files2",
                "c": "d ja",
                "x": {
                    "m": "n ja-JP from files2",
                    "o": "p ja"
                }
            });
            test.done();
        });
    },

    testLocaleDataCacheData: function(test) {
        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(3);
        LocaleData.clearCache();
        LocaleData.clearGlobalRoots();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });
        test.ok(locData);
        LocaleData.addGlobalRoot("./test/files2");

        let actual = locData.loadData({
            basename: "tester",
            locale: "de-DE"
        });

        // root data because there is no de-DE data
        test.deepEqual(actual, {
            "a": "b",
            "c": "d",
            "x": {
                "m": "n",
                "o": "p"
            }
        });

        LocaleData.cacheData("test", {
            "de": {
                "tester": {
                    "a": "b de",
                    "x": {
                        "m": "n de",
                    }
                }
            },
            "de-DE": {
                "tester": {
                    "a": "b de-DE",
                    "x": {
                        "o": "p de-DE"
                    }
                }
            }
        });

        // make sure it used the cache
        actual = locData.loadData({
            basename: "tester",
            locale: "de-DE"
        });

        test.deepEqual(actual, {
            "a": "b de-DE",
            "c": "d",
            "x": {
                "m": "n de",
                "o": "p de-DE"
            }
        });
        test.done();
    },

    testLocaleDataCheckCache: function(test) {
        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(3);
        LocaleData.clearCache();
        LocaleData.clearGlobalRoots();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });
        test.ok(locData);
        LocaleData.addGlobalRoot("./test/files2");

        // there is no de-DE data, but there is root data which we
        // should ignore for the purposes of cache checking
        test.ok(!LocaleData.checkCache("test", "de-DE", "tester"));

        LocaleData.cacheData("test", {
            "de": {
                "tester": {
                    "a": "b de",
                    "x": {
                        "m": "n de",
                    }
                }
            },
            "de-DE": {
                "tester": {
                    "a": "b de-DE",
                    "x": {
                        "o": "p de-DE"
                    }
                }
            }
        });

        test.ok(LocaleData.checkCache("test", "de-DE", "tester"));

        test.done();
    },

    testLocaleDataCheckCacheLoadingFilesFillsCache: function(test) {
        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(4);
        LocaleData.clearCache();
        LocaleData.clearGlobalRoots();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });
        LocaleData.addGlobalRoot("./test/files2");

        // there is no en-US data, but there is root data which we
        // should ignore for the purposes of cache checking
        test.ok(!LocaleData.checkCache("test", "en-US", "tester"));

        test.ok(locData);
        const actual = locData.loadData({
            basename: "tester",
            locale: "en-US"
        });

        test.deepEqual(actual, {
            "a": "b en from files2",
            "c": "d en-US",
            "x": {
                "m": "n",
                "o": "p en-US"
            }
        });

        // the loadData above should have populated the cache
        test.ok(LocaleData.checkCache("test", "en-US", "tester"));

        test.done();
    },

    testLocaleDataCheckCacheDataLoadedButNoContentAvailable: function(test) {
        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(3);
        LocaleData.clearCache();
        LocaleData.clearGlobalRoots();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });
        test.ok(locData);
        LocaleData.addGlobalRoot("./test/files2");

        // there is no de-DE data, but there is root data which we
        // should ignore for the purposes of cache checking
        test.ok(!LocaleData.checkCache("test", "de-DE", "tester"));

        // null indicates that we attempted to load the data, but there
        // isn't any to load, so we shouldn't try again
        LocaleData.cacheData("test", {
            "de": {
                "tester": null
            },
            "de-DE": {
                "tester": null
            }
        });

        // true = everything that can be loaded is loaded
        test.ok(LocaleData.checkCache("test", "de-DE", "tester"));

        test.done();
    },

    testLocaleDataDataIsCached: function(test) {
        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(4);
        LocaleData.clearCache();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });
        LocaleData.addGlobalRoot("./test/files2");

        test.ok(locData);
        let actual = locData.loadData({
            basename: "tester",
            locale: "ja-JP"
        });

        test.deepEqual(actual, {
            "a": "b ja-JP from files2",
            "c": "d ja",
            "x": {
               "m": "n ja-JP from files2",
               "o": "p ja"
            }
        });

        const locData2 = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });
        LocaleData.addGlobalRoot("./test/files2");

        test.ok(locData);

        actual = locData.loadData({
            basename: "tester",
            locale: "ja-JP"
        });

        test.deepEqual(actual, {
            "a": "b ja-JP from files2",
            "c": "d ja",
            "x": {
               "m": "n ja-JP from files2",
               "o": "p ja"
            }
        });
        test.done();
    },

    testLocaleDataClearCache: function(test) {
        setPlatform();

        // only do this test on nodejs
        if (getPlatform() !== "nodejs") {
            test.done();
            return;
        }
        test.expect(4);
        LocaleData.clearCache();
        LocaleData.clearGlobalRoots();

        const locData = new LocaleData("test", {
            path: "./test/files",
            sync: true
        });
        test.ok(locData);
        LocaleData.addGlobalRoot("./test/files2");

        // there is no de-DE data, but there is root data which we
        // should ignore for the purposes of cache checking
        test.ok(!LocaleData.checkCache("test", "de-DE", "tester"));

        LocaleData.cacheData("test", {
            "de": {
                "tester": {
                    "a": "b de",
                    "x": {
                        "m": "n de",
                    }
                }
            },
            "de-DE": {
                "tester": {
                    "a": "b de-DE",
                    "x": {
                        "o": "p de-DE"
                    }
                }
            }
        });

        test.ok(LocaleData.checkCache("test", "de-DE", "tester"));

        // dangerous: clears the cache for all the packages!
        LocaleData.clearCache();

        test.ok(!LocaleData.checkCache("test", "de-DE", "tester"));

        test.done();
    }
};
