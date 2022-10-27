import { memo } from "react";

const FooterComponent = (): JSX.Element => {
    const currentYear: number = new Date().getFullYear();

    return (
        <footer className="footer">
            <a href="http://kurskstreetrunners.ru">KurskStreetRunners.ru</a>  2007-{currentYear}
        </footer>
    );
};

export default memo(FooterComponent);
