import { Box, Typography } from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import useQuery from "./hooks/useQuery";






export default function Error() {
    const query = useQuery();
    return (
        <Box sx={{ p: 5 }} >
            <Box display="flex" border={1} borderColor="error.main">
                <Box sx={{ p: 2 }} color="error.main">
                    <ErrorOutlineIcon style={{ fontSize: 30 }} />
                </Box>
                <Box sx={{p:1}}>
                    <Typography variant="h6" color="error">
                        Error
                    </Typography>
                    <Typography variant="body2" color="error">
                        {query.get('msg')}
                    </Typography>

                </Box>
            </Box>
        </Box>

    )
}