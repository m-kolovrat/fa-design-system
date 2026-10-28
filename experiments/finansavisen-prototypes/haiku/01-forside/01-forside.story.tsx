import Forside from "./01-forside";

export default {
    title: "Experiments/haiku/01-forside",
};

// Desktop shows the signed-in greeting; Mobile shows the logged-out invitation to create an account.
export const Desktop = () => <Forside user={{ firstName: "Kari", initials: "KH" }} />;
Desktop.parameters = {
    viewport: { defaultViewport: "desktop" },
};

export const Mobile = () => <Forside />;
Mobile.parameters = {
    viewport: { defaultViewport: "mobile" },
};
