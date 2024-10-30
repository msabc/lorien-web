import { Typography } from '@mui/material';
import { Container } from '@mui/system';
import * as React from 'react';

export default function AboutPage() {
    return (
        <Container>
            <Typography variant="h2" gutterBottom>
                About Lorien
            </Typography>
            <Typography>
                Lorien is a React application used for a company challenge.
            </Typography>
        </Container>
    )
}