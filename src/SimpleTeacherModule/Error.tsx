import { Box, Container, Typography } from "@material-ui/core";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useLocation } from "react-router-dom";

interface ErrorState{
    error: string;
}

export default function Error() {

    const {state} = useLocation<ErrorState>();

    return (
        <Container maxWidth="sm">
            <Box sx={{ p: 5 }} >
                <Box display="flex" border={1} borderColor="error.main">
                    <Box sx={{ p: 2 }} color="error.main">
                        <ErrorOutlineIcon style={{ fontSize: 30 }} />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography variant="h6" color="error">
                            Error
                        </Typography>
                        <Typography variant="body2" color="error">
                            {state?.error || "Something went wrong"}
                        </Typography>

                    </Box>
                </Box>
            </Box>
        </Container>


    )
}