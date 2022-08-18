import { Home } from "~/pages";
import { LinksFunction } from "@remix-run/node";
import carouselStyles from "react-owl-carousel2/lib/styles.css";
import homeStyles from "~/styles/home.css";

export let links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: carouselStyles },
        { rel: "stylesheet", href: homeStyles },
    ];
}

export default () => (<Home />);