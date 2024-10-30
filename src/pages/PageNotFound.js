import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import * as React from 'react';

export default function PageNotFound() {
    return (
        <Container>
            <Typography align="center" variant="h2" gutterBottom>
                404
            </Typography>
            <Typography align="center" variant="h5" gutterBottom>
                The requested page was not found.
            </Typography>
        </Container>
    )
}