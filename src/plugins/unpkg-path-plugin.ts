import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

       //**handle root entry file for 'index.js' */
      build.onResolve({filter: /(^index\.js$)/}, () =>{
        return { path: 'index.js', namespace: 'a' };
      })

       //**handle relative paths in module './' and '../' */
      build.onResolve({filter: /^\.+\//}, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(
            args.path,
            'https://unpkg.com' + args.resolveDir + '/'
          ).href,
        };
      })

      //**Handle main file of a module */ 
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });

    },
  };
};
