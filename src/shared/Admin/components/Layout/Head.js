import { Helmet } from 'react-helmet';

const Head = ({ title }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <link rel="stylesheet" href="/admin/css/bootstrap.min.css" />
            <link rel="stylesheet" href="/admin/css/datepicker3.css" />
            <link rel="stylesheet" href="/admin/css/styles.css" />
        </Helmet>
    );
};

export default Head;
