//best way to define global css is here
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import buildClient from "../api/build-client";
import Header from "../components/header";

const AppComponent = ({ Component, pageProps, currentUser }) => {
	return (
		<div>
			<Header currentUser={currentUser} />
			<div className="container">
				<Component currentUser={currentUser} {...pageProps} />
			</div>
		</div>
	);
};

//Initial requests have to be here cause they are not handled by the browser who will issued itself and do right request to do
// So initial request need to reach ingress
//We cant use hooks because we are not in a componenet here
//getInitialProps will be executed during the server side renderring phase : Hard refresh of page, clicking link from different domain, typing URL into address bar
// or in the browser in specific cases : Navigation IN the app
AppComponent.getInitialProps = async (appContext) => {
	const client = buildClient(appContext.ctx);
	const { data } = await client.get("/api/users/currentuser");

	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(
			appContext.ctx,
			client
		);
	}

	return { pageProps, ...data };
};

export default AppComponent;
