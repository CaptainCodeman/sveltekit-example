# sveltekit-example

Example to show firebase auth used on the client and accessed via a Svelte Store.

Firebase SDK Packages are lazy-loaded from the CDN. This ensures that the application starts up quickly (rather than waiting for the large firebase bundles to load) and also auth can load and initialize before opther packages (e.g. firestore isn't loaded unless the user is signed in). The auth store ensures that the firebase code is only loaded and called when the page is running in the browser.

TIP: comment out the `<Auth />` import and component in `$layout.svelte` and notice that no firebase libs are requested.

A simpler example could just include the firebase CDN scripts in the app.html file but I find the approach keeps the page zippy while also avoiding re-bundling the firebase SDK into the app so it has the benefit of potentially loading faster via the CDN.

When I have time, I'll show how the firebase-admin SDK can also be references and used to set firebase session cookies in order to enable firebase auth checks inside server endpoints and also to server-side-render pages with data coming from firestore.