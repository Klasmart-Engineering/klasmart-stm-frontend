import { useHistory } from "react-router-dom";


export default function usePageValidation() {
    let history = useHistory();
    function goErrorPage(errorMsg?: string) {
        history.replace({
            pathname: '/error',
            state: {
                error: errorMsg || ""
            }
        })
    }
    return goErrorPage;
}

