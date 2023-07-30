# Cyber.js
Bundle next.js into your native mobile apps.

### Getting Started
`npx create-next-app my-app --example https://github.com/mlatham/cyber.js --example-path packages/next-cyber-starter`

### Documentation
TODO:

### Roadmap
1. Create example project.
- iOS Project + WKWebView
- Android Project + WebView
1. Create tool which replicates example project, substituting certain values (app name, etc).

### Notes
Testing locally:
- npx create-react-app my-app --template file:/Users/matt/Documents/workspace/cyber/packages/cra-template-cyber-app
- npx create-next-app next-cyber-starter --typescript --tailwind --eslint --src-dir --app --use-npm --import-alias "@/*"

- npx create-next-app my-app --example https://github.com/mlatham/cyber --example-path packages/next-cyber-starter

Custom integration:
- npm install cyber (<- add the Javascript bridge interface)
- spm install cyber-ios (<- add the iOS bridge interface)
    - Adds custom build step to copy cyber-ios.js as a resource
- gradle install cyber-android (<- add the android bridge interface)
    - Adds custom build step to copy in cyber-android.js as a resource

- npx create-react-app my-app --template cyber-react-app
    - esbuild 
- npx create-react-app my-app --template cyber-mobile-app
    - cyber-react-app + ios 

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

