import { Helmet } from 'react-helmet';

const Head = ({ title }) => {
    return (
        <Helmet>
            <meta charSet="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
            <title>{title}</title>
            <link rel="stylesheet" href="/admin/css/bootstrap.min.css" />
            <link rel="stylesheet" href="/admin/css/datepicker3.css" />
            <link rel="stylesheet" href="/admin/css/bootstrap-table.css" />
            <link rel="stylesheet" href="/admin/css/styles.css" />
            {/* <script src="/admin/js/jquery-1.11.1.min.js"></script>
            <script src="/admin/js/bootstrap.min.js"></script>
            <script src="/admin/js/bootstrap-table.js"></script>
            <script src="/admin/icons/lumino.glyphs.js"></script> */}

            {/* <img src="/admin/icons/lumino.glyphs.svg" alt="Lumino Glyphs" /> */}
        </Helmet>
    );
};

export default Head;
