# OMNI
Minimal, steel-solid kit for bundling embeddable react web apps into mobile apps for iOS and Android.

### Roadmap
1. Create performance log of load times.
1. Create example project.
- iOS Project + WKWebView
- Android Project + WebView
1. Create tool which replicates example project, substituting certain values (app name, etc).

### Names?
- crux

### Notes
Testing locally:
- npx create-react-app my-app --template file:/Users/matt/Documents/workspace/crux/packages/cra-template-crux-app
- npx create-next-app next-crux-starter --typescript --eslint --src-dir --app --use-npm 

- npx create-next-app my-app --example github.com/mlatham/crux/next-template

Custom integration:
- npm install crux (<- add the Javascript bridge interface)
- spm install crux-ios (<- add the iOS bridge interface)
    - Adds custom build step to copy crux-ios.js as a resource
- gradle install crux-android (<- add the android bridge interface)
    - Adds custom build step to copy in crux-android.js as a resource

- npx create-react-app my-app --template crux-react-app
    - esbuild 
- npx create-react-app my-app --template crux-mobile-app
    - crux-react-app + ios 

- https://createapp.dev/webpack
- main library
    - react vs svelte vs vue? react consistently most popular
- UI library (NONE)
    - bootstrap vs tailwind vs material UI? tailwind + bootstrap similar popularity. Suggestion is to learn raw CSS first
- Test framework (NONE)
- Transpiler
    - typescript (ES6 modules)
- Styling
    - CSS (vs CSS modules, PostCSS, Sass, Less, stylus)
- Image
    - SVG (vs PNG)
- Utilities (NONE)
- Linting
    - Prettier
- Optimization (NONE)
    - Code split vendors (?)
- Webpack plugins
    - HTML webpack plugin
- React
    - React hot loader

- https://createapp.dev/webpack/react--babel--css--html-webpack-plugin--prettier--svg--typescript--style-loader--css-loader

Added:
- npm install webpack-dev-server style-loader css-loader --save-dev
- webpack.config.*.js

- tsconfig.json:
    - allowSyntheticDefaultImports: true

Modified:
    "build-dev": "webpack --mode development --config webpack.config.development.js",
    "build-prod": "webpack --mode production --config webpack.config.js"

-       {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        type: 'asset/resource'
      }
- index.tsx ("root" -> "app", to align with HtmlWebPackPlugin)

- Use template file:
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })

### iOS Notes
- Let Safari inspect webview within iOS Simulator via Develop->Simulator in Safari (Also Safari->Settings->Advanced->Show Develop menu in menu bar)

if #available(iOS 16.4, *) {
    self.webView.isInspectable = true
}

- Faster-tap (ios) and disable zooming:
<meta name="viewport" content="width=device-width, user-scalable=no">

