# sveltekit-example

Example to show firebase auth used on the client and accessed via a Svelte Store.

Updated to show lazy-loading the Firebase 9.0 SDK for faster startup / higher lighthouse score.

~~Updated to use the new Firebase 9.0 SDK, so lazy-loading firebase from the CDN has been removed.~~

~~Firebase SDK Packages are lazy-loaded from the CDN. This ensures that the application starts up quickly (rather than waiting for the large firebase bundles to load) and also auth can load and initialize before other packages (e.g. firestore isn't loaded unless the user is signed in and on a route that requests data).~~

The auth store ensures that the firebase code is only loaded and called when the page is running in the browser and when the auth status has been referenced. Comment out the `<Auth />` import and component in `$layout.svelte` and notice that no firebase libs are requested.

~~A simpler example _could_ just include the firebase CDN scripts in the `app.html` file but I find this approach keeps the page zippy while also avoiding re-bundling the firebase SDK into the app so it has the benefit of potentially loading faster via the CDN.~~

## Roadmap

Some additional pieces I'll try to add:

* how the firebase-admin SDK can also be referenced and used to set firebase session cookies in order to enable firebase auth checks inside server endpoints and also to server-side-render (SSR) pages with data coming from firestore.
* auth guards to prevent routes rendering or to show an "access denied" message based on auth status
* role-based UI customization where elements are shown or hidden based on auth claims (e.g. hide an "edit" button if the user doesn't have "author" permissions)
* how to use SvelteKit stores with Firestore to simplify querying / subscribing to data
* how to use Firestore with SSR and SPA mode working efficiently (transparent hand-off of SSR data to a client-side subscription for live updates)
