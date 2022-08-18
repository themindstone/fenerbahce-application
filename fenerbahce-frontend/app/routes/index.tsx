import { Home } from "~/pages";
import { LinksFunction } from "@remix-run/node";
import carouselStyles from "react-owl-carousel2/lib/styles.css";
import homeStyles from "~/styles/home.css";

// let scripts = () => {
//     return [
//         {
//             src: "https://code.jquery.com/jquery-3.2.1.slim.min.js",
//         }
//     ];
// };

// export const handle = { scripts };

export let links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: carouselStyles },
        { rel: "stylesheet", href: homeStyles },
    ];
}

export default () => (<Home />);