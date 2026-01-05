class EmitManifest {
    apply(compiler) {
        compiler.hooks.compilation.tap("ReshakeShareManifestPlugin", compilation => {
            compilation.hooks.processAssets.tapPromise({
                name: "ReshakeShareManifestPlugin",
                stage: compilation.constructor.PROCESS_ASSETS_STAGE_ADDITIONAL - 1000
            },
                async () => {
                    const treeshakeSharedPlugin = compiler.options.plugins.find(p => p.name === 'TreeShakeSharedPlugin');
                    if (!treeshakeSharedPlugin) {
                        return;
                    }
                    const mfConfig = treeshakeSharedPlugin.mfConfig;
                    const fakeManifest = {
                        shared: [],
                    }

                    const {
                        shared
                    } = fakeManifest;
                    Object.entries(mfConfig.shared).forEach(([sharedName, sharedConfig]) => {
                        shared.push({
                            name: sharedName,
                            version: sharedConfig.version
                        })
                    })
                    compilation.emitAsset('mf-manifest.json', new compiler.webpack.sources.RawSource(
                        JSON.stringify(fakeManifest)
                    ));
                    compilation.emitAsset('mf-stats.json', new compiler.webpack.sources.RawSource(
                        JSON.stringify(fakeManifest)
                    ));
                }
            );
        });
    }
}
export default EmitManifest